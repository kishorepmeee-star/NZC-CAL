import React from 'react';

interface CalculatorCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const CalculatorCard: React.FC<CalculatorCardProps> = ({ title, icon, children }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="flex items-center mb-6">
        <div className="flex items-center justify-center h-12 w-12 rounded-xl mr-4 bg-brandYellow text-slate-900 shadow-lg">
          {icon}
        </div>
        <h2 className="text-3xl font-semibold text-brandRed font-heading uppercase tracking-wide">{title}</h2>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default CalculatorCard;