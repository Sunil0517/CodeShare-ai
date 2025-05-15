import React from 'react';

interface ExpirationSelectorProps {
  value: number | null;
  onChange: (hours: number | null) => void;
  disabled?: boolean;
}

const ExpirationSelector: React.FC<ExpirationSelectorProps> = ({
  value,
  onChange,
  disabled = false
}) => {
  const options = [
    { value: null, label: 'Never' },
    { value: 1, label: '1 hour' },
    { value: 24, label: '1 day' },
    { value: 168, label: '7 days' },
    { value: 720, label: '30 days' }
  ];

  return (
    <div className="expiration-selector">
      <label htmlFor="expiration-select" className="block text-sm font-medium text-gray-700 mb-1">
        Expires after
      </label>
      <select
        id="expiration-select"
        value={value === null ? 'never' : value}
        onChange={(e) => {
          const val = e.target.value === 'never' ? null : Number(e.target.value);
          onChange(val);
        }}
        disabled={disabled}
        className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        {options.map((option) => (
          <option key={option.label} value={option.value === null ? 'never' : option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ExpirationSelector;