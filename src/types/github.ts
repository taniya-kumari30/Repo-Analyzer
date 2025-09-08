export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  license: {
    name: string;
  } | null;
  html_url: string;
  created_at: string;
  updated_at: string;
  language: string;
  languages_url: string;
}

export interface LanguageStats {
  [language: string]: number;
}

export interface CommitActivity {
  total: number;
  week: number;
  days: number[];
}

export interface Contributor {
  login: string;
  contributions: number;
  avatar_url: string;
}

export interface AIInsights {
  repositorySummary: string;
  languageAnalysis: string;
  contributionPatterns: string;
}
