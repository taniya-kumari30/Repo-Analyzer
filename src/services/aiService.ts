import { Repository, LanguageStats, Contributor } from '../types/github';
import { AIInsights } from '../types/github';

// Simulated AI service - In production, this would connect to Gemini API
export async function generateAIInsights(
  repository: Repository,
  languages: LanguageStats,
  contributors: Contributor[],
  readme: string
): Promise<AIInsights> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const languageEntries = Object.entries(languages);
  const totalBytes = languageEntries.reduce((sum, [, bytes]) => sum + bytes, 0);
  const primaryLanguage = languageEntries.sort((a, b) => b[1] - a[1])[0]?.[0] || 'Unknown';
  
  const repositorySummary = generateRepositorySummary(repository, primaryLanguage, readme);
  const languageAnalysis = generateLanguageAnalysis(languages, totalBytes);
  const contributionPatterns = generateContributionAnalysis(contributors, repository);

  return {
    repositorySummary,
    languageAnalysis,
    contributionPatterns
  };
}

function generateRepositorySummary(repo: Repository, primaryLanguage: string, readme: string): string {
  const templates = [
    `${repo.name} is a ${primaryLanguage}-based project that ${repo.description || 'provides essential functionality for developers'}. With ${repo.stargazers_count} stars and ${repo.forks_count} forks, it has gained solid community traction. The repository appears to be actively maintained and offers valuable tools for the developer community.`,
    
    `This ${primaryLanguage} repository serves as ${repo.description || 'a comprehensive solution for modern development needs'}. The project has attracted ${repo.stargazers_count} stars, indicating strong community interest and adoption. Based on its structure and activity, it appears to be a well-architected solution.`,
    
    `${repo.name} represents a robust ${primaryLanguage} implementation focused on ${repo.description || 'delivering high-quality developer tools'}. With its current ${repo.stargazers_count} stars and active development, this repository demonstrates solid engineering practices and community engagement.`
  ];
  
  return templates[Math.floor(Math.random() * templates.length)];
}

function generateLanguageAnalysis(languages: LanguageStats, totalBytes: number): string {
  const languageEntries = Object.entries(languages);
  if (languageEntries.length === 0) return 'No language data available for analysis.';
  
  const sortedLanguages = languageEntries.sort((a, b) => b[1] - a[1]);
  const primaryLang = sortedLanguages[0][0];
  const primaryPercent = Math.round((sortedLanguages[0][1] / totalBytes) * 100);
  
  const analysisTemplates = [
    `The codebase is predominantly ${primaryLang} (${primaryPercent}%), indicating a focused technology stack. ${getStackAnalysis(sortedLanguages, totalBytes)} This composition suggests a well-structured project with clear technological boundaries.`,
    
    `Technology stack analysis reveals ${primaryLang} as the primary language (${primaryPercent}% of codebase). ${getStackAnalysis(sortedLanguages, totalBytes)} The language distribution indicates thoughtful architectural decisions.`,
    
    `The repository demonstrates a ${primaryLang}-centric approach (${primaryPercent}% composition). ${getStackAnalysis(sortedLanguages, totalBytes)} This technology mix suggests modern development practices and appropriate tool selection.`
  ];
  
  return analysisTemplates[Math.floor(Math.random() * analysisTemplates.length)];
}

function getStackAnalysis(sortedLanguages: [string, number][], totalBytes: number): string {
  if (sortedLanguages.length === 1) {
    return 'The single-language approach suggests specialized functionality.';
  }
  
  const secondaryLangs = sortedLanguages.slice(1, 3);
  if (secondaryLangs.length > 0) {
    const secondaryText = secondaryLangs
      .map(([lang, bytes]) => `${lang} (${Math.round((bytes / totalBytes) * 100)}%)`)
      .join(' and ');
    return `Supporting languages include ${secondaryText}.`;
  }
  
  return 'The multi-language architecture enables flexible development.';
}

function generateContributionAnalysis(contributors: Contributor[], repo: Repository): string {
  const totalContributors = contributors.length;
  const topContributor = contributors[0];
  
  if (totalContributors === 0) {
    return 'Limited contribution data available, suggesting this may be a newer or private project.';
  }
  
  const analysisTemplates = [
    `The project shows healthy collaboration with ${totalContributors} active contributors. The top contributor (${topContributor?.login}) has made ${topContributor?.contributions} commits, indicating ${getCollaborationStyle(totalContributors, topContributor?.contributions)}. This pattern suggests sustainable development practices.`,
    
    `Contribution analysis reveals ${totalContributors} developers actively maintaining this repository. With ${topContributor?.contributions} commits from the lead contributor (${topContributor?.login}), the project demonstrates ${getCollaborationStyle(totalContributors, topContributor?.contributions)}. The collaboration pattern indicates strong project health.`,
    
    `The repository benefits from ${totalContributors} contributing developers, with ${topContributor?.login} leading with ${topContributor?.contributions} commits. This ${getCollaborationStyle(totalContributors, topContributor?.contributions)} approach ensures code quality and knowledge distribution across the team.`
  ];
  
  return analysisTemplates[Math.floor(Math.random() * analysisTemplates.length)];
}

function getCollaborationStyle(totalContributors: number, topContributions?: number): string {
  if (totalContributors === 1) return 'a single-maintainer project';
  if (totalContributors <= 3) return 'a small, focused team approach';
  if (totalContributors <= 10) return 'balanced team collaboration';
  return 'an open-source community-driven development model';
}