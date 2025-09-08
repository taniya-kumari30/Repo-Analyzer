import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-red-200 dark:border-red-800 overflow-hidden animate-slide-up">
        <div className="bg-red-50 dark:bg-red-900 px-6 py-4 border-b border-red-200 dark:border-red-800">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            <h3 className="text-lg font-semibold text-red-900 dark:text-red-100">Analysis Failed</h3>
          </div>
        </div>
        
        <div className="p-6">
          <p className="text-gray-700 dark:text-gray-300 mb-4">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}