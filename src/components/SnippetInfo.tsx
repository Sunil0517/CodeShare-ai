import React from 'react';
import { Clock } from 'lucide-react';
import { CodeSnippet } from '../types';
import { formatDate } from '../utils/snippetHelpers';

interface SnippetInfoProps {
  snippet: CodeSnippet;
}

const SnippetInfo: React.FC<SnippetInfoProps> = ({ snippet }) => {
  // Check if snippet is expired
  const isExpired = snippet.expiresAt && new Date() > snippet.expiresAt;
  
  return (
    <div className="snippet-info bg-gray-50 border border-gray-300 rounded-md p-4 mb-4">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">
            ID: <span className="font-mono">{snippet.id}</span>
          </span>
          <span className={`text-sm px-2 py-1 rounded ${
            snippet.isEditable 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {snippet.isEditable ? 'Editable' : 'View Only'}
          </span>
        </div>
        
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Clock size={14} />
          <span>Created: {formatDate(snippet.createdAt)}</span>
        </div>
        
        {snippet.expiresAt && (
          <div className={`text-sm ${
            isExpired 
              ? 'text-red-600' 
              : 'text-yellow-600'
          }`}>
            {isExpired 
              ? `Expired: ${formatDate(snippet.expiresAt)}` 
              : `Expires: ${formatDate(snippet.expiresAt)}`
            }
          </div>
        )}
        
        <div className="text-sm text-gray-600">
          Language: <span className="font-medium">{snippet.language}</span>
        </div>
      </div>
    </div>
  );
};

export default SnippetInfo;