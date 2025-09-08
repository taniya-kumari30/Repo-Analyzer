import { Repository, LanguageStats, CommitActivity, Contributor } from '../types/github';

const GITHUB_API_BASE = 'https://api.github.com';

export class GitHubApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'GitHubApiError';
  }
}

export async function fetchRepository(owner: string, repo: string): Promise<Repository> {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new GitHubApiError('Repository not found', 404);
      }
      throw new GitHubApiError(`Failed to fetch repository: ${response.statusText}`, response.status);
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof GitHubApiError) throw error;
    throw new GitHubApiError('Network error occurred while fetching repository');
  }
}

export async function fetchLanguages(owner: string, repo: string): Promise<LanguageStats> {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/languages`);
    
    if (!response.ok) {
      throw new GitHubApiError(`Failed to fetch languages: ${response.statusText}`, response.status);
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof GitHubApiError) throw error;
    throw new GitHubApiError('Network error occurred while fetching languages');
  }
}

export async function fetchCommitActivity(owner: string, repo: string): Promise<CommitActivity[]> {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/stats/commit_activity`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
    
    if (!response.ok) {
      if (response.status === 202) {
        // GitHub is still computing stats, try once more after a short delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        const retryResponse = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/stats/commit_activity`, {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'X-GitHub-Api-Version': '2022-11-28'
          }
        });
        
        if (retryResponse.ok) {
          const retryData = await retryResponse.json();
          return Array.isArray(retryData) ? retryData : [];
        }
        
        // If still computing, return empty array
        return [];
      }
      throw new GitHubApiError(`Failed to fetch commit activity: ${response.statusText}`, response.status);
    }
    
    const data = await response.json();
    
    // Handle different response types from GitHub API
    if (data === null || data === undefined) {
      return [];
    }
    
    if (Array.isArray(data)) {
      return data;
    }
    
    // If it's an object or other type, return empty array
    return [];
  } catch (error) {
    if (error instanceof GitHubApiError) throw error;
    console.warn('Failed to fetch commit activity:', error);
    return []; // Return empty array instead of throwing error
  }
}

export async function fetchContributors(owner: string, repo: string): Promise<Contributor[]> {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/contributors?per_page=10`);
    
    if (!response.ok) {
      throw new GitHubApiError(`Failed to fetch contributors: ${response.statusText}`, response.status);
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof GitHubApiError) throw error;
    throw new GitHubApiError('Network error occurred while fetching contributors');
  }
}
