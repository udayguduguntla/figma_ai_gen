import dotenv from 'dotenv';
dotenv.config();
import Groq from 'groq-sdk';

const OpenAI = require('openai');
const Groq = require('groq-sdk');

require('dotenv').config();
// or (if using ES modules):
// import dotenv from 'dotenv';
// dotenv.config();


class AIProcessor {
  constructor() {
    // Initialize Groq client
    this.groq = new Groq({
      apiKey: process.env.GROQ_API_KEY
    });
    
    // Keep OpenAI as backup
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
      });
    } else {
      this.openai = null;
    }
  }

  async processPrompt(prompt, preferences = {}) {
    try {
      // Try Groq first (fastest and most reliable)
      const systemPrompt = this.buildSystemPrompt();
      const userPrompt = this.buildUserPrompt(prompt, preferences);
      
      const response = await this.groq.chat.completions.create({
        model: 'llama-3.1-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 4000
      });

      const result = JSON.parse(response.choices[0].message.content);
      return this.validateAndEnhanceRequirements(result);
      
    } catch (error) {
      console.error('Groq AI processing error:', error);
      
      // Try OpenAI as backup
      if (this.openai && process.env.OPENAI_API_KEY) {
        try {
          const systemPrompt = this.buildSystemPrompt();
          const userPrompt = this.buildUserPrompt(prompt, preferences);
          
          const response = await this.openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt }
            ],
            temperature: 0.7,
            max_tokens: 4000
          });

          const result = JSON.parse(response.choices[0].message.content);
          return this.validateAndEnhanceRequirements(result);
        } catch (openaiError) {
          console.error('OpenAI processing error:', openaiError);
        }
      }
      
      // Fallback to rule-based generation
      return this.generateFallbackRequirements(prompt, preferences);
    }
  }

  generateFallbackRequirements(prompt, preferences) {
    const demoData = require('../utils/demoData');
    const design = demoData.generateDemoDesign(prompt, preferences);
    return design.requirements;
  }

  detectAppType(prompt) {
    const keywords = {
      'e-commerce': ['shop', 'buy', 'sell', 'product', 'cart', 'payment', 'store', 'marketplace'],
      'social': ['social', 'friend', 'post', 'share', 'follow', 'chat', 'message', 'community'],
      'productivity': ['task', 'project', 'team', 'work', 'manage', 'organize', 'collaborate'],
      'fitness': ['fitness', 'workout', 'exercise', 'health', 'gym', 'training', 'nutrition'],
      'education': ['learn', 'course', 'study', 'education', 'school', 'student', 'teacher'],
      'finance': ['money', 'bank', 'payment', 'finance', 'budget', 'investment', 'wallet']
    };

    const lowerPrompt = prompt.toLowerCase();
    let maxScore = 0;
    let detectedType = 'productivity';

    for (const [type, words] of Object.entries(keywords)) {
      const score = words.reduce((acc, word) => {
        return acc + (lowerPrompt.includes(word) ? 1 : 0);
      }, 0);
      
      if (score > maxScore) {
        maxScore = score;
        detectedType = type;
      }
    }

    return detectedType;
  }

  generateFeaturesFromPrompt(prompt, appType) {
    const commonFeatures = {
      'e-commerce': [
        { name: 'Product Catalog', description: 'Browse and search products', priority: 'high' },
        { name: 'Shopping Cart', description: 'Add items to cart', priority: 'high' },
        { name: 'User Authentication', description: 'Login and registration', priority: 'high' },
        { name: 'Payment Processing', description: 'Secure checkout', priority: 'high' },
        { name: 'Order Tracking', description: 'Track order status', priority: 'medium' },
        { name: 'Reviews & Ratings', description: 'Product feedback', priority: 'medium' },
        { name: 'Wishlist', description: 'Save favorite items', priority: 'low' }
      ],
      'social': [
        { name: 'User Profiles', description: 'Personal user pages', priority: 'high' },
        { name: 'News Feed', description: 'Content timeline', priority: 'high' },
        { name: 'Messaging', description: 'Direct messages', priority: 'high' },
        { name: 'Content Sharing', description: 'Post photos/videos', priority: 'high' },
        { name: 'Friend System', description: 'Connect with others', priority: 'medium' },
        { name: 'Notifications', description: 'Activity alerts', priority: 'medium' }
      ]
    };

    return commonFeatures[appType] || [
      { name: 'User Management', description: 'User accounts and profiles', priority: 'high' },
      { name: 'Core Functionality', description: 'Main app features', priority: 'high' },
      { name: 'Settings', description: 'App configuration', priority: 'medium' }
    ];
  }

  buildSystemPrompt() {
    return `You are an expert UX/UI designer and product strategist. 
    Analyze user prompts and generate comprehensive design requirements for complete applications.
    
    Return a JSON object with this exact structure:
    {
      "appType": "e-commerce|social|productivity|fitness|education|healthcare|finance|travel|food|entertainment",
      "targetAudience": "detailed description of target users",
      "primaryGoals": ["goal1", "goal2", "goal3"],
      "keyFeatures": [
        {"name": "feature name", "description": "feature description", "priority": "high|medium|low"}
      ],
      "userFlows": [
        {"name": "flow name", "steps": ["step1", "step2"], "screens": ["screen1", "screen2"]}
      ],
      "screenTypes": [
        {"name": "screen name", "type": "screen type", "components": ["component1", "component2"]}
      ],
      "designSystem": {
        "style": "modern|minimal|playful|professional",
        "colors": {"primary": "#hex", "secondary": "#hex"},
        "typography": {"fontFamily": "font name"}
      },
      "estimatedComplexity": "simple|medium|complex"
    }
    
    Be thorough and generate 20-100+ screens for comprehensive applications.`;
  } 
 buildUserPrompt(prompt, preferences) {
    return `
    User wants to build: ${prompt}
    
    Additional preferences: ${JSON.stringify(preferences)}
    
    Generate complete design requirements including:
    1. All necessary screens and user flows
    2. Detailed feature specifications
    3. Design system recommendations
    4. User experience considerations
    5. Technical implementation notes
    
    Consider scalability - this could be 100+ screens for complex applications.
    `;
  }

  validateAndEnhanceRequirements(requirements) {
    // Add default values and validate structure
    const enhanced = {
      ...requirements,
      timestamp: new Date().toISOString(),
      version: '1.0',
      estimatedComplexity: this.calculateComplexity(requirements)
    };

    // Ensure all required fields exist
    if (!enhanced.screenTypes || enhanced.screenTypes.length === 0) {
      enhanced.screenTypes = this.generateDefaultScreens(enhanced.appType);
    }

    return enhanced;
  }

  calculateComplexity(requirements) {
    const screenCount = requirements.screenTypes?.length || 0;
    const featureCount = requirements.keyFeatures?.length || 0;
    const flowCount = requirements.userFlows?.length || 0;
    
    const score = screenCount * 2 + featureCount * 3 + flowCount * 1.5;
    
    if (score < 50) return 'simple';
    if (score < 150) return 'medium';
    return 'complex';
  }

  generateDefaultScreens(appType) {
    const defaultScreens = {
      'e-commerce': [
        'splash', 'onboarding', 'login', 'register', 'home', 'categories',
        'product-list', 'product-detail', 'cart', 'checkout', 'payment',
        'order-confirmation', 'profile', 'orders', 'wishlist', 'search'
      ],
      'social': [
        'splash', 'onboarding', 'login', 'register', 'feed', 'profile',
        'create-post', 'messages', 'notifications', 'search', 'settings'
      ]
    };
    
    return defaultScreens[appType] || ['home', 'profile', 'settings'];
  }
}

module.exports = AIProcessor;