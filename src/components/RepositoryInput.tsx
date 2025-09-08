import React, { useState } from 'react';
import { Search, Github } from 'lucide-react';

interface RepositoryInputProps {
  onAnalyze: (owner: string, repo: string) => void;
  loading: boolean;
}

export function RepositoryInput({ onAnalyze, loading }: RepositoryInputProps) {
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (owner.trim() && repo.trim() && !loading) {
      onAnalyze(owner.trim(), repo.trim());
    }
  };

  const handleExampleClick = (exampleOwner: string, exampleRepo: string) => {
    setOwner(exampleOwner);
    setRepo(exampleRepo);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden animate-fade-in hover:shadow-xl transition-all duration-300">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 px-8 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Github className="text-white" size={32} />
            <h1 className="text-2xl font-bold text-white">GitHub Repository Analyzer</h1>
          </div>
          <p className="text-blue-100">AI-powered insights for any public GitHub repository</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="owner" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Repository Owner
              </label>
              <input
                type="text"
                id="owner"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                placeholder="e.g., microsoft"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="repo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Repository Name
              </label>
              <input
                type="text"
                id="repo"
                value={repo}
                onChange={(e) => setRepo(e.target.value)}
                placeholder="e.g., vscode"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                disabled={loading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!owner.trim() || !repo.trim() || loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Analyzing Repository...
              </>
            ) : (
              <>
                <Search size={20} />
                Analyze Repository
              </>
            )}
          </button>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Try these popular examples:</p>
            <div className="flex flex-wrap gap-2">
              {[
                { owner: 'microsoft', repo: 'vscode' },
                { owner: 'facebook', repo: 'react' },
                { owner: 'vercel', repo: 'next.js' },
                { owner: 'tensorflow', repo: 'tensorflow' }
              ].map((example) => (
                <button
                  key={`${example.owner}/${example.repo}`}
                  type="button"
                  onClick={() => handleExampleClick(example.owner, example.repo)}
                  disabled={loading}
                  className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:bg-gray-50 dark:disabled:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-lg transition-all duration-200 hover:scale-105"
                >
                  {example.owner}/{example.repo}
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}