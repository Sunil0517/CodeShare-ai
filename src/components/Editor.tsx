import React, { useState, useEffect } from 'react';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  readOnly?: boolean;
}

const Editor: React.FC<EditorProps> = ({ 
  value, 
  onChange, 
  language, 
  readOnly = false 
}) => {
  const [lineNumbers, setLineNumbers] = useState<string[]>([]);

  // Generate line numbers for the editor
  useEffect(() => {
    const lines = value.split('\n');
    const numbers = Array.from({ length: lines.length }, (_, i) => String(i + 1));
    setLineNumbers(numbers);
  }, [value]);

  // Handle text changes
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  // Handle tab key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab' && !readOnly) {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      
      // Insert tab character
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      
      // Update value state through parent
      onChange(newValue);
      
      // Move cursor position after the inserted tab
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
  };

  return (
    <div className="editor-container border border-gray-300 rounded-md overflow-hidden shadow-sm">
      <div className="editor-header bg-gray-100 border-b border-gray-300 py-2 px-4">
        <span className="text-xs font-mono uppercase tracking-wider text-gray-600">
          {language}
        </span>
      </div>
      
      <div className="editor-content flex">
        {/* Line numbers */}
        <div className="line-numbers bg-gray-100 py-2 px-2 text-right select-none">
          {lineNumbers.map((num, index) => (
            <div key={index} className="text-gray-500 text-xs font-mono">
              {num}
            </div>
          ))}
        </div>
        
        {/* Editor textarea */}
        <textarea
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="flex-grow py-2 px-4 font-mono text-sm outline-none resize-none min-h-[300px]"
          readOnly={readOnly}
          spellCheck={false}
          placeholder={readOnly ? "This snippet is view-only" : "Enter your code or text here..."}
        />
      </div>
    </div>
  );
};

export default Editor;