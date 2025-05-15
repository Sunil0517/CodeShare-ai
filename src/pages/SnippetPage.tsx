import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Trash } from 'lucide-react';
import Editor from '../components/Editor';
import SnippetInfo from '../components/SnippetInfo';
import ShareLink from '../components/ShareLink';
import { getSnippet, saveSnippet, deleteSnippet } from '../utils/snippetHelpers';
import { CodeSnippet } from '../types';

const SnippetPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [snippet, setSnippet] = useState<CodeSnippet | null>(null);
  const [content, setContent] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!id) {
      setError('Invalid snippet ID');
      setIsLoading(false);
      return;
    }
    
    // Load snippet
    const loadedSnippet = getSnippet(id);
    
    if (!loadedSnippet) {
      setError('Snippet not found');
      setIsLoading(false);
      return;
    }
    
    // Check if snippet is expired
    if (loadedSnippet.expiresAt && new Date() > loadedSnippet.expiresAt) {
      setError('This snippet has expired');
      setIsLoading(false);
      return;
    }
    
    setSnippet(loadedSnippet);
    setContent(loadedSnippet.content);
    setIsLoading(false);
  }, [id]);
  
  const handleEdit = () => {
    if (snippet && snippet.isEditable) {
      setIsEditing(true);
    }
  };
  
  const handleSave = () => {
    if (!snippet) return;
    
    setIsSaving(true);
    
    try {
      // Update the snippet with new content
      const updatedSnippet: CodeSnippet = {
        ...snippet,
        content,
      };
      
      saveSnippet(updatedSnippet);
      setSnippet(updatedSnippet);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving snippet:', error);
      alert('Failed to save your changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleDelete = () => {
    if (!snippet) return;
    
    if (confirm('Are you sure you want to delete this snippet? This action cannot be undone.')) {
      deleteSnippet(snippet.id);
      navigate('/');
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-xl text-gray-600">Loading snippet...</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="text-red-600 text-xl mb-4">{error}</div>
        <p className="mb-6 text-gray-600">The snippet you're looking for might be expired or doesn't exist.</p>
        <button 
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Create New Snippet
        </button>
      </div>
    );
  }
  
  if (!snippet) return null;
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </button>
        
        {snippet.isEditable && (
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
          >
            <Trash size={18} />
            <span>Delete</span>
          </button>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <SnippetInfo snippet={snippet} />
          
          <div className="mb-6">
            <Editor 
              value={content} 
              onChange={setContent}
              language={snippet.language} 
              readOnly={!isEditing}
            />
          </div>
          
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <ShareLink snippetId={snippet.id} />
            
            {snippet.isEditable && (
              <div className="flex justify-end">
                {isEditing ? (
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <span className="animate-pulse">Saving...</span>
                    ) : (
                      <>
                        <Save size={18} />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                  >
                    <span>Edit</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnippetPage;