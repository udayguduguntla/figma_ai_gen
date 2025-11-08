const axios = require('axios');
const db = require('../database/mockDB');

class FigmaService {
  constructor(accessToken) {
    this.accessToken = accessToken;
    this.baseURL = 'https://api.figma.com/v1';
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'X-Figma-Token': this.accessToken,
        'Content-Type': 'application/json'
      }
    });
  }

  async createDesignFile(designId) {
    try {
      // Get design data (would typically fetch from database)
      const design = await this.getDesignData(designId);
      
      // Create new Figma file
      const fileData = await this.createFile(design);
      
      // Add pages and frames for each screen
      await this.createScreens(fileData.key, design.screens);
      
      // Add components and design system
      await this.createComponents(fileData.key, design.components);
      
      return {
        id: fileData.key,
        url: `https://www.figma.com/file/${fileData.key}`,
        name: fileData.name
      };
      
    } catch (error) {
      console.error('Figma file creation error:', error);
      throw new Error('Failed to create Figma file');
    }
  }

  async createFile(design) {
    // Note: Figma API doesn't support file creation via REST API
    // This would typically use Figma Plugin API or manual file creation
    // For now, we'll simulate the response
    
    return {
      key: `figma-${Date.now()}`,
      name: `${design.requirements.appType} - Generated Design`,
      thumbnail_url: null,
      last_modified: new Date().toISOString()
    };
  }

  async createScreens(fileKey, screens) {
    const pages = [];
    
    for (const screen of screens) {
      const page = {
        id: screen.id,
        name: screen.name,
        type: 'CANVAS',
        children: await this.createFramesForScreen(screen)
      };
      
      pages.push(page);
    }
    
    return pages;
  }

  async createFramesForScreen(screen) {
    const frames = [];
    
    // Create mobile frame
    frames.push({
      id: `${screen.id}-mobile`,
      name: `${screen.name} - Mobile`,
      type: 'FRAME',
      width: 375,
      height: 812,
      children: await this.createComponentsForFrame(screen, 'mobile')
    });
    
    // Create desktop frame
    frames.push({
      id: `${screen.id}-desktop`,
      name: `${screen.name} - Desktop`,
      type: 'FRAME',
      width: 1440,
      height: 1024,
      children: await this.createComponentsForFrame(screen, 'desktop')
    });
    
    return frames;
  }

  async createComponentsForFrame(screen, viewport) {
    const components = [];
    
    for (const componentName of screen.components) {
      const component = {
        id: `${screen.id}-${componentName}-${viewport}`,
        name: componentName,
        type: 'RECTANGLE', // Simplified - would be actual component type
        width: this.getComponentWidth(componentName, viewport),
        height: this.getComponentHeight(componentName, viewport),
        x: this.getComponentX(componentName, viewport),
        y: this.getComponentY(componentName, viewport),
        fills: [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }]
      };
      
      components.push(component);
    }
    
    return components;
  }

  async createComponents(fileKey, components) {
    // Create component library
    const componentSets = [];
    
    for (const component of components) {
      const componentSet = {
        id: component.id,
        name: component.name,
        type: 'COMPONENT_SET',
        children: await this.createComponentVariants(component)
      };
      
      componentSets.push(componentSet);
    }
    
    return componentSets;
  }

  async createComponentVariants(component) {
    const variants = [];
    
    for (const variant of component.variants) {
      variants.push({
        id: `${component.id}-${variant}`,
        name: `${component.name}/${variant}`,
        type: 'COMPONENT',
        width: 200,
        height: 40,
        // Component styling would go here
      });
    }
    
    return variants;
  }

  async updateFile(fileKey, updates) {
    try {
      // Figma API doesn't support direct file updates via REST
      // This would typically use the Plugin API
      
      return {
        success: true,
        message: 'File update queued'
      };
      
    } catch (error) {
      console.error('Figma update error:', error);
      throw new Error('Failed to update Figma file');
    }
  }

  async getDesignData(designId) {
    const design = await db.getDesign(designId);
    if (!design) {
      throw new Error('Design not found');
    }
    return design;
  }

  // Helper methods for component positioning
  getComponentWidth(componentName, viewport) {
    const widths = {
      mobile: { Header: 375, Hero: 375, ProductGrid: 375 },
      desktop: { Header: 1440, Hero: 1440, ProductGrid: 1200 }
    };
    return widths[viewport][componentName] || 200;
  }

  getComponentHeight(componentName, viewport) {
    const heights = {
      Header: 60, Hero: 400, ProductGrid: 600, ProductDetail: 800
    };
    return heights[componentName] || 100;
  }

  getComponentX(componentName, viewport) {
    return viewport === 'desktop' && componentName === 'ProductGrid' ? 120 : 0;
  }

  getComponentY(componentName, viewport) {
    const positions = {
      Header: 0, Hero: 60, ProductGrid: 460, ProductDetail: 60
    };
    return positions[componentName] || 0;
  }
}

module.exports = FigmaService;