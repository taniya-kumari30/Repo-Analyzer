import React from 'react';
import { Github } from 'lucide-react';

export function LoadingAnimation() {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 animate-fade-in">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Github className="w-12 h-12 text-blue-600 animate-pulse" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Analyzing Repository
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Fetching data and generating AI insights...
          </p>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}