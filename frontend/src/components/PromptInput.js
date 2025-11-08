import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { useDesignStore } from '../store/designStore';
import toast from 'react-hot-toast';

export default function PromptInput() {
  const [prompt, setPrompt] = useState('');
  const [preferences, setPreferences] = useState({
    style: 'modern',
    platform: 'mobile-first',
    complexity: 'comprehensive'
  });
  
  const { generateDesign, isGenerating } = useDesignStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      toast.error('Please enter a description of your app');
      return;
    }

    try {
      await generateDesign(prompt, preferences);
      toast.success('Design generation started!');
    } catch (error) {
      toast.error('Failed to start design generation');
    }
  };

  const examplePrompts = [
    "A modern e-commerce app for sustainable fashion with social features",
    "A productivity app for remote teams with task management and video calls",
    "A food delivery app with restaurant discovery and real-time tracking",
    "A fitness app with workout plans, nutrition tracking, and social challenges"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-xl p-8"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="prompt" className="block text-lg font-medium text-gray-900 mb-3">
            Describe your app idea
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="I want to build a shopping application with user authentication, product catalog, shopping cart, payment integration, order tracking, user reviews, wishlist functionality, and admin dashboard..."
            className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            disabled={isGenerating}
          />
        </div>

        {/* Preferences */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Design Style
            </label>
            <select
              value={preferences.style}
              onChange={(e) => setPreferences(prev => ({ ...prev, style: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              disabled={isGenerating}
            >
              <option value="modern">Modern</option>
              <option value="minimal">Minimal</option>
              <option value="playful">Playful</option>
              <option value="professional">Professional</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Platform Focus
            </label>
            <select
              value={preferences.platform}
              onChange={(e) => setPreferences(prev => ({ ...prev, platform: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              disabled={isGenerating}
            >
              <option value="mobile-first">Mobile First</option>
              <option value="desktop-first">Desktop First</option>
              <option value="responsive">Fully Responsive</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Complexity
            </label>
            <select
              value={preferences.complexity}
              onChange={(e) => setPreferences(prev => ({ ...prev, complexity: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              disabled={isGenerating}
            >
              <option value="basic">Basic (10-20 screens)</option>
              <option value="standard">Standard (30-50 screens)</option>
              <option value="comprehensive">Comprehensive (50+ screens)</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isGenerating || !prompt.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <PaperAirplaneIcon className="w-5 h-5" />
          <span>{isGenerating ? 'Generating...' : 'Generate Design'}</span>
        </button>
      </form>

      {/* Example Prompts */}
      <div className="mt-8">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Example prompts:</h3>
        <div className="space-y-2">
          {examplePrompts.map((example, index) => (
            <button
              key={index}
              onClick={() => setPrompt(example)}
              className="text-left text-sm text-blue-600 hover:text-blue-800 block w-full p-2 rounded hover:bg-blue-50 transition-colors"
              disabled={isGenerating}
            >
              "{example}"
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}