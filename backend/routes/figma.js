const express = require('express');
const router = oq express.Router();
const FigmaService = require('../services/FigmaService');

// Create Figma file from design
router.post('/create', async (req, res) => {
    try {
        const { designId, figmaToken } = req.body;

        if (!designId || !figmaToken) {
            return res.status(400).json({
                error: 'Design ID and Figma token are required'
            });
        }

        const figmaService = new FigmaService(figmaToken);
        const figmaFile = await figmaService.createDesignFile(designId);

        res.json({
            success: true,
            figmaFileId: figmaFile.id,
            figmaUrl: figmaFile.url,
            message: 'Figma file created successfully'
        });

    } catch (error) {
        console.error('Figma creation error:', error);
        res.status(500).json({
            error: 'Failed to create Figma file',
            message: error.message
        });
    }
});

// Update existing Figma file
router.put('/update/:fileId', async (req, res) => {
    try {
        const { fileId } = req.params;
        const { updates, figmaToken } = req.body;

        const figmaService = new FigmaService(figmaToken);
        const result = await figmaService.updateFile(fileId, updates);

        res.json({
            success: true,
            result,
            message: 'Figma file updated successfully'
        });

    } catch (error) {
        console.error('Figma update error:', error);
        res.status(500).json({
            error: 'Failed to update Figma file',
            message: error.message
        });
    }
});

module.exports = router;