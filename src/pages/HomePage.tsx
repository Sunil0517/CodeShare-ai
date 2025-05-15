import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X } from 'lucide-react';
import Editor from '../components/Editor';
import LanguageSelector from '../components/LanguageSelector';
import ExpirationSelector from '../components/ExpirationSelector';
import { createSnippet } from '../utils/snippetHelpers';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState<string>('');
  const [language, setLanguage] = useState<string>('javascript');
  const [expiration, setExpiration] = useState<number | null>(24); // Default 1 day
  const [isSaving, setIsSaving] = useState<boolean>(false);
  
  const handleSave = () => {
    if (content.trim() === '') {
      alert('Please enter some content before saving');
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Create new snippet
      const snippet = createSnippet(content, language, expiration);
      
      // Navigate to the snippet page
      navigate(`/snippet/${snippet.id}`);
    } catch (error) {
      console.error('Error saving snippet:', error);
      alert('Failed to save your snippet. Please try again.');
      setIsSaving(false);
    }
  };
  
  const handleClear = () => {
    if (content.trim() !== '' && confirm('Are you sure you want to clear the editor?')) {
      setContent('');
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Create New Snippet</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <LanguageSelector 
              selectedLanguage={language} 
              onChange={setLanguage}
            />
            <ExpirationSelector 
              value={expiration} 
              onChange={setExpiration}
            />
          </div>
          
          <div className="mb-6">
            <Editor 
              value={content} 
              onChange={setContent}
              language={language} 
            />
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={handleClear}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
              disabled={isSaving}
            >
              <X size={18} />
              <span>Clear</span>
            </button>
            
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors transform hover:scale-105 duration-200"
              disabled={isSaving}
            >
              {isSaving ? (
                <span className="animate-pulse">Saving...</span>
              ) : (
                <>
                  <Save size={18} />
                  <span>Save & Share</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">About CodeShare</h2>
        <p className="text-gray-700 mb-4">
          CodeShare allows you to easily share code snippets with others. Create a snippet, 
          select the language, set an expiration time, and share the unique URL with anyone.
        </p>
        <p className="text-gray-700">
          Your snippets are stored in your browser and can be accessed from the "Recent" tab.
          Shared snippets can be set to expire after a certain time or kept indefinitely.
        </p>
      </div>
    </div>
  );
};

export default HomePage;