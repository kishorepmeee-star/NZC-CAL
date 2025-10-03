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

  return (
    <CalculatorCard title="Rate Calculator" icon={<DollarSignIcon />}>
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
      </div>

      <div className="mt-8">
        <div className="bg-gray-100/70 rounded-xl p-6 text-center">
            <p className="text-sm font-medium text-slate-600">Total Cost per Item</p>
            <p className="text-4xl font-extrabold text-brandRed tracking-tight mt-1">
              <span className="text-2xl font-medium align-top text-slate-500">$</span>
              {totalCost.toFixed(2)}
            </p>
        </div>
      </div>
    </CalculatorCard>
  );
};

export default RateCalculator;