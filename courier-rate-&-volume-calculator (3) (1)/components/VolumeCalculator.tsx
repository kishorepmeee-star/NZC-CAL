import React, { useState, useMemo } from 'react';
import CalculatorCard from './CalculatorCard';
import Input from './Input';
import CubePreview from './CubePreview';

const CubeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const VolumeCalculator: React.FC = () => {
  const [unit, setUnit] = useState<'cm' | 'mm'>('cm');
  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    height: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDimensions(prev => ({ ...prev, [name]: value }));
  };

  const parsedDimensions = useMemo(() => ({
    length: parseFloat(dimensions.length) || 0,
    width: parseFloat(dimensions.width) || 0,
    height: parseFloat(dimensions.height) || 0,
  }), [dimensions]);

  const cubicMeters = useMemo(() => {
    const { length, width, height } = parsedDimensions;

    if (length <= 0 || width <= 0 || height <= 0) {
      return 0;
    }
    
    const divisor = unit === 'cm' ? 1_000_000 : 1_000_000_000;
    return (length * width * height) / divisor;
  }, [parsedDimensions, unit]);

  return (
    <CalculatorCard title="Volume Calculator" icon={<CubeIcon />}>
      <div className="flex justify-end mb-4">
        <div className="inline-flex rounded-lg shadow-sm" role="group">
          <button
            type="button"
            onClick={() => setUnit('cm')}
            aria-pressed={unit === 'cm'}
            className={`px-4 py-2 text-sm font-medium rounded-l-lg border transition-colors duration-150 focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-brandYellow ${
              unit === 'cm'
                ? 'bg-brandYellow text-slate-900 border-brandYellow'
                : 'bg-white text-slate-900 border-slate-300 hover:bg-slate-50'
            }`}
          >
            cm
          </button>
          <button
            type="button"
            onClick={() => setUnit('mm')}
            aria-pressed={unit === 'mm'}
            className={`px-4 py-2 text-sm font-medium rounded-r-lg border-t border-b border-r transition-colors duration-150 focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-brandYellow ${
              unit === 'mm'
                ? 'bg-brandYellow text-slate-900 border-brandYellow'
                : 'bg-white text-slate-900 border-slate-300 hover:bg-slate-50'
            }`}
          >
            mm
          </button>
        </div>
      </div>
      <div className="space-y-4">
        <Input
          label="Length"
          id="length"
          value={dimensions.length}
          onChange={handleInputChange}
          unit={unit}
        />
        <Input
          label="Width"
          id="width"
          value={dimensions.width}
          onChange={handleInputChange}
          unit={unit}
        />
        <Input
          label="Height"
          id="height"
          value={dimensions.height}
          onChange={handleInputChange}
          unit={unit}
        />
      </div>

      <div className="mt-8">
        <div className="bg-gray-100/70 rounded-xl p-6 text-center">
          <p className="text-sm font-medium text-slate-600">Total Volume</p>
          <p className="text-4xl font-extrabold text-brandRed tracking-tight mt-1">
            {cubicMeters.toFixed(4)}{' '}
            <span className="text-2xl font-medium text-slate-500">m³</span>
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-2 text-center">3D Package Preview</h3>
        <div className="w-full">
            <CubePreview 
              length={parsedDimensions.length} 
              width={parsedDimensions.width} 
              height={parsedDimensions.height} 
            />
        </div>
      </div>
    </CalculatorCard>
  );
};

export default VolumeCalculator;