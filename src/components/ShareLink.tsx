import React, { useState } from 'react';
import { Copy, CheckCircle } from 'lucide-react';

interface ShareLinkProps {
  snippetId: string;
}

const ShareLink: React.FC<ShareLinkProps> = ({ snippetId }) => {
  const [copied, setCopied] = useState(false);
  
  const shareUrl = `${window.location.origin}/snippet/${snippetId}`;
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      
      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy URL to clipboard', error);
    }
  };
  
  return (
    <div className="share-link-container">
      <div className="text-sm font-medium text-gray-700 mb-1">Share this snippet</div>
      <div className="flex">
        <input
          type="text"
          value={shareUrl}
          readOnly
          className="flex-grow rounded-l-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
        />
        <button
          onClick={copyToClipboard}
          className={`flex items-center justify-center px-3 rounded-r-md ${
            copied 
              ? 'bg-green-500 text-white' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          } transition-colors`}
          aria-label="Copy to clipboard"
        >
          {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
        </button>
      </div>
      {copied && (
        <div className="text-sm text-green-600 mt-1 animate-fade-in">
          Copied to clipboard!
        </div>
      )}
    </div>
  );
};

export default ShareLink;