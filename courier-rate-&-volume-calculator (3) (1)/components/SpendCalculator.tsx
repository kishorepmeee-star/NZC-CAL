import React, { useState, useMemo } from 'react';
import CalculatorCard from './CalculatorCard';
import Input from './Input';

const CalendarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);


const SpendCalculator: React.FC = () => {
  const [itemsSent, setItemsSent] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemsSent(e.target.value);
  };

  const annualSpend = useMemo(() => {
    const items = parseFloat(itemsSent) || 0;
    if (items <= 0) {
        return 0;
    }
    // Formula: (items sent * 50 weeks * 7.5)
    return items * 50 * 7.5;
  }, [itemsSent]);

  return (
    <CalculatorCard title="Annual Spend Calculator" icon={<CalendarIcon />}>
      <div className="space-y-4">
         <Input
          label="Items Sent per Week"
          id="itemsSent"
          value={itemsSent}
          onChange={handleInputChange}
          unit="items"
        />
      </div>

      <div className="mt-8">
        <div className="bg-gray-100/70 rounded-xl p-6 text-center">
          <p className="text-sm font-medium text-slate-600">Estimated Annual Spend</p>
          <p className="text-4xl font-extrabold text-brandRed tracking-tight mt-1">
            <span className="text-2xl font-medium align-top text-slate-500">$</span>
            {annualSpend.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      </div>
    </CalculatorCard>
  );
};

export default SpendCalculator;