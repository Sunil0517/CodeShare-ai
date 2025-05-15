import React from 'react';
import { SupportedLanguage } from '../types';
import { getSupportedLanguages } from '../utils/snippetHelpers';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onChange: (language: string) => void;
  disabled?: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onChange,
  disabled = false
}) => {
  const languages: SupportedLanguage[] = getSupportedLanguages();

  return (
    <div className="language-selector">
      <label htmlFor="language-select" className="block text-sm font-medium text-gray-700 mb-1">
        Language
      </label>
      <select
        id="language-select"
        value={selectedLanguage}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        {languages.map((lang) => (
          <option key={lang.id} value={lang.id}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;