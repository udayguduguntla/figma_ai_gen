// Demo data generator for testing without OpenAI
const crypto = require('crypto');

function generateId() {
  return crypto.randomBytes(16).toString('hex');
}

function generateDemoDesign(prompt, preferences = {}) {
  const appType = detectAppType(prompt);
  const complexity = preferences.complexity || 'standard';
  
  const screenCounts = {
    basic: 15,
    standard: 35,
    comprehensive: 75
  };

  const screenCount = screenCounts[complexity] || 35;
  
  return {
    id: generateId(),
    timestamp: new Date().toISOString(),
    requirements: {
      appType,
      targetAudience: getTargetAudience(appType),
      primaryGoals: getPrimaryGoals(appType),
      keyFeatures: getKeyFeatures(appType),
      userFlows: getUserFlows(appType),
      screenTypes: generateScreenTypes(appType, screenCount),
      designSystem: getDesignSystem(preferences.style || 'modern'),
      estimatedComplexity: complexity
    },
    screens: generateScreens(appType, screenCount),
    components: generateComponents(appType),
    designSystem: getDesignSystem(preferences.style || 'modern'),
    userFlows: getUserFlows(appType),
    assets: getAssets(appType)
  };
}

function detectAppType(prompt) {
  const keywords = {
    'e-commerce': ['shop', 'buy', 'sell', 'product', 'cart', 'payment', 'store', 'marketplace', 'retail'],
    'social': ['social', 'friend', 'post', 'share', 'follow', 'chat', 'message', 'community', 'network'],
    'productivity': ['task', 'project', 'team', 'work', 'manage', 'organize', 'collaborate', 'office'],
    'fitness': ['fitness', 'workout', 'exercise', 'health', 'gym', 'training', 'nutrition', 'wellness'],
    'education': ['learn', 'course', 'study', 'education', 'school', 'student', 'teacher', 'training'],
    'finance': ['money', 'bank', 'payment', 'finance', 'budget', 'investment', 'wallet', 'crypto'],
    'travel': ['travel', 'trip', 'hotel', 'flight', 'booking', 'vacation', 'tourism', 'destination'],
    'food': ['food', 'restaurant', 'recipe', 'cooking', 'delivery', 'dining', 'meal', 'cuisine']
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

function getTargetAudience(appType) {
  const audiences = {
    'e-commerce': 'Online shoppers aged 18-45 looking for convenient shopping experiences',
    'social': 'Social media users aged 16-35 seeking connection and content sharing',
    'productivity': 'Professionals and teams needing efficient workflow management',
    'fitness': 'Health-conscious individuals aged 20-50 pursuing fitness goals',
    'education': 'Students and lifelong learners seeking knowledge and skills',
    'finance': 'Adults managing personal finances and investments',
    'travel': 'Travelers planning and booking trips and experiences',
    'food': 'Food enthusiasts and people seeking dining experiences'
  };
  
  return audiences[appType] || 'General users seeking efficient solutions';
}

function getPrimaryGoals(appType) {
  const goals = {
    'e-commerce': ['Increase sales conversion', 'Improve user experience', 'Build customer loyalty'],
    'social': ['Foster community engagement', 'Enable content sharing', 'Connect users'],
    'productivity': ['Enhance team collaboration', 'Streamline workflows', 'Increase efficiency'],
    'fitness': ['Motivate healthy habits', 'Track progress', 'Build fitness community'],
    'education': ['Facilitate learning', 'Track progress', 'Engage students'],
    'finance': ['Simplify money management', 'Provide insights', 'Ensure security'],
    'travel': ['Simplify trip planning', 'Enhance travel experience', 'Save money'],
    'food': ['Discover great food', 'Simplify ordering', 'Share experiences']
  };
  
  return goals[appType] || ['Solve user problems', 'Provide value', 'Ensure usability'];
}

function getKeyFeatures(appType) {
  const features = {
    'e-commerce': [
      { name: 'Product Catalog', description: 'Browse and search products', priority: 'high' },
      { name: 'Shopping Cart', description: 'Add and manage items', priority: 'high' },
      { name: 'Secure Checkout', description: 'Payment processing', priority: 'high' },
      { name: 'User Accounts', description: 'Registration and profiles', priority: 'high' },
      { name: 'Order Tracking', description: 'Monitor order status', priority: 'medium' },
      { name: 'Reviews & Ratings', description: 'Product feedback', priority: 'medium' },
      { name: 'Wishlist', description: 'Save favorite items', priority: 'low' },
      { name: 'Recommendations', description: 'Personalized suggestions', priority: 'low' }
    ],
    'social': [
      { name: 'User Profiles', description: 'Personal pages and info', priority: 'high' },
      { name: 'Content Feed', description: 'Timeline of posts', priority: 'high' },
      { name: 'Messaging', description: 'Direct communication', priority: 'high' },
      { name: 'Content Sharing', description: 'Post photos/videos', priority: 'high' },
      { name: 'Friend System', description: 'Connect with others', priority: 'medium' },
      { name: 'Notifications', description: 'Activity alerts', priority: 'medium' },
      { name: 'Groups', description: 'Community spaces', priority: 'low' }
    ]
  };
  
  return features[appType] || [
    { name: 'Core Functionality', description: 'Main app features', priority: 'high' },
    { name: 'User Management', description: 'Account system', priority: 'high' },
    { name: 'Settings', description: 'App configuration', priority: 'medium' }
  ];
}

function getUserFlows(appType) {
  const flows = {
    'e-commerce': [
      { name: 'User Registration', steps: ['Landing', 'Sign Up', 'Email Verification', 'Profile Setup'] },
      { name: 'Product Purchase', steps: ['Browse', 'Product Detail', 'Add to Cart', 'Checkout', 'Payment', 'Confirmation'] },
      { name: 'Order Management', steps: ['Order History', 'Track Order', 'Return Request'] }
    ],
    'social': [
      { name: 'User Onboarding', steps: ['Welcome', 'Sign Up', 'Profile Creation', 'Find Friends'] },
      { name: 'Content Creation', steps: ['Create Post', 'Add Media', 'Write Caption', 'Publish'] },
      { name: 'Social Interaction', steps: ['View Feed', 'Like/Comment', 'Share Content'] }
    ]
  };
  
  return flows[appType] || [
    { name: 'User Setup', steps: ['Registration', 'Profile', 'Preferences'] },
    { name: 'Core Usage', steps: ['Dashboard', 'Main Feature', 'Results'] }
  ];
}

function generateScreenTypes(appType, count) {
  const baseScreens = {
    'e-commerce': [
      'splash', 'onboarding', 'login', 'register', 'home', 'categories', 'search',
      'product-list', 'product-detail', 'cart', 'checkout', 'payment', 'order-confirmation',
      'profile', 'orders', 'order-detail', 'wishlist', 'reviews', 'settings',
      'shipping-address', 'payment-methods', 'notifications', 'help', 'about'
    ],
    'social': [
      'splash', 'onboarding', 'login', 'register', 'feed', 'profile', 'edit-profile',
      'create-post', 'messages', 'chat', 'notifications', 'search', 'discover',
      'friends', 'followers', 'following', 'settings', 'privacy', 'help'
    ]
  };

  const screens = baseScreens[appType] || [
    'splash', 'onboarding', 'login', 'register', 'home', 'profile', 'settings'
  ];

  // Extend screens to match desired count
  const extendedScreens = [...screens];
  while (extendedScreens.length < count) {
    extendedScreens.push(`screen-${extendedScreens.length + 1}`);
  }

  return extendedScreens.slice(0, count).map(screen => ({
    name: screen,
    type: screen,
    components: ['Header', 'Content', 'Navigation']
  }));
}

function generateScreens(appType, count) {
  const screenTypes = generateScreenTypes(appType, count);
  
  return screenTypes.map(screenType => ({
    id: generateId(),
    name: screenType.name,
    type: screenType.type,
    layout: {
      header: { height: 60, components: ['logo', 'navigation'] },
      content: { components: ['main-content'] },
      footer: { height: 80, components: ['navigation'] }
    },
    components: screenType.components,
    interactions: ['tap', 'swipe', 'scroll'],
    responsive: {
      mobile: { breakpoint: '0px', columns: 1 },
      tablet: { breakpoint: '768px', columns: 2 },
      desktop: { breakpoint: '1024px', columns: 3 }
    }
  }));
}

function generateComponents(appType) {
  const baseComponents = [
    'Button', 'Input', 'Card', 'Modal', 'Header', 'Navigation', 'Footer',
    'SearchBar', 'Avatar', 'Badge', 'Tabs', 'Dropdown', 'Checkbox', 'Radio'
  ];

  const appSpecificComponents = {
    'e-commerce': ['ProductCard', 'CartItem', 'PriceTag', 'Rating', 'Filter'],
    'social': ['PostCard', 'UserCard', 'MessageBubble', 'LikeButton', 'ShareButton'],
    'productivity': ['TaskCard', 'ProjectCard', 'Calendar', 'Chart', 'FileUpload'],
    'fitness': ['WorkoutCard', 'ExerciseCard', 'ProgressRing', 'Timer', 'Counter']
  };

  const allComponents = [
    ...baseComponents,
    ...(appSpecificComponents[appType] || [])
  ];

  return allComponents.map(name => ({
    id: generateId(),
    name,
    type: name.toLowerCase(),
    variants: ['default', 'primary', 'secondary'],
    props: ['children', 'onClick', 'disabled'],
    styling: {
      base: {},
      variants: {},
      responsive: {}
    }
  }));
}

function getDesignSystem(style) {
  const systems = {
    modern: {
      colors: {
        primary: '#3B82F6',
        secondary: '#8B5CF6',
        accent: '#10B981',
        background: '#FFFFFF',
        surface: '#F9FAFB',
        text: '#111827',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444'
      },
      typography: {
        fontFamily: 'Inter, sans-serif',
        sizes: { xs: '12px', sm: '14px', md: '16px', lg: '18px', xl: '24px', xxl: '32px' },
        weights: { light: 300, regular: 400, medium: 500, bold: 700 }
      },
      spacing: { xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px', xxl: '48px' },
      borderRadius: { sm: '4px', md: '8px', lg: '12px', xl: '16px' },
      shadows: {
        sm: '0 1px 3px rgba(0,0,0,0.1)',
        md: '0 4px 6px rgba(0,0,0,0.1)',
        lg: '0 10px 15px rgba(0,0,0,0.1)'
      }
    }
  };

  return systems[style] || systems.modern;
}

function getAssets(appType) {
  const baseAssets = {
    icons: ['home', 'search', 'user', 'settings', 'menu', 'close', 'arrow-left', 'arrow-right'],
    images: ['logo', 'placeholder', 'hero-image'],
    illustrations: ['empty-state', 'error-404', 'success', 'loading']
  };

  const appSpecificAssets = {
    'e-commerce': {
      icons: [...baseAssets.icons, 'cart', 'heart', 'star', 'filter', 'sort'],
      images: [...baseAssets.images, 'product-placeholder', 'category-banner'],
      illustrations: [...baseAssets.illustrations, 'empty-cart', 'order-success']
    },
    'social': {
      icons: [...baseAssets.icons, 'like', 'comment', 'share', 'message', 'camera'],
      images: [...baseAssets.images, 'avatar-placeholder', 'post-placeholder'],
      illustrations: [...baseAssets.illustrations, 'no-posts', 'no-friends']
    }
  };

  return appSpecificAssets[appType] || baseAssets;
}

module.exports = {
  generateDemoDesign,
  detectAppType,
  generateId
};