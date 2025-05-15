import React from 'react';
import { Heart, Globe, Shield, Clock, Share2, Code, List } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">About CodeShare</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">What is CodeShare?</h2>
        <p className="text-gray-700 mb-4">
          CodeShare is a simple, fast, and elegant way to share code snippets with others.
          Whether you need to share a quick code example with a colleague, save a useful 
          snippet for later, or collaborate on a piece of code, CodeShare makes it easy.
        </p>
        <p className="text-gray-700">
          Your snippets are stored locally in your browser, making them easy to access 
          while maintaining privacy. No account required — just create and share!
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <List size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Multiple Languages</h3>
          </div>
          <p className="text-gray-700">
            Support for various programming languages and plain text, with appropriate syntax highlighting.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Share2 size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Easy Sharing</h3>
          </div>
          <p className="text-gray-700">
            Generate unique URLs for each snippet that you can easily share with anyone.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Clock size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Expiration Control</h3>
          </div>
          <p className="text-gray-700">
            Set custom expiration times for your snippets, or keep them forever.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Code size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Editable Snippets</h3>
          </div>
          <p className="text-gray-700">
            Create snippets that can be edited later, making it easy to collaborate on code.
          </p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">How it Works</h2>
        <ol className="list-decimal ml-6 space-y-3 text-gray-700">
          <li>
            <strong>Create a snippet</strong> - Enter your code or text in the editor on the homepage.
          </li>
          <li>
            <strong>Choose a language</strong> - Select the appropriate language for syntax highlighting.
          </li>
          <li>
            <strong>Set expiration</strong> - Choose how long your snippet should be available.
          </li>
          <li>
            <strong>Save and share</strong> - Get a unique URL that you can share with anyone.
          </li>
          <li>
            <strong>Access later</strong> - View and manage your snippets from the "Recent" page.
          </li>
        </ol>
      </div>
      
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-md p-8 text-center text-white">
        <div className="flex justify-center mb-4">
          <Heart size={32} className="text-white animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Made with Love</h2>
        <p className="max-w-lg mx-auto">
          CodeShare is built with modern web technologies to provide the best
          experience for developers and users alike.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;