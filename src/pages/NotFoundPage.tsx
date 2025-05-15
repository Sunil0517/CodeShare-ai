import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-md mx-auto text-center py-12">
      <div className="flex justify-center mb-6">
        <FileQuestion size={80} className="text-gray-400" />
      </div>
      
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Page Not Found</h1>
      
      <p className="text-gray-600 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Create New Snippet
        </Link>
        
        <Link
          to="/recent"
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
        >
          View Recent Snippets
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;