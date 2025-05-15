import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ChevronRight, Code, AlertCircle } from 'lucide-react';
import { getRecentSnippets, getSnippet, formatDate } from '../utils/snippetHelpers';
import { CodeSnippet } from '../types';
import { getSupportedLanguages } from '../utils/snippetHelpers';

const RecentPage: React.FC = () => {
  const [snippets, setSnippets] = useState<CodeSnippet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // Get all recent snippet IDs
    const recentIds = getRecentSnippets();
    
    // Load each snippet
    const loadedSnippets = recentIds
      .map(id => getSnippet(id))
      .filter((snippet): snippet is CodeSnippet => snippet !== null);
    
    setSnippets(loadedSnippets);
    setIsLoading(false);
  }, []);

  // Get language name from ID
  const getLanguageName = (languageId: string): string => {
    const languages = getSupportedLanguages();
    const language = languages.find(lang => lang.id === languageId);
    return language ? language.name : languageId;
  };
  
  // Check if a snippet is expired
  const isExpired = (snippet: CodeSnippet): boolean => {
    return snippet.expiresAt !== null && new Date() > snippet.expiresAt;
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-xl text-gray-600">Loading recent snippets...</div>
      </div>
    );
  }
  
  if (snippets.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="flex justify-center mb-4">
          <AlertCircle size={48} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">No Recent Snippets</h2>
        <p className="text-gray-600 mb-6">You haven't created any snippets yet.</p>
        <Link 
          to="/"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Create Your First Snippet
        </Link>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Recent Snippets</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {snippets.map(snippet => (
            <li 
              key={snippet.id}
              className={`hover:bg-gray-50 transition-colors ${
                isExpired(snippet) ? 'opacity-60' : ''
              }`}
            >
              <Link 
                to={`/snippet/${snippet.id}`}
                className="block p-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Code size={16} className="text-gray-500" />
                      <span className="font-mono text-sm text-gray-600">{snippet.id}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        snippet.isEditable 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {snippet.isEditable ? 'Editable' : 'View Only'}
                      </span>
                    </div>
                    
                    <p className="text-gray-800 font-medium mb-2">
                      {getLanguageName(snippet.language)}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{formatDate(snippet.createdAt)}</span>
                      </div>
                      
                      {snippet.expiresAt && (
                        <div className={`flex items-center gap-1 ${
                          isExpired(snippet) ? 'text-red-500' : 'text-yellow-600'
                        }`}>
                          <Clock size={12} />
                          <span>
                            {isExpired(snippet) 
                              ? 'Expired' 
                              : `Expires: ${formatDate(snippet.expiresAt)}`
                            }
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <ChevronRight size={20} className="text-gray-400" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecentPage;