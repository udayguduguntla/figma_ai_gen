const Groq = require('groq-sdk');

require('dotenv').config();
// or (if using ES modules):
// import dotenv from 'dotenv';
// dotenv.config();


class ScreenContentGenerator {
  constructor() {
    this.groq = new Groq({
      apiKey: process.env.GROQ_API_KEY
    });
  }

  async generateDetailedScreen(screenType, appType, appDescription, designSystem) {
    try {
      const systemPrompt = this.buildScreenSystemPrompt();
      const userPrompt = this.buildScreenUserPrompt(screenType, appType, appDescription, designSystem);
      
      const response = await this.groq.chat.completions.create({
        model: 'llama-3.1-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.8,
        max_tokens: 3000
      });

      const result = JSON.parse(response.choices[0].message.content);
      return this.enhanceScreenContent(result, screenType, appType);
      
    } catch (error) {
      console.error('Screen content generation error:', error);
      return this.generateFallbackScreenContent(screenType, appType);
    }
  }

  buildScreenSystemPrompt() {
    return `You are an expert UI/UX designer specializing in creating detailed, realistic screen mockups for mobile and web applications.

Your task is to generate comprehensive screen content that includes:
1. Realistic text content, headings, and copy
2. Detailed layout specifications with exact positioning
3. Interactive elements with specific functionality
4. Visual hierarchy and design patterns
5. Realistic data examples (names, products, content)
6. Micro-interactions and animations
7. Accessibility considerations

Return a JSON object with this structure:
{
  "layout": {
    "type": "header-content-footer|sidebar-main|grid|list|form",
    "sections": [
      {
        "name": "header|hero|content|sidebar|footer",
        "position": {"x": 0, "y": 0, "width": "100%", "height": "60px"},
        "elements": []
      }
    ]
  },
  "content": {
    "headings": ["Main heading", "Subheading"],
    "text": ["Body text content"],
    "buttons": [{"text": "Button text", "action": "action_name", "style": "primary|secondary"}],
    "images": [{"alt": "Image description", "placeholder": "image_name"}],
    "forms": [{"fields": [], "validation": []}]
  },
  "interactions": {
    "clickable": ["element_ids"],
    "hoverable": ["element_ids"],
    "scrollable": ["section_names"],
    "animations": [{"element": "id", "type": "fade|slide|scale", "trigger": "load|click|hover"}]
  },
  "data": {
    "realistic_examples": "Include realistic sample data like product names, user names, etc."
  },
  "responsive": {
    "mobile": {"layout_adjustments": ""},
    "tablet": {"layout_adjustments": ""},
    "desktop": {"layout_adjustments": ""}
  }
}

Make the content feel real and production-ready, not placeholder text.`;
  }

  buildScreenUserPrompt(screenType, appType, appDescription, designSystem) {
    return `Generate a detailed ${screenType} screen for a ${appType} application.

App Description: ${appDescription}

Screen Type: ${screenType}
App Type: ${appType}

Design System Context:
- Primary Color: ${designSystem?.colors?.primary || '#3B82F6'}
- Secondary Color: ${designSystem?.colors?.secondary || '#8B5CF6'}
- Typography: ${designSystem?.typography?.fontFamily || 'Inter, sans-serif'}
- Style: ${designSystem?.style || 'modern'}

Requirements:
1. Create realistic, engaging content that fits the app type
2. Include specific UI elements appropriate for this screen
3. Use realistic data examples (product names, user content, etc.)
4. Design for modern UX patterns and best practices
5. Include interactive elements and micro-animations
6. Consider accessibility and usability
7. Make it feel like a real, production app screen

Focus on creating content that users would actually see and interact with, not generic placeholders.`;
  }

  enhanceScreenContent(aiResult, screenType, appType) {
    // Add additional enhancements based on screen type
    const enhancements = {
      'e-commerce': {
        'home': {
          additionalElements: ['search-suggestions', 'trending-products', 'user-reviews'],
          microInteractions: ['product-hover-effects', 'cart-animation', 'wishlist-heart']
        },
        'product-detail': {
          additionalElements: ['size-guide', 'shipping-calculator', 'related-products'],
          microInteractions: ['image-zoom', 'color-selection', 'quantity-stepper']
        },
        'cart': {
          additionalElements: ['promo-codes', 'shipping-options', 'saved-items'],
          microInteractions: ['quantity-update', 'remove-animation', 'total-calculation']
        }
      },
      'social': {
        'feed': {
          additionalElements: ['story-highlights', 'trending-hashtags', 'suggested-users'],
          microInteractions: ['double-tap-like', 'pull-to-refresh', 'infinite-scroll']
        },
        'profile': {
          additionalElements: ['bio-highlights', 'photo-grid', 'activity-stats'],
          microInteractions: ['follow-button', 'photo-lightbox', 'stats-animation']
        }
      }
    };

    const enhancement = enhancements[appType]?.[screenType];
    if (enhancement) {
      aiResult.enhancements = enhancement;
    }

    return aiResult;
  }

  generateFallbackScreenContent(screenType, appType) {
    const fallbackContent = {
      'e-commerce': {
        'home': {
          layout: {
            type: 'header-hero-grid-footer',
            sections: [
              {
                name: 'header',
                position: { x: 0, y: 0, width: '100%', height: '60px' },
                elements: ['logo', 'search', 'cart', 'menu']
              },
              {
                name: 'hero',
                position: { x: 0, y: 60, width: '100%', height: '400px' },
                elements: ['hero-image', 'title', 'cta-button']
              },
              {
                name: 'products',
                position: { x: 0, y: 460, width: '100%', height: 'auto' },
                elements: ['product-grid']
              }
            ]
          },
          content: {
            headings: ['Discover Amazing Products', 'Featured Items', 'Best Sellers'],
            text: ['Shop the latest trends with free shipping worldwide'],
            buttons: [
              { text: 'Shop Now', action: 'navigate_products', style: 'primary' },
              { text: 'View All', action: 'view_all', style: 'secondary' }
            ],
            images: [
              { alt: 'Hero banner', placeholder: 'hero-shopping' },
              { alt: 'Product image', placeholder: 'product-placeholder' }
            ]
          },
          data: {
            products: [
              { name: 'Wireless Headphones', price: '$99.99', rating: 4.5 },
              { name: 'Smart Watch', price: '$199.99', rating: 4.8 },
              { name: 'Laptop Stand', price: '$49.99', rating: 4.2 }
            ]
          }
        }
      }
    };

    return fallbackContent[appType]?.[screenType] || {
      layout: { type: 'generic', sections: [] },
      content: { headings: [`${screenType} Screen`], text: ['Content for this screen'] }
    };
  }

  async generateScreenSVG(screenContent, designSystem) {
    // Generate SVG representation of the screen
    const width = 375; // Mobile width
    const height = 812; // Mobile height
    
    let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;
    
    // Background
    svg += `<rect width="${width}" height="${height}" fill="${designSystem?.colors?.background || '#ffffff'}"/>`;
    
    // Generate elements based on layout
    if (screenContent.layout && screenContent.layout.sections) {
      for (const section of screenContent.layout.sections) {
        svg += this.renderSectionToSVG(section, designSystem);
      }
    }
    
    svg += '</svg>';
    return svg;
  }

  renderSectionToSVG(section, designSystem) {
    let sectionSVG = '';
    const y = parseInt(section.position.y) || 0;
    const height = parseInt(section.position.height) || 100;
    
    // Section background
    sectionSVG += `<rect x="0" y="${y}" width="375" height="${height}" fill="${designSystem?.colors?.surface || '#f9fafb'}" stroke="${designSystem?.colors?.border || '#e5e7eb'}"/>`;
    
    // Section title
    sectionSVG += `<text x="20" y="${y + 30}" font-family="${designSystem?.typography?.fontFamily || 'Arial'}" font-size="16" fill="${designSystem?.colors?.text || '#111827'}">${section.name}</text>`;
    
    return sectionSVG;
  }
}

module.exports = ScreenContentGenerator;