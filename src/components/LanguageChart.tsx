import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { LanguageStats } from '../types/github';

ChartJS.register(ArcElement, Tooltip, Legend);

interface LanguageChartProps {
  languages: LanguageStats;
}

export function LanguageChart({ languages }: LanguageChartProps) {
  const languageEntries = Object.entries(languages);
  
  if (languageEntries.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 animate-slide-up">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Language Composition</h3>
        <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
          No language data available
        </div>
      </div>
    );
  }

  const totalBytes = languageEntries.reduce((sum, [, bytes]) => sum + bytes, 0);
  const sortedLanguages = languageEntries
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8); // Limit to top 8 languages for clarity

  const colors = [
    '#3B82F6', '#14B8A6', '#F59E0B', '#EF4444',
    '#8B5CF6', '#06B6D4', '#F97316', '#84CC16'
  ];

  const data = {
    labels: sortedLanguages.map(([language]) => language),
    datasets: [
      {
        data: sortedLanguages.map(([, bytes]) => ((bytes / totalBytes) * 100).toFixed(1)),
        backgroundColor: colors.slice(0, sortedLanguages.length),
        borderWidth: 2,
        borderColor: '#ffffff',
        hoverBorderWidth: 3,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1000,
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12
          },
          color: 'rgb(107, 114, 128)',
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#3B82F6',
        borderWidth: 1,
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed;
            return `${label}: ${value}%`;
          }
        },
        displayColors: true,
      }
    },
    cutout: '70%',
    elements: {
      arc: {
        borderRadius: 8,
        hoverBorderWidth: 3,
        hoverOffset: 8,
      }
    },
    onHover: (event, elements) => {
      const canvas = event.native?.target as HTMLCanvasElement;
      if (canvas) {
        canvas.style.cursor = elements.length > 0 ? 'pointer' : 'default';
      }
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 animate-slide-up hover:shadow-xl transition-all duration-300">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Language Composition</h3>
      <div className="relative h-64">
        <Doughnut data={data} options={options} />
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Total: {Math.round(totalBytes / 1024)} KB across {sortedLanguages.length} languages
        </p>
      </div>
    </div>
  );
}