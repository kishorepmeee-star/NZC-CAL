import React, { useState, useMemo } from 'react';
import CalculatorCard from './CalculatorCard';
import Input from './Input';

const DollarSignIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M12 6h.01M12 21V3" />
  </svg>
);

const ClearIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
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

  const handleClear = () => {
    setCosts({
      baseRate: '',
      surcharge: '',
      additional: '',
    });
  };

  const parsedCosts = useMemo(() => ({
    base: parseFloat(costs.baseRate) || 0,
    sur: parseFloat(costs.surcharge) || 0,
    add: parseFloat(costs.additional) || 0,
  }), [costs]);

  const costBeforeAdditional = useMemo(() => {
    const { base, sur } = parsedCosts;
    if (base <= 0) {
      return 0;
    }
    const surchargeAmount = base * (sur / 100);
    return base + surchargeAmount;
  }, [parsedCosts]);

  const totalCost = useMemo(() => {
    const { base, sur, add } = parsedCosts;
    const subtotal = base + add;
    const surchargeAmount = subtotal * (sur / 100);
    return subtotal + surchargeAmount;
  }, [parsedCosts]);

  return (
    <CalculatorCard title="Rate Calculator" icon={<DollarSignIcon />}>
      <div className="h-6 flex justify-end mb-2">
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear rate fields"
          className="flex items-center text-sm font-medium text-slate-500 hover:text-brandRed transition-colors"
        >
          <ClearIcon />
          <span>Clear</span>
        </button>
      </div>
      <div className="space-y-4">
        <Input
          label="Base Rate"
          id="baseRate"
          value={costs.baseRate}
          onChange={handleInputChange}
          unit="$"
        />
        <Input
          label="Additional Charges"
          id="additional"
          value={costs.additional}
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
      </div>

      <div className="mt-8">
        <div className="bg-gray-100/70 rounded-xl p-6 text-center">
            {parsedCosts.add > 0 ? (
                <>
                    <div className="pb-4">
                        <p className="text-sm font-medium text-slate-600">Cost without additional</p>
                        <p className="text-3xl font-bold text-slate-800 tracking-tight mt-1">
                            <span className="text-xl font-medium align-middle text-slate-500">$</span>
                            {costBeforeAdditional.toFixed(2)}
                        </p>
                    </div>
                    <div className="border-t border-slate-300 pt-4">
                        <p className="text-sm font-medium text-slate-600">Total Cost per Item</p>
                        <p className="text-4xl font-extrabold text-brandRed tracking-tight mt-1">
                            <span className="text-2xl font-medium align-top text-slate-500">$</span>
                            {totalCost.toFixed(2)}
                        </p>
                    </div>
                </>
            ) : (
                <>
                    <p className="text-sm font-medium text-slate-600">Total Cost per Item</p>
                    <p className="text-4xl font-extrabold text-brandRed tracking-tight mt-1">
                      <span className="text-2xl font-medium align-top text-slate-500">$</span>
                      {totalCost.toFixed(2)}
                    </p>
                </>
            )}
        </div>
      </div>
    </CalculatorCard>
  );
};

export default RateCalculator;