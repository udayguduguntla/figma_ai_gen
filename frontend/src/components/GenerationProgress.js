import React from 'react';
import { motion } from 'framer-motion';
import { useDesignStore } from '../store/designStore';

export default function GenerationProgress() {
  const { generationProgress } = useDesignStore();

  const steps = [
    { name: 'Analyzing prompt', progress: 20 },
    { name: 'Generating user flows', progress: 40 },
    { name: 'Creating screens', progress: 60 },
    { name: 'Building components', progress: 80 },
    { name: 'Finalizing design system', progress: 100 }
  ];

  const currentStep = steps.find(step => generationProgress <= step.progress) || steps[steps.length - 1];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-xl p-8 text-center"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Generating Your Design
        </h2>
        <p className="text-gray-600">
          This may take a few minutes for comprehensive applications
        </p>
      </div>

      {/* Progress Circle */}
      <div className="relative w-32 h-32 mx-auto mb-8">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="54"
            stroke="#e5e7eb"
            strokeWidth="12"
            fill="none"
          />
          <motion.circle
            cx="60"
            cy="60"
            r="54"
            stroke="#3b82f6"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={339.292}
            initial={{ strokeDashoffset: 339.292 }}
            animate={{ strokeDashoffset: 339.292 - (339.292 * generationProgress) / 100 }}
            transition={{ duration: 0.5 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-900">
            {generationProgress}%
          </span>
        </div>
      </div>

      {/* Current Step */}
      <div className="mb-6">
        <p className="text-lg font-medium text-gray-900 mb-2">
          {currentStep.name}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-blue-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${generationProgress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center space-x-3 ${
              generationProgress >= step.progress
                ? 'text-green-600'
                : generationProgress >= step.progress - 20
                ? 'text-blue-600'
                : 'text-gray-400'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full border-2 ${
                generationProgress >= step.progress
                  ? 'bg-green-600 border-green-600'
                  : generationProgress >= step.progress - 20
                  ? 'border-blue-600'
                  : 'border-gray-300'
              }`}
            />
            <span className="text-sm">{step.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}