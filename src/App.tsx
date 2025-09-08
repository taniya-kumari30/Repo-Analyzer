import React, { useEffect } from 'react';
import { RepositoryInput } from './components/RepositoryInput';
import { Dashboard } from './components/Dashboard';
import { ErrorMessage } from './components/ErrorMessage';
import { LoadingAnimation } from './components/LoadingAnimation';
import { useRepository } from './hooks/useRepository';
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  const {
    repository,
    languages,
    commitActivity,
    contributors,
    aiInsights,
    loading,
    error,
    analyzeRepository,
    clearData
  } = useRepository();

  // Register service worker for PWA functionality
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }, []);

  const handleAnalyze = (owner: string, repo: string) => {
    analyzeRepository(owner, repo);
  };

  const handleRetry = () => {
    clearData();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <ThemeToggle />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          {!repository && (
            <div className="mb-8 animate-fade-in">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                GitHub Repository Analyzer
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Discover deep insights about any public GitHub repository with the power of AI. 
                Get comprehensive analytics, visualizations, and intelligent analysis.
              </p>
            </div>
          )}
        </div>

        {/* Main Content */}
        {error ? (
          <ErrorMessage message={error} onRetry={handleRetry} />
        ) : loading ? (
          <LoadingAnimation />
        ) : repository ? (
          <div className="space-y-8 animate-slide-up">
            {/* Back to search */}
            <div className="flex justify-center">
              <button
                onClick={clearData}
                disabled={loading}
                className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium py-2 px-4 rounded-lg border border-gray-300 dark:border-gray-600 transition-all duration-200 disabled:opacity-50 hover:shadow-md"
              >
                Analyze Another Repository
              </button>
            </div>
            
            <Dashboard
              repository={repository}
              languages={languages || {}}
              commitActivity={commitActivity || []}
              contributors={contributors || []}
              aiInsights={aiInsights}
              aiLoading={loading}
            />
          </div>
        ) : (
          <RepositoryInput onAnalyze={handleAnalyze} loading={loading} />
        )}

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
          
        </footer>
      </div>
    </div>
  );
}

export default App;