import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  EyeIcon, 
  DocumentDuplicateIcon, 
  ArrowDownTrayIcon,
  SparklesIcon 
} from '@heroicons/react/24/outline';
import FigmaExport from './FigmaExport';

export default function DesignPreview({ design }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showFigmaExport, setShowFigmaExport] = useState(false);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: EyeIcon },
    { id: 'screens', name: 'Screens', icon: DocumentDuplicateIcon },
    { id: 'components', name: 'Components', icon: SparklesIcon },
    { id: 'export', name: 'Export', icon: ArrowDownTrayIcon }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
        <h2 className="text-2xl font-bold mb-2">
          {design.requirements?.appType || 'Generated Design'}
        </h2>
        <p className="text-blue-100">
          {design.screens?.length || 0} screens • {design.components?.length || 0} components
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'overview' && <OverviewTab design={design} />}
        {activeTab === 'screens' && <ScreensTab screens={design.screens} />}
        {activeTab === 'components' && <ComponentsTab components={design.components} />}
        {activeTab === 'export' && (
          <ExportTab 
            design={design} 
            onFigmaExport={() => setShowFigmaExport(true)} 
          />
        )}
      </div>

      {/* Figma Export Modal */}
      {showFigmaExport && (
        <FigmaExport
          design={design}
          onClose={() => setShowFigmaExport(false)}
        />
      )}
    </motion.div>
  );
}

function OverviewTab({ design }) {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            App Requirements
          </h3>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Type:</span> {design.requirements?.appType}</p>
            <p><span className="font-medium">Target Audience:</span> {design.requirements?.targetAudience}</p>
            <p><span className="font-medium">Complexity:</span> {design.requirements?.estimatedComplexity}</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Design System
          </h3>
          <div className="flex space-x-2 mb-3">
            {Object.entries(design.designSystem?.colors || {}).slice(0, 6).map(([name, color]) => (
              <div
                key={name}
                className="w-8 h-8 rounded-full border-2 border-gray-200"
                style={{ backgroundColor: color }}
                title={name}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600">
            Font: {design.designSystem?.typography?.fontFamily}
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Key Features
        </h3>
        <div className="grid md:grid-cols-2 gap-2">
          {design.requirements?.keyFeatures?.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span>{feature.name || feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScreensTab({ screens }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {screens?.map((screen, index) => (
        <div key={screen.id || index} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
          <div className="aspect-[9/16] bg-gray-100 rounded-lg mb-3 overflow-hidden">
            {screen.mockup?.svg ? (
              <div 
                className="w-full h-full flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: screen.mockup.svg }}
                style={{ transform: 'scale(0.3)', transformOrigin: 'top left' }}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                <div className="w-full h-8 bg-blue-200 rounded mb-2"></div>
                <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
                <div className="w-1/2 h-4 bg-gray-300 rounded mb-4"></div>
                <div className="grid grid-cols-2 gap-2 w-full">
                  <div className="h-12 bg-gray-200 rounded"></div>
                  <div className="h-12 bg-gray-200 rounded"></div>
                </div>
                <span className="text-gray-500 text-xs mt-2">{screen.name}</span>
              </div>
            )}
          </div>
          <h4 className="font-medium text-gray-900 mb-1">{screen.name}</h4>
          <p className="text-sm text-gray-600 mb-2">
            {screen.preview?.description || `${screen.components?.length || 0} components`}
          </p>
          {screen.content?.headings && (
            <div className="text-xs text-blue-600 mb-1">
              "{screen.content.headings[0]}"
            </div>
          )}
          {screen.preview?.keyFeatures && (
            <div className="flex flex-wrap gap-1">
              {screen.preview.keyFeatures.slice(0, 2).map((feature, idx) => (
                <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  {feature}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ComponentsTab({ components }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {components?.map((component, index) => (
        <div key={component.id || index} className="border border-gray-200 rounded-lg p-4">
          <div className="h-20 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
            <span className="text-gray-500 text-sm">{component.name}</span>
          </div>
          <h4 className="font-medium text-gray-900 mb-1">{component.name}</h4>
          <p className="text-sm text-gray-600">
            {component.variants?.length || 0} variants
          </p>
        </div>
      ))}
    </div>
  );
}

function ExportTab({ design, onFigmaExport }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Export Options
        </h3>
        <p className="text-gray-600 mb-6">
          Choose how you'd like to export your generated design
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <button
          onClick={onFigmaExport}
          className="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
        >
          <div className="text-blue-600 mb-2">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.332 8.668a3.333 3.333 0 0 0 0-6.663H8.668a3.333 3.333 0 0 0 0 6.663 3.333 3.333 0 0 0 0 6.665 3.333 3.333 0 0 0 0 6.664A3.334 3.334 0 0 0 12.001 18v-4.667h3.331a3.333 3.333 0 0 0 0-6.665z"/>
            </svg>
          </div>
          <h4 className="font-medium text-gray-900 mb-1">Export to Figma</h4>
          <p className="text-sm text-gray-600">
            Create a new Figma file with all screens and components
          </p>
        </button>

        <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg opacity-50">
          <div className="text-gray-400 mb-2">
            <DocumentDuplicateIcon className="w-8 h-8" />
          </div>
          <h4 className="font-medium text-gray-900 mb-1">Export as JSON</h4>
          <p className="text-sm text-gray-600">
            Download design data as JSON (Coming Soon)
          </p>
        </div>
      </div>
    </div>
  );
}