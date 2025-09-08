import { useState, useCallback } from 'react';
import { Repository, LanguageStats, CommitActivity, Contributor, AIInsights } from '../types/github';
import { 
  fetchRepository, 
  fetchLanguages, 
  fetchCommitActivity, 
  fetchContributors,
  GitHubApiError 
} from '../services/githubApi';
import { generateAIInsights } from '../services/aiService';

interface UseRepositoryState {
  repository: Repository | null;
  languages: LanguageStats | null;
  commitActivity: CommitActivity[] | null;
  contributors: Contributor[] | null;
  aiInsights: AIInsights | null;
  loading: boolean;
  error: string | null;
}

export function useRepository() {
  const [state, setState] = useState<UseRepositoryState>({
    repository: null,
    languages: null,
    commitActivity: null,
    contributors: null,
    aiInsights: null,
    loading: false,
    error: null
  });

  const analyzeRepository = useCallback(async (owner: string, repo: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Fetch repository data first
      const repositoryData = await fetchRepository(owner, repo);
      
      // Update state with repository data immediately
      setState(prev => ({
        ...prev,
        repository: repositoryData
      }));

      // Fetch other data in parallel with error handling
      const [languagesData, contributorsData, commitActivityData] = await Promise.all([
        fetchLanguages(owner, repo).catch(() => ({})),
        fetchContributors(owner, repo).catch(() => []),
        fetchCommitActivity(owner, repo).catch(() => [])
      ]);

      // Update state with fetched data
      setState(prev => ({
        ...prev,
        languages: languagesData,
        contributors: contributorsData,
        commitActivity: commitActivityData
      }));

      // Generate AI insights
      const aiInsights = await generateAIInsights(
        repositoryData,
        languagesData,
        contributorsData,
        ''
      );

      setState({
        repository: repositoryData,
        languages: languagesData,
        commitActivity: commitActivityData,
        contributors: contributorsData,
        aiInsights,
        loading: false,
        error: null
      });
    } catch (error) {
      const errorMessage = error instanceof GitHubApiError 
        ? error.message 
        : 'An unexpected error occurred';
        
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage
      }));
    }
  }, []);

  const clearData = useCallback(() => {
    setState({
      repository: null,
      languages: null,
      commitActivity: null,
      contributors: null,
      aiInsights: null,
      loading: false,
      error: null
    });
  }, []);

  return {
    ...state,
    analyzeRepository,
    clearData
  };
}