import React, { useState, useMemo } from 'react';
import CalculatorCard from './CalculatorCard';
import Input from './Input';

const CalendarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ClearIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


const SpendCalculator: React.FC = () => {
  const [spendInputs, setSpendInputs] = useState({
    itemsSent: '',
    avgTicketSize: '7.5',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSpendInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setSpendInputs({
      itemsSent: '',
      avgTicketSize: '7.5',
    });
  };

  const annualSpend = useMemo(() => {
    const items = parseFloat(spendInputs.itemsSent) || 0;
    const ticketSize = parseFloat(spendInputs.avgTicketSize);

    if (items <= 0) {
      return 0;
    }

    // Use ticketSize if it's a valid number, otherwise default to 7.5
    const finalTicketSize = !isNaN(ticketSize) ? ticketSize : 7.5;

    return items * 50 * finalTicketSize;
  }, [spendInputs]);

  return (
    <CalculatorCard 
      title="Annual Spend Calculator" 
      icon={<CalendarIcon />}
    >
      <div className="h-6 flex justify-end mb-2">
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear spend calculator fields"
          className="flex items-center text-sm font-medium text-slate-500 hover:text-brandRed transition-colors"
        >
          <ClearIcon />
          <span>Clear</span>
        </button>
      </div>
      <div className="space-y-4">
         <Input
          label="Items Sent per Week"
          id="itemsSent"
          value={spendInputs.itemsSent}
          onChange={handleInputChange}
          unit="items"
        />
        <Input
          label="Avg. Ticket Size"
          id="avgTicketSize"
          value={spendInputs.avgTicketSize}
          onChange={handleInputChange}
          unit="$"
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