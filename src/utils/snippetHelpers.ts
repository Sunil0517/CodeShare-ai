import { nanoid } from 'nanoid';
import { CodeSnippet, SupportedLanguage } from '../types';

// Generate unique ID for snippets
export const generateSnippetId = (): string => {
  return nanoid(8);
};

// Save snippet to localStorage
export const saveSnippet = (snippet: CodeSnippet): void => {
  try {
    // Save the current snippet
    localStorage.setItem(`snippet:${snippet.id}`, JSON.stringify(snippet));
    
    // Update recent snippets list
    const recentSnippets = getRecentSnippets();
    const updatedRecent = [snippet.id, ...recentSnippets.filter(id => id !== snippet.id)].slice(0, 10);
    localStorage.setItem('recentSnippets', JSON.stringify(updatedRecent));
  } catch (error) {
    console.error('Error saving snippet:', error);
  }
};

// Get snippet from localStorage
export const getSnippet = (id: string): CodeSnippet | null => {
  try {
    const snippetData = localStorage.getItem(`snippet:${id}`);
    if (snippetData) {
      const snippet = JSON.parse(snippetData) as CodeSnippet;
      // Convert string dates back to Date objects
      snippet.createdAt = new Date(snippet.createdAt);
      snippet.expiresAt = snippet.expiresAt ? new Date(snippet.expiresAt) : null;
      return snippet;
    }
  } catch (error) {
    console.error('Error retrieving snippet:', error);
  }
  return null;
};

// Get list of recent snippets
export const getRecentSnippets = (): string[] => {
  try {
    const recentSnippets = localStorage.getItem('recentSnippets');
    return recentSnippets ? JSON.parse(recentSnippets) : [];
  } catch (error) {
    console.error('Error retrieving recent snippets:', error);
    return [];
  }
};

// Create a new snippet
export const createSnippet = (
  content: string = '',
  language: string = 'plaintext',
  expirationHours: number | null = null
): CodeSnippet => {
  const id = generateSnippetId();
  const createdAt = new Date();
  
  // Calculate expiration date if provided
  const expiresAt = expirationHours 
    ? new Date(createdAt.getTime() + expirationHours * 60 * 60 * 1000) 
    : null;
  
  const snippet: CodeSnippet = {
    id,
    content,
    language,
    createdAt,
    expiresAt,
    isEditable: true,
  };
  
  // Save to localStorage
  saveSnippet(snippet);
  
  return snippet;
};

// Delete a snippet
export const deleteSnippet = (id: string): void => {
  try {
    localStorage.removeItem(`snippet:${id}`);
    
    // Update recent snippets list
    const recentSnippets = getRecentSnippets();
    const updatedRecent = recentSnippets.filter(snippetId => snippetId !== id);
    localStorage.setItem('recentSnippets', JSON.stringify(updatedRecent));
  } catch (error) {
    console.error('Error deleting snippet:', error);
  }
};

// Get supported languages
export const getSupportedLanguages = (): SupportedLanguage[] => {
  return [
    { id: 'plaintext', name: 'Plain Text', extension: 'txt' },
    { id: 'javascript', name: 'JavaScript', extension: 'js' },
    { id: 'typescript', name: 'TypeScript', extension: 'ts' },
    { id: 'html', name: 'HTML', extension: 'html' },
    { id: 'css', name: 'CSS', extension: 'css' },
    { id: 'json', name: 'JSON', extension: 'json' },
    { id: 'python', name: 'Python', extension: 'py' },
    { id: 'java', name: 'Java', extension: 'java' },
    { id: 'csharp', name: 'C#', extension: 'cs' },
    { id: 'cpp', name: 'C++', extension: 'cpp' },
  ];
};

// Format date to a readable string
export const formatDate = (date: Date): string => {
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};