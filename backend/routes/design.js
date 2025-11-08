const express = require('express');
const router = express.Router();
const DesignGenerator = require('../services/DesignGenerator');
const AIProcessor = require('../services/AIProcessor');
const db = require('../database/mockDB');

// Generate design based on prompt
router.post('/generate', async (req, res) => {
  try {
    const { prompt, preferences = {} } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Process prompt with AI to extract requirements
    const aiProcessor = new AIProcessor();
    const designRequirements = await aiProcessor.processPrompt(prompt, preferences);
    
    // Generate design structure
    const designGenerator = new DesignGenerator();
    const designStructure = await designGenerator.generateDesign(designRequirements);
    
    // Save to database
    await db.saveDesign(designStructure);
    
    res.json({
      success: true,
      designId: designStructure.id,
      requirements: designRequirements,
      structure: designStructure,
      estimatedScreens: designStructure.screens.length
    });
    
  } catch (error) {
    console.error('Design generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate design',
      message: error.message 
    });
  }
});

// Get app statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = db.getStats();
    
    res.json({
      success: true,
      stats
    });
    
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch statistics',
      message: error.message 
    });
  }
});

// List all designs
router.get('/', async (req, res) => {
  try {
    const designs = await db.getAllDesigns();
    
    res.json({
      success: true,
      designs: designs.map(design => ({
        id: design.id,
        appType: design.requirements?.appType,
        screenCount: design.screens?.length || 0,
        createdAt: design.createdAt,
        estimatedComplexity: design.requirements?.estimatedComplexity
      }))
    });
    
  } catch (error) {
    console.error('List designs error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch designs',
      message: error.message 
    });
  }
});

// Get design details
router.get('/:designId', async (req, res) => {
  try {
    const { designId } = req.params;
    
    // Fetch design from database
    const design = await db.getDesign(designId);
    
    if (!design) {
      return res.status(404).json({
        error: 'Design not found'
      });
    }
    
    res.json({
      success: true,
      design
    });
    
  } catch (error) {
    console.error('Get design error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch design',
      message: error.message 
    });
  }
});

module.exports = router;