import React, { useState, useMemo } from 'react';
import CalculatorCard from './CalculatorCard';
import Input from './Input';

const DollarSignIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M12 6h.01M12 21V3" />
  </svg>
);


const RateCalculator: React.FC = () => {
  const [costs, setCosts] = useState({
    baseRate: '',
    surcharge: '',
    additional: '',
    itemsSent: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCosts(prev => ({ ...prev, [name]: value }));
  };

  const totalCost = useMemo(() => {
    const base = parseFloat(costs.baseRate) || 0;
    const sur = parseFloat(costs.surcharge) || 0;
    const add = parseFloat(costs.additional) || 0;

    if (base <= 0) {
      return 0;
    }

    const surchargeAmount = base * (sur / 100);
    return base + surchargeAmount + add;
  }, [costs]);

  const annualSpend = useMemo(() => {
    const items = parseFloat(costs.itemsSent) || 0;
    if (items <= 0) {
        return 0;
    }
    // Formula: (items sent * 50 weeks * 7.5)
    return items * 50 * 7.5;
  }, [costs.itemsSent]);

  return (
    <CalculatorCard title="Rate & Spend Calculator" icon={<DollarSignIcon />}>
      <div className="space-y-4">
        <Input
          label="Base Rate"
          id="baseRate"
          value={costs.baseRate}
          onChange={handleInputChange}
          unit="$"
        />
        <Input
          label="Surcharge"
          id="surcharge"
          value={costs.surcharge}
          onChange={handleInputChange}
          unit="%"
        />
        <Input
          label="Additional Charges"
          id="additional"
          value={costs.additional}
          onChange={handleInputChange}
          unit="$"
        />
         <Input
          label="Items Sent per Week"
          id="itemsSent"
          value={costs.itemsSent}
          onChange={handleInputChange}
          unit="items"
        />
      </div>

      <div className="mt-8 pt-6 border-t border-slate-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-slate-600">Total Cost per Item</p>
            <p className="text-4xl font-extrabold text-brandRed tracking-tight">
              <span className="text-2xl font-medium align-top text-slate-500">$</span>
              {totalCost.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-600">Estimated Annual Spend</p>
            <p className="text-4xl font-extrabold text-slate-800 tracking-tight">
              <span className="text-2xl font-medium align-top text-slate-500">$</span>
              {annualSpend.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>
    </CalculatorCard>
  );
};

export default RateCalculator;