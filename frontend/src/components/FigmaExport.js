import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon, ExternalLinkIcon } from '@heroicons/react/24/outline';
import { useDesignStore } from '../store/designStore';
import toast from 'react-hot-toast';

export default function FigmaExport({ design, onClose }) {
  const [figmaToken, setFigmaToken] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [exportResult, setExportResult] = useState(null);
  
  const { exportToFigma } = useDesignStore();

  const handleExport = async () => {
    if (!figmaToken.trim()) {
      toast.error('Please enter your Figma access token');
      return;
    }

    setIsExporting(true);
    try {
      const figmaUrl = await exportToFigma(figmaToken);
      setExportResult(figmaUrl);
      toast.success('Successfully exported to Figma!');
    } catch (error) {
      toast.error(error.message || 'Failed to export to Figma');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Export to Figma
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {!exportResult ? (
          <>
            {/* Instructions */}
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                To export your design to Figma, you'll need a personal access token.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">
                  How to get your Figma token:
                </h4>
                <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                  <li>Go to Figma → Settings → Account</li>
                  <li>Scroll to "Personal access tokens"</li>
                  <li>Click "Create new token"</li>
                  <li>Copy and paste it below</li>
                </ol>
              </div>
            </div>

            {/* Token Input */}
            <div className="mb-6">
              <label htmlFor="figmaToken" className="block text-sm font-medium text-gray-700 mb-2">
                Figma Access Token
              </label>
              <input
                id="figmaToken"
                type="password"
                value={figmaToken}
                onChange={(e) => setFigmaToken(e.target.value)}
                placeholder="figd_..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isExporting}
              />
              <p className="text-xs text-gray-500 mt-1">
                Your token is only used for this export and is not stored.
              </p>
            </div>

            {/* Export Button */}
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                disabled={isExporting}
              >
                Cancel
              </button>
              <button
                onClick={handleExport}
                disabled={isExporting || !figmaToken.trim()}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
              >
                {isExporting ? 'Exporting...' : 'Export to Figma'}
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Success State */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Export Successful!
              </h4>
              <p className="text-gray-600 mb-4">
                Your design has been exported to Figma. You can now view and edit it in Figma.
              </p>
            </div>

            {/* Figma Link */}
            <div className="mb-6">
              <a
                href={exportResult}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors"
              >
                <span>Open in Figma</span>
                <ExternalLinkIcon className="w-4 h-4" />
              </a>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Close
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}