import React from 'react';
import { Brain, Code, Users, Sparkles } from 'lucide-react';
import { AIInsights } from '../types/github';

interface AIInsightsProps {
  insights: AIInsights;
  loading: boolean;
}

export function AIInsightsComponent({ insights, loading }: AIInsightsProps) {
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 animate-slide-up">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
            <Brain className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">AI Insights</h3>
          <Sparkles className="w-5 h-5 text-purple-500 animate-pulse" />
        </div>
        
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/4 mb-3"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-5/6"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-4/6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const insightSections = [
    {
      title: 'Repository Summary',
      content: insights.repositorySummary,
      icon: Code,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Language Analysis',
      content: insights.languageAnalysis,
      icon: Brain,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Contribution Patterns',
      content: insights.contributionPatterns,
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden animate-slide-up hover:shadow-xl transition-all duration-300">
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-700 dark:to-purple-800 px-6 py-4">
        <div className="flex items-center gap-3">
          <Brain className="w-6 h-6 text-white" />
          <h3 className="text-xl font-bold text-white">AI-Powered Insights</h3>
          <Sparkles className="w-5 h-5 text-purple-200" />
        </div>
      </div>

      <div className="p-6 space-y-6">
        {insightSections.map((section) => {
          const IconComponent = section.icon;
          return (
            <div key={section.title} className="group">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 ${section.bgColor} dark:bg-opacity-20 rounded-lg group-hover:scale-110 transition-transform duration-200`}>
                  <IconComponent className={`w-5 h-5 ${section.color}`} />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{section.title}</h4>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed pl-11">
                {section.content}
              </p>
            </div>
          );
        })}
      </div>

      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-100 dark:border-gray-600">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Insights generated using advanced AI analysis • Results may vary based on available data
        </p>
      </div>
    </div>
  );
}