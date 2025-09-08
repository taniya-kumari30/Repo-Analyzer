import React from 'react';
import { Repository, LanguageStats, CommitActivity, AIInsights, Contributor } from '../types/github';
import { StatsCard } from './StatsCard';
import { LanguageChart } from './LanguageChart';
import { CommitChart } from './CommitChart';
import { AIInsightsComponent } from './AIInsights';

interface DashboardProps {
  repository: Repository;
  languages: LanguageStats;
  commitActivity: CommitActivity[];
  contributors: Contributor[];
  aiInsights: AIInsights | null;
  aiLoading: boolean;
}

export function Dashboard({ 
  repository, 
  languages, 
  commitActivity, 
  contributors,
  aiInsights,
  aiLoading 
}: DashboardProps) {
  const hasCommitData = commitActivity && commitActivity.length > 0;
  
  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      <StatsCard repository={repository} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <LanguageChart languages={languages} />
        {hasCommitData ? (
          <CommitChart commitActivity={commitActivity} />
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 animate-slide-up">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Commit Activity</h3>
            <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-sm">Fetching commit statistics...</p>
                <p className="text-xs mt-2 opacity-75">This may take a moment for large repositories</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <AIInsightsComponent insights={aiInsights!} loading={aiLoading || !aiInsights} />
    </div>
  );
}