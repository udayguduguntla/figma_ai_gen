class ScreenRenderer {
  constructor() {
    this.screenTemplates = {
      'e-commerce': {
        'home': {
          layout: 'header-hero-grid-footer',
          elements: {
            header: {
              logo: { position: 'left', size: 'medium' },
              search: { position: 'center', width: '40%' },
              cart: { position: 'right', badge: true },
              menu: { position: 'right' }
            },
            hero: {
              background: 'gradient-blue',
              title: 'Discover Amazing Products',
              subtitle: 'Shop the latest trends with free shipping',
              cta: { text: 'Shop Now', style: 'primary' },
              image: 'hero-shopping'
            },
            productGrid: {
              columns: 3,
              items: [
                { image: 'product1', title: 'Wireless Headphones', price: '$99.99', rating: 4.5 },
                { image: 'product2', title: 'Smart Watch', price: '$199.99', rating: 4.8 },
                { image: 'product3', title: 'Laptop Stand', price: '$49.99', rating: 4.2 },
                { image: 'product4', title: 'Phone Case', price: '$24.99', rating: 4.6 },
                { image: 'product5', title: 'Bluetooth Speaker', price: '$79.99', rating: 4.4 },
                { image: 'product6', title: 'Desk Lamp', price: '$34.99', rating: 4.3 }
              ]
            },
            footer: {
              links: ['About', 'Contact', 'Privacy', 'Terms'],
              social: ['Facebook', 'Twitter', 'Instagram'],
              newsletter: true
            }
          }
        },
        'product-detail': {
          layout: 'header-product-details-reviews',
          elements: {
            header: {
              logo: { position: 'left' },
              search: { position: 'center' },
              cart: { position: 'right', badge: true }
            },
            productImages: {
              main: 'product-main-image',
              thumbnails: ['thumb1', 'thumb2', 'thumb3', 'thumb4'],
              zoom: true
            },
            productInfo: {
              title: 'Premium Wireless Headphones',
              price: '$99.99',
              originalPrice: '$129.99',
              rating: { stars: 4.5, reviews: 1234 },
              description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
              features: ['Noise Cancellation', '30h Battery', 'Wireless Charging', 'Premium Sound'],
              colors: ['Black', 'White', 'Blue'],
              sizes: ['One Size'],
              quantity: 1,
              buttons: [
                { text: 'Add to Cart', style: 'primary' },
                { text: 'Add to Wishlist', style: 'secondary' }
              ]
            },
            reviews: {
              average: 4.5,
              total: 1234,
              breakdown: { 5: 800, 4: 300, 3: 100, 2: 25, 1: 9 },
              recent: [
                { user: 'John D.', rating: 5, text: 'Amazing sound quality!', date: '2 days ago' },
                { user: 'Sarah M.', rating: 4, text: 'Great battery life', date: '1 week ago' }
              ]
            }
          }
        },
        'cart': {
          layout: 'header-cart-summary',
          elements: {
            header: {
              logo: { position: 'left' },
              breadcrumb: ['Home', 'Cart']
            },
            cartItems: [
              {
                image: 'product1',
                title: 'Wireless Headphones',
                price: '$99.99',
                quantity: 1,
                total: '$99.99'
              },
              {
                image: 'product2',
                title: 'Smart Watch',
                price: '$199.99',
                quantity: 2,
                total: '$399.98'
              }
            ],
            summary: {
              subtotal: '$499.97',
              shipping: 'Free',
              tax: '$45.00',
              total: '$544.97',
              promoCode: true,
              buttons: [
                { text: 'Continue Shopping', style: 'secondary' },
                { text: 'Proceed to Checkout', style: 'primary' }
              ]
            }
          }
        },
        'login': {
          layout: 'centered-form',
          elements: {
            form: {
              title: 'Welcome Back',
              subtitle: 'Sign in to your account',
              fields: [
                { type: 'email', label: 'Email Address', placeholder: 'Enter your email' },
                { type: 'password', label: 'Password', placeholder: 'Enter your password' }
              ],
              options: {
                rememberMe: true,
                forgotPassword: true
              },
              buttons: [
                { text: 'Sign In', style: 'primary', fullWidth: true }
              ],
              divider: 'or',
              socialLogin: [
                { provider: 'Google', icon: 'google' },
                { provider: 'Facebook', icon: 'facebook' }
              ],
              footer: {
                text: "Don't have an account?",
                link: { text: 'Sign up', href: '/register' }
              }
            }
          }
        }
      },
      'social': {
        'feed': {
          layout: 'header-feed-navigation',
          elements: {
            header: {
              logo: { position: 'left' },
              search: { position: 'center' },
              notifications: { position: 'right', badge: 3 },
              profile: { position: 'right' }
            },
            feed: [
              {
                user: { name: 'John Doe', avatar: 'avatar1', verified: true },
                timestamp: '2 hours ago',
                content: {
                  text: 'Just captured this amazing sunset! 🌅',
                  image: 'sunset-photo',
                  likes: 234,
                  comments: 45,
                  shares: 12
                }
              },
              {
                user: { name: 'Sarah Wilson', avatar: 'avatar2' },
                timestamp: '4 hours ago',
                content: {
                  text: 'Working on a new photography project. What do you think?',
                  images: ['photo1', 'photo2', 'photo3'],
                  likes: 156,
                  comments: 23,
                  shares: 8
                }
              }
            ],
            navigation: {
              items: [
                { icon: 'home', label: 'Home', active: true },
                { icon: 'search', label: 'Explore' },
                { icon: 'plus', label: 'Create' },
                { icon: 'heart', label: 'Activity' },
                { icon: 'user', label: 'Profile' }
              ]
            }
          }
        }
      }
    };
  }

  generateScreenMockup(screenType, appType, designSystem) {
    const template = this.screenTemplates[appType]?.[screenType];
    if (!template) {
      return this.generateGenericScreen(screenType, designSystem);
    }

    return {
      type: screenType,
      layout: template.layout,
      mockup: {
        html: this.generateHTML(template, designSystem),
        css: this.generateCSS(template, designSystem),
        preview: this.generatePreviewData(template)
      },
      elements: template.elements,
      interactions: this.generateInteractions(template),
      responsive: this.generateResponsiveVariants(template)
    };
  }

  generateHTML(template, designSystem) {
    // Generate HTML structure based on template
    return `
      <div class="screen-container">
        ${this.renderLayout(template.layout, template.elements, designSystem)}
      </div>
    `;
  }

  renderLayout(layout, elements, designSystem) {
    switch (layout) {
      case 'header-hero-grid-footer':
        return `
          <header class="app-header">${this.renderHeader(elements.header)}</header>
          <section class="hero-section">${this.renderHero(elements.hero)}</section>
          <main class="product-grid">${this.renderProductGrid(elements.productGrid)}</main>
          <footer class="app-footer">${this.renderFooter(elements.footer)}</footer>
        `;
      case 'header-product-details-reviews':
        return `
          <header class="app-header">${this.renderHeader(elements.header)}</header>
          <main class="product-detail">
            <div class="product-images">${this.renderProductImages(elements.productImages)}</div>
            <div class="product-info">${this.renderProductInfo(elements.productInfo)}</div>
          </main>
          <section class="reviews">${this.renderReviews(elements.reviews)}</section>
        `;
      case 'centered-form':
        return `
          <div class="form-container">
            ${this.renderForm(elements.form)}
          </div>
        `;
      default:
        return '<div class="generic-layout">Generic Screen Layout</div>';
    }
  }

  renderHeader(header) {
    return `
      <div class="header-content">
        <div class="logo">Brand Logo</div>
        <div class="search-bar">
          <input type="text" placeholder="Search products..." />
        </div>
        <div class="header-actions">
          <button class="cart-btn">Cart (${header.cart?.badge || 0})</button>
          <button class="menu-btn">Menu</button>
        </div>
      </div>
    `;
  }

  renderHero(hero) {
    return `
      <div class="hero-content">
        <h1>${hero.title}</h1>
        <p>${hero.subtitle}</p>
        <button class="cta-button">${hero.cta.text}</button>
      </div>
    `;
  }

  renderProductGrid(grid) {
    const items = grid.items.map(item => `
      <div class="product-card">
        <div class="product-image">[${item.image}]</div>
        <h3>${item.title}</h3>
        <div class="price">${item.price}</div>
        <div class="rating">★ ${item.rating}</div>
      </div>
    `).join('');

    return `<div class="product-grid-container">${items}</div>`;
  }

  generateCSS(template, designSystem) {
    return `
      .screen-container {
        font-family: ${designSystem.typography.fontFamily};
        color: ${designSystem.colors.text};
        background: ${designSystem.colors.background};
      }
      
      .app-header {
        background: ${designSystem.colors.surface};
        padding: ${designSystem.spacing.md};
        border-bottom: 1px solid ${designSystem.colors.border || '#e5e7eb'};
      }
      
      .hero-section {
        background: linear-gradient(135deg, ${designSystem.colors.primary}, ${designSystem.colors.secondary});
        color: white;
        padding: ${designSystem.spacing.xxl};
        text-align: center;
      }
      
      .product-grid-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: ${designSystem.spacing.lg};
        padding: ${designSystem.spacing.lg};
      }
      
      .product-card {
        background: ${designSystem.colors.surface};
        border-radius: ${designSystem.borderRadius.lg};
        padding: ${designSystem.spacing.md};
        box-shadow: ${designSystem.shadows.md};
      }
    `;
  }

  generatePreviewData(template) {
    return {
      thumbnail: this.generateThumbnail(template),
      description: this.generateDescription(template),
      keyElements: this.extractKeyElements(template)
    };
  }

  generateGenericScreen(screenType, designSystem) {
    return {
      type: screenType,
      layout: 'generic',
      mockup: {
        html: `<div class="generic-screen"><h2>${screenType} Screen</h2><p>Generic layout for ${screenType}</p></div>`,
        css: `.generic-screen { padding: 20px; text-align: center; }`,
        preview: { description: `${screenType} screen layout` }
      }
    };
  }

  generateInteractions(template) {
    return {
      clickable: ['buttons', 'links', 'cards'],
      hoverable: ['product-cards', 'navigation-items'],
      scrollable: ['feed', 'product-grid'],
      swipeable: ['image-gallery', 'carousel']
    };
  }

  generateResponsiveVariants(template) {
    return {
      mobile: { width: 375, columns: 1 },
      tablet: { width: 768, columns: 2 },
      desktop: { width: 1200, columns: 3 }
    };
  }
}

module.exports = ScreenRenderer;  r
enderForm(form) {
    return `
      <div class="form-wrapper">
        <h2>${form.title}</h2>
        <p>${form.subtitle}</p>
        <form class="login-form">
          ${form.fields.map(field => `
            <div class="form-field">
              <label>${field.label}</label>
              <input type="${field.type}" placeholder="${field.placeholder}" />
            </div>
          `).join('')}
          ${form.buttons.map(button => `
            <button class="btn btn-${button.style}">${button.text}</button>
          `).join('')}
        </form>
      </div>
    `;
  }

  renderFooter(footer) {
    return `
      <div class="footer-content">
        <div class="footer-links">
          ${footer.links.map(link => `<a href="#">${link}</a>`).join('')}
        </div>
        <div class="footer-social">
          ${footer.social.map(social => `<a href="#">${social}</a>`).join('')}
        </div>
      </div>
    `;
  }

  renderProductImages(images) {
    return `
      <div class="product-images">
        <div class="main-image">[${images.main}]</div>
        <div class="thumbnails">
          ${images.thumbnails.map(thumb => `<img src="#" alt="${thumb}" />`).join('')}
        </div>
      </div>
    `;
  }

  renderProductInfo(info) {
    return `
      <div class="product-info">
        <h1>${info.title}</h1>
        <div class="price">${info.price}</div>
        <div class="rating">★ ${info.rating.stars} (${info.rating.reviews} reviews)</div>
        <p>${info.description}</p>
        <div class="features">
          ${info.features.map(feature => `<span class="feature">${feature}</span>`).join('')}
        </div>
        <div class="actions">
          ${info.buttons.map(button => `
            <button class="btn btn-${button.style}">${button.text}</button>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderReviews(reviews) {
    return `
      <div class="reviews-section">
        <h3>Reviews (${reviews.total})</h3>
        <div class="rating-summary">
          <div class="average-rating">★ ${reviews.average}</div>
        </div>
        <div class="recent-reviews">
          ${reviews.recent.map(review => `
            <div class="review">
              <div class="review-header">
                <strong>${review.user}</strong>
                <span class="rating">★ ${review.rating}</span>
                <span class="date">${review.date}</span>
              </div>
              <p>${review.text}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  generateThumbnail(template) {
    return `Thumbnail for ${template.layout}`;
  }

  generateDescription(template) {
    return `Screen with ${template.layout} layout`;
  }

  extractKeyElements(template) {
    return Object.keys(template.elements || {});
  }