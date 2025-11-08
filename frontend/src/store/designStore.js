import { create } from 'zustand';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const useDesignStore = create((set, get) => ({
  currentDesign: null,
  isGenerating: false,
  generationProgress: 0,
  error: null,

  generateDesign: async (prompt, preferences) => {
    set({ isGenerating: true, generationProgress: 0, error: null });
    
    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        set(state => ({ 
          generationProgress: Math.min(state.generationProgress + 10, 90) 
        }));
      }, 500);

      const response = await axios.post(`${API_URL}/api/design/generate`, {
        prompt,
        preferences
      });

      clearInterval(progressInterval);
      
      if (response.data.success) {
        set({ 
          currentDesign: response.data.structure,
          generationProgress: 100,
          isGenerating: false 
        });
      } else {
        throw new Error(response.data.error || 'Generation failed');
      }
      
    } catch (error) {
      set({ 
        error: error.message || 'Failed to generate design',
        isGenerating: false,
        generationProgress: 0
      });
      throw error;
    }
  },

  setCurrentDesign: (design) => {
    set({ currentDesign: design });
  },

  clearError: () => {
    set({ error: null });
  },

  exportToFigma: async (figmaToken) => {
    const { currentDesign } = get();
    if (!currentDesign) {
      throw new Error('No design to export');
    }

    try {
      const response = await axios.post(`${API_URL}/api/figma/create`, {
        designId: currentDesign.id,
        figmaToken
      });

      if (response.data.success) {
        return response.data.figmaUrl;
      } else {
        throw new Error(response.data.error || 'Export failed');
      }
      
    } catch (error) {
      throw new Error(error.message || 'Failed to export to Figma');
    }
  }
}));