import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions
} from 'chart.js';
import { CommitActivity } from '../types/github';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface CommitChartProps {
  commitActivity: CommitActivity[];
}

export function CommitChart({ commitActivity }: CommitChartProps) {
  // Ensure commitActivity is always an array
  const safeCommitActivity = Array.isArray(commitActivity) ? commitActivity : [];
  
  if (safeCommitActivity.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 animate-slide-up">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Commit Activity</h3>
        <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-32 mx-auto mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-48 mx-auto mb-1"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-40 mx-auto"></div>
            </div>
            <p className="mt-4 text-sm">Loading commit data...</p>
          </div>
        </div>
      </div>
    );
  }

  const weeks = safeCommitActivity.slice(-26); // Last 26 weeks (6 months)
  const labels = weeks.map((week) => {
    const date = new Date(week.week * 1000);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Commits per Week',
        data: weeks.map(week => week.total),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#3B82F6',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#3B82F6',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context) => `${context.parsed.y} commits`,
          title: (context) => `Week of ${context[0].label}`
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        border: {
          display: false
        },
        ticks: {
          color: 'rgb(107, 114, 128)',
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(107, 114, 128, 0.2)'
        },
        border: {
          display: false
        },
        ticks: {
          stepSize: 1,
          color: 'rgb(107, 114, 128)',
        }
      }
    },
    elements: {
      point: {
        hoverBackgroundColor: '#3B82F6',
        hoverRadius: 8,
      },
      line: {
        tension: 0.4,
      }
    },
    onHover: (event, elements) => {
      const canvas = event.native?.target as HTMLCanvasElement;
      if (canvas) {
        canvas.style.cursor = elements.length > 0 ? 'pointer' : 'default';
      }
    },
  };

  const totalCommits = weeks.reduce((sum, week) => sum + week.total, 0);
  const averageCommits = Math.round(totalCommits / weeks.length);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 animate-slide-up hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Commit Activity</h3>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {totalCommits} total commits • {averageCommits}/week avg
        </div>
      </div>
      <div className="relative h-64">
        <Line data={data} options={options} />
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
        Last 26 weeks of commit activity
      </p>
    </div>
  );
}