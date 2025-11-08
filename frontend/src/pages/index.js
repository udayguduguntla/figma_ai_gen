import React from 'react';
import { motion } from 'framer-motion';
import { SparklesIcon, CogIcon, PaintBrushIcon } from '@heroicons/react/24/outline';
import PromptInput from '../components/PromptInput';
import GenerationProgress from '../components/GenerationProgress';
import DesignPreview from '../components/DesignPreview';
import { useDesignStore } from '../store/designStore';

export default function Home() {
  const { currentDesign, isGenerating } = useDesignStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            AI Figma Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your ideas into complete Figma designs. Just describe your app 
            and watch as we generate hundreds of screens, components, and user flows.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          <FeatureCard
            icon={<SparklesIcon className="w-8 h-8" />}
            title="AI-Powered Generation"
            description="Advanced AI analyzes your prompt and generates comprehensive design systems"
          />
          <FeatureCard
            icon={<PaintBrushIcon className="w-8 h-8" />}
            title="Complete Design Systems"
            description="Get colors, typography, components, and layouts that work together perfectly"
          />
          <FeatureCard
            icon={<CogIcon className="w-8 h-8" />}
            title="Figma Integration"
            description="Directly export to Figma with organized layers, components, and design tokens"
          />
        </motion.div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {!currentDesign && !isGenerating && <PromptInput />}
          {isGenerating && <GenerationProgress />}
          {currentDesign && !isGenerating && <DesignPreview design={currentDesign} />}
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}