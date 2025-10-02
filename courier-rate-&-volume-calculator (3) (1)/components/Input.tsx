import React from 'react';

interface InputProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  unit?: string;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ label, id, value, onChange, unit, placeholder }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder || '0'}
          className="w-full pl-4 pr-14 py-3 bg-slate-50 border-2 border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-brandYellow focus:border-brandYellow transition-colors appearance-none"
          min="0"
          step="0.01"
        />
        {unit && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <span className="text-slate-500 sm:text-sm">{unit}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;