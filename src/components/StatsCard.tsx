import React from 'react';
import { Star, GitFork, AlertCircle, Scale, ExternalLink } from 'lucide-react';
import { Repository } from '../types/github';

interface StatsCardProps {
  repository: Repository;
}

export function StatsCard({ repository }: StatsCardProps) {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  const stats = [
    {
      label: 'Stars',
      value: formatNumber(repository.stargazers_count),
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      label: 'Forks',
      value: formatNumber(repository.forks_count),
      icon: GitFork,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Issues',
      value: formatNumber(repository.open_issues_count),
      icon: AlertCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      label: 'License',
      value: repository.license?.name || 'None',
      icon: Scale,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden animate-slide-up hover:shadow-xl transition-all duration-300">
      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{repository.name}</h2>
          <a
            href={repository.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-all duration-200 hover:scale-105"
          >
            View on GitHub
            <ExternalLink size={16} />
          </a>
        </div>
        {repository.description && (
          <p className="text-gray-600 dark:text-gray-300 mt-2">{repository.description}</p>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <div key={stat.label} className="text-center group cursor-pointer">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${stat.bgColor} dark:bg-opacity-20 mb-3 group-hover:scale-110 transition-transform duration-200`}>
                <IconComponent className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1 group-hover:animate-bounce-subtle">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}