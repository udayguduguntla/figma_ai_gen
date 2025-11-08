const crypto = require('crypto');
const ScreenRenderer = require('./ScreenRenderer');

// Simple UUID generator since uuid package might not be installed
function generateId() {
  return crypto.randomBytes(16).toString('hex');
}

class DesignGenerator {
  constructor() {
    this.designTemplates = require('../templates/designTemplates');
    this.screenRenderer = new ScreenRenderer();
  }

  async generateDesign(requirements) {
    try {
      const designId = generateId();
      
      const design = {
        id: designId,
        timestamp: new Date().toISOString(),
        requirements,
        screens: await this.generateScreens(requirements),
        components: await this.generateComponents(requirements),
        designSystem: await this.generateDesignSystem(requirements),
        userFlows: await this.generateUserFlows(requirements),
        assets: await this.generateAssets(requirements)
      };

      return design;
      
    } catch (error) {
      console.error('Design generation error:', error);
      throw new Error('Failed to generate design structure');
    }
  }

  async generateScreens(requirements) {
    const screens = [];
    
    for (const screenType of requirements.screenTypes) {
      const screenName = screenType.name || screenType;
      const screenTypeName = screenType.type || screenType;
      
      console.log(`Generating enhanced screen: ${screenName}`);
      
      // Generate visual mockup using ScreenRenderer
      const mockup = this.screenRenderer.generateScreenMockup(
        screenTypeName, 
        requirements.appType, 
        requirements.designSystem
      );
      
      // Generate enhanced SVG preview
      const svgPreview = this.generateEnhancedSVG(screenTypeName, requirements.appType, requirements.designSystem);
      
      const screen = {
        id: generateId(),
        name: screenName,
        type: screenTypeName,
        layout: mockup.layout,
        mockup: {
          ...mockup.mockup,
          svg: svgPreview
        },
        elements: mockup.elements,
        components: await this.getScreenComponents(screenTypeName, requirements),
        interactions: mockup.interactions,
        responsive: mockup.responsive,
        preview: {
          thumbnail: svgPreview,
          description: `${screenName} - Interactive ${requirements.appType} screen`,
          keyFeatures: this.getScreenKeyFeatures(screenTypeName, requirements.appType),
          enhanced: true
        }
      };
      
      screens.push(screen);
    }
    
    return screens;
  }

  async generateScreenLayout(screenType, requirements) {
    const baseLayouts = {
      'home': {
        header: { height: 60, components: ['logo', 'navigation', 'user-menu'] },
        hero: { height: 400, components: ['headline', 'cta-button', 'hero-image'] },
        content: { components: ['feature-grid', 'testimonials', 'newsletter'] },
        footer: { height: 200, components: ['links', 'social', 'copyright'] }
      },
      'product-list': {
        header: { height: 60, components: ['logo', 'search', 'cart'] },
        filters: { width: 250, components: ['category-filter', 'price-filter'] },
        content: { components: ['product-grid', 'pagination'] },
        footer: { height: 200, components: ['links', 'social'] }
      },
      'profile': {
        header: { height: 60, components: ['logo', 'navigation'] },
        sidebar: { width: 300, components: ['avatar', 'menu', 'stats'] },
        content: { components: ['profile-form', 'activity-feed'] }
      }
    };
    
    return baseLayouts[screenType] || baseLayouts['home'];
  }

  async generateComponents(requirements) {
    const components = [];
    const componentTypes = [
      'Button', 'Input', 'Card', 'Modal', 'Navigation', 'Header', 'Footer',
      'ProductCard', 'UserProfile', 'SearchBar', 'Filter', 'Pagination'
    ];
    
    for (const type of componentTypes) {
      components.push({
        id: generateId(),
        name: type,
        type: type.toLowerCase(),
        variants: await this.generateComponentVariants(type, requirements),
        props: await this.generateComponentProps(type),
        styling: await this.generateComponentStyling(type, requirements.designSystem)
      });
    }
    
    return components;
  }

  async generateDesignSystem(requirements) {
    return {
      colors: {
        primary: requirements.designSystem?.colors?.primary || '#007bff',
        secondary: requirements.designSystem?.colors?.secondary || '#6c757d',
        success: '#28a745',
        warning: '#ffc107',
        error: '#dc3545',
        background: '#ffffff',
        surface: '#f8f9fa',
        text: '#212529'
      },
      typography: {
        fontFamily: requirements.designSystem?.typography?.fontFamily || 'Inter, sans-serif',
        sizes: {
          xs: '12px', sm: '14px', md: '16px', lg: '18px', xl: '24px', xxl: '32px'
        },
        weights: { light: 300, regular: 400, medium: 500, bold: 700 }
      },
      spacing: {
        xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px', xxl: '48px'
      },
      borderRadius: {
        sm: '4px', md: '8px', lg: '12px', xl: '16px'
      },
      shadows: {
        sm: '0 1px 3px rgba(0,0,0,0.1)',
        md: '0 4px 6px rgba(0,0,0,0.1)',
        lg: '0 10px 15px rgba(0,0,0,0.1)'
      }
    };
  }

  async generateUserFlows(requirements) {
    return requirements.userFlows || [];
  }

  async generateAssets(requirements) {
    return {
      icons: ['home', 'search', 'cart', 'user', 'menu', 'close', 'arrow'],
      images: ['logo', 'hero-image', 'placeholder'],
      illustrations: ['empty-state', 'error-404', 'success']
    };
  }

  async generateComponentVariants(type, requirements) {
    const variants = {
      'Button': ['primary', 'secondary', 'outline', 'ghost', 'link'],
      'Input': ['text', 'email', 'password', 'search', 'textarea'],
      'Card': ['basic', 'elevated', 'outlined', 'interactive']
    };
    
    return variants[type] || ['default'];
  }

  async generateComponentProps(type) {
    const props = {
      'Button': ['variant', 'size', 'disabled', 'loading', 'onClick'],
      'Input': ['type', 'placeholder', 'value', 'onChange', 'error'],
      'Card': ['elevation', 'padding', 'onClick', 'children']
    };
    
    return props[type] || ['children'];
  }

  async generateComponentStyling(type, designSystem) {
    return {
      base: {},
      variants: {},
      responsive: {}
    };
  }

  async getScreenComponents(screenType, requirements) {
    const screenComponents = {
      'home': ['Header', 'Hero', 'FeatureGrid', 'Testimonials', 'Footer'],
      'product-list': ['Header', 'FilterSidebar', 'ProductGrid', 'Pagination'],
      'product-detail': ['Header', 'ProductImages', 'ProductInfo', 'Reviews'],
      'cart': ['Header', 'CartItems', 'OrderSummary', 'CheckoutButton'],
      'profile': ['Header', 'ProfileSidebar', 'ProfileContent']
    };
    
    return screenComponents[screenType] || ['Header', 'Content', 'Footer'];
  }

  async generateInteractions(screenType, requirements) {
    return {
      gestures: ['tap', 'swipe', 'scroll'],
      animations: ['fade', 'slide', 'scale'],
      transitions: ['page', 'modal', 'drawer']
    };
  }

  async generateResponsiveVariants(screenType) {
    return {
      mobile: { breakpoint: '0px', columns: 1 },
      tablet: { breakpoint: '768px', columns: 2 },
      desktop: { breakpoint: '1024px', columns: 3 }
    };
  }

  getScreenKeyFeatures(screenType, appType) {
    const features = {
      'e-commerce': {
        'home': ['Product showcase', 'Search functionality', 'Category navigation', 'Featured deals'],
        'product-detail': ['Product images', 'Detailed description', 'Reviews & ratings', 'Add to cart'],
        'cart': ['Item management', 'Quantity adjustment', 'Price calculation', 'Checkout process'],
        'login': ['Secure authentication', 'Social login options', 'Password recovery', 'Remember me'],
        'checkout': ['Shipping details', 'Payment methods', 'Order summary', 'Confirmation'],
        'profile': ['User information', 'Order history', 'Preferences', 'Account settings']
      },
      'social': {
        'feed': ['Content timeline', 'Like & comment', 'Share functionality', 'Real-time updates'],
        'profile': ['User bio', 'Photo gallery', 'Follower count', 'Activity feed'],
        'create-post': ['Media upload', 'Text editor', 'Privacy settings', 'Hashtags'],
        'messages': ['Chat interface', 'Media sharing', 'Online status', 'Message history']
      },
      'productivity': {
        'dashboard': ['Overview metrics', 'Quick actions', 'Recent activity', 'Progress tracking'],
        'tasks': ['Task creation', 'Priority levels', 'Due dates', 'Status tracking'],
        'projects': ['Project overview', 'Team members', 'Milestones', 'File sharing'],
        'calendar': ['Event scheduling', 'Meeting rooms', 'Reminders', 'Time blocking']
      }
    };
    
    return features[appType]?.[screenType] || ['Interactive elements', 'User-friendly design', 'Responsive layout'];
  }
}

  generateEnhancedSVG(screenType, appType, designSystem) {
    const width = 375;
    const height = 812;
    const colors = designSystem?.colors || {
      primary: '#3B82F6',
      secondary: '#8B5CF6',
      background: '#FFFFFF',
      surface: '#F9FAFB',
      text: '#111827'
    };

    let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" style="background: ${colors.background}">`;
    
    // Generate screen-specific content
    if (appType === 'e-commerce') {
      svg += this.generateEcommerceSVG(screenType, colors, width, height);
    } else if (appType === 'social') {
      svg += this.generateSocialSVG(screenType, colors, width, height);
    } else {
      svg += this.generateGenericSVG(screenType, colors, width, height);
    }
    
    svg += '</svg>';
    return svg;
  }

  generateEcommerceSVG(screenType, colors, width, height) {
    switch (screenType) {
      case 'home':
        return `
          <!-- Header -->
          <rect x="0" y="0" width="${width}" height="60" fill="${colors.surface}" stroke="#e5e7eb"/>
          <text x="20" y="35" font-family="Arial" font-size="16" font-weight="bold" fill="${colors.text}">ShopApp</text>
          <rect x="280" y="15" width="80" height="30" rx="15" fill="${colors.primary}"/>
          <text x="310" y="33" font-family="Arial" font-size="12" fill="white">Cart (2)</text>
          
          <!-- Hero Section -->
          <rect x="0" y="60" width="${width}" height="200" fill="url(#heroGradient)"/>
          <defs>
            <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:${colors.primary};stop-opacity:1" />
              <stop offset="100%" style="stop-color:${colors.secondary};stop-opacity:1" />
            </linearGradient>
          </defs>
          <text x="20" y="140" font-family="Arial" font-size="24" font-weight="bold" fill="white">Summer Sale</text>
          <text x="20" y="165" font-family="Arial" font-size="14" fill="white">Up to 50% off on selected items</text>
          <rect x="20" y="180" width="100" height="35" rx="18" fill="white"/>
          <text x="55" y="200" font-family="Arial" font-size="12" font-weight="bold" fill="${colors.primary}">Shop Now</text>
          
          <!-- Product Grid -->
          <g transform="translate(20, 280)">
            ${this.generateProductCards(colors, 3)}
          </g>
        `;
      
      case 'product-detail':
        return `
          <!-- Header -->
          <rect x="0" y="0" width="${width}" height="60" fill="${colors.surface}" stroke="#e5e7eb"/>
          <text x="20" y="35" font-family="Arial" font-size="16" font-weight="bold" fill="${colors.text}">Product Details</text>
          
          <!-- Product Image -->
          <rect x="20" y="80" width="${width-40}" height="250" rx="8" fill="#f3f4f6" stroke="#e5e7eb"/>
          <text x="${width/2}" y="210" text-anchor="middle" font-family="Arial" font-size="14" fill="#6b7280">Product Image</text>
          
          <!-- Product Info -->
          <text x="20" y="360" font-family="Arial" font-size="20" font-weight="bold" fill="${colors.text}">Wireless Headphones</text>
          <text x="20" y="385" font-family="Arial" font-size="18" font-weight="bold" fill="${colors.primary}">$99.99</text>
          <text x="20" y="410" font-family="Arial" font-size="14" fill="#6b7280">★★★★☆ (4.5) • 1,234 reviews</text>
          
          <!-- Add to Cart Button -->
          <rect x="20" y="450" width="${width-40}" height="50" rx="25" fill="${colors.primary}"/>
          <text x="${width/2}" y="480" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="white">Add to Cart</text>
        `;
      
      default:
        return this.generateGenericSVG(screenType, colors, width, height);
    }
  }

  generateSocialSVG(screenType, colors, width, height) {
    switch (screenType) {
      case 'feed':
        return `
          <!-- Header -->
          <rect x="0" y="0" width="${width}" height="60" fill="${colors.surface}" stroke="#e5e7eb"/>
          <text x="20" y="35" font-family="Arial" font-size="16" font-weight="bold" fill="${colors.text}">Social Feed</text>
          
          <!-- Posts -->
          <g transform="translate(0, 70)">
            ${this.generateSocialPosts(colors, width)}
          </g>
        `;
      
      default:
        return this.generateGenericSVG(screenType, colors, width, height);
    }
  }

  generateGenericSVG(screenType, colors, width, height) {
    return `
      <!-- Header -->
      <rect x="0" y="0" width="${width}" height="60" fill="${colors.surface}" stroke="#e5e7eb"/>
      <text x="20" y="35" font-family="Arial" font-size="16" font-weight="bold" fill="${colors.text}">${screenType}</text>
      
      <!-- Content Area -->
      <rect x="20" y="80" width="${width-40}" height="200" rx="8" fill="${colors.surface}" stroke="#e5e7eb"/>
      <text x="${width/2}" y="190" text-anchor="middle" font-family="Arial" font-size="14" fill="#6b7280">${screenType} Content</text>
    `;
  }

  generateProductCards(colors, count) {
    let cards = '';
    const cardWidth = 100;
    const cardHeight = 140;
    const gap = 15;
    
    for (let i = 0; i < count; i++) {
      const x = i * (cardWidth + gap);
      cards += `
        <g transform="translate(${x}, 0)">
          <rect width="${cardWidth}" height="${cardHeight}" rx="8" fill="${colors.surface}" stroke="#e5e7eb"/>
          <rect x="10" y="10" width="80" height="60" rx="4" fill="#f3f4f6"/>
          <text x="50" y="45" text-anchor="middle" font-family="Arial" font-size="10" fill="#6b7280">Product</text>
          <text x="10" y="90" font-family="Arial" font-size="12" font-weight="bold" fill="${colors.text}">Item ${i+1}</text>
          <text x="10" y="110" font-family="Arial" font-size="12" font-weight="bold" fill="${colors.primary}">$${(i+1)*25}.99</text>
          <text x="10" y="125" font-family="Arial" font-size="10" fill="#6b7280">★★★★☆</text>
        </g>
      `;
    }
    return cards;
  }

  generateSocialPosts(colors, width) {
    return `
      <!-- Post 1 -->
      <rect x="20" y="0" width="${width-40}" height="120" rx="8" fill="${colors.surface}" stroke="#e5e7eb"/>
      <circle cx="40" cy="25" r="15" fill="#f3f4f6"/>
      <text x="65" y="25" font-family="Arial" font-size="14" font-weight="bold" fill="${colors.text}">John Doe</text>
      <text x="65" y="40" font-family="Arial" font-size="12" fill="#6b7280">2 hours ago</text>
      <text x="25" y="65" font-family="Arial" font-size="14" fill="${colors.text}">Just captured this amazing sunset! 🌅</text>
      <text x="25" y="95" font-family="Arial" font-size="12" fill="#6b7280">❤️ 234 likes • 💬 45 comments</text>
      
      <!-- Post 2 -->
      <rect x="20" y="140" width="${width-40}" height="120" rx="8" fill="${colors.surface}" stroke="#e5e7eb"/>
      <circle cx="40" cy="165" r="15" fill="#f3f4f6"/>
      <text x="65" y="165" font-family="Arial" font-size="14" font-weight="bold" fill="${colors.text}">Sarah Wilson</text>
      <text x="65" y="180" font-family="Arial" font-size="12" fill="#6b7280">4 hours ago</text>
      <text x="25" y="205" font-family="Arial" font-size="14" fill="${colors.text}">Working on a new photography project</text>
      <text x="25" y="235" font-family="Arial" font-size="12" fill="#6b7280">❤️ 156 likes • 💬 23 comments</text>
    `;
  }}

m
odule.exports = DesignGenerator;