import React, { useMemo } from 'react';

const satchels = [
  { name: 'E20', size: 'A5', length: 260, width: 190, price: 12.00 },
  { name: 'E25b', size: 'A5+', length: 280, width: 210, price: 13.50 },
  { name: 'E40', size: 'A4', length: 325, width: 235, price: 14.00 },
  { name: 'DP', size: 'A4+', length: 379, width: 260, price: 13.50 },
  { name: 'E50', size: 'Foolscap', length: 390, width: 280, price: 17.50 },
  { name: 'E60', size: 'A3', length: 415, width: 360, price: 19.00 },
  { name: 'PP', size: 'A3+', length: 440, width: 450, price: 29.00 },
];

const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const CrossIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
);

const checkFit = (boxDims: number[], satchel: { length: number; width: number }): boolean => {
    const margin = 3;
    const [d1, d2, d3] = boxDims;

    const satchelL = Math.max(satchel.length, satchel.width);
    const satchelW = Math.min(satchel.length, satchel.width);

    const orientations = [
        { h: d1, l: d2, w: d3 },
        { h: d2, l: d1, w: d3 },
        { h: d3, l: d1, w: d2 },
    ];

    for (const orientation of orientations) {
        const { h, l, w } = orientation;
        const fitsOption1 = (l + h + margin <= satchelL) && (w + h + margin <= satchelW);
        const fitsOption2 = (w + h + margin <= satchelL) && (l + h + margin <= satchelW);

        if (fitsOption1 || fitsOption2) {
            return true;
        }
    }

    return false;
};

interface SatchelFitCalculatorProps {
  length: number;
  width: number;
  height: number;
  unit: 'cm' | 'mm';
}

const SatchelRow: React.FC<{ satchel: (typeof satchels)[0], isMuted?: boolean }> = ({ satchel, isMuted = false }) => (
    <div className={`flex items-center justify-between py-2 px-3 ${isMuted ? 'text-slate-400' : ''}`}>
        <div className="flex-1 pr-2">
            <p className={`font-semibold ${isMuted ? 'text-slate-500' : 'text-slate-800'}`}>{satchel.name} <span className="text-sm font-normal">{`(${satchel.size})`}</span></p>
            <p className="text-xs">{satchel.length}mm x {satchel.width}mm</p>
        </div>
        <div className="text-right">
            <p className={`font-semibold ${isMuted ? 'text-slate-500' : 'text-slate-700'}`}>${satchel.price.toFixed(2)}</p>
        </div>
    </div>
);


const SatchelFitCalculator: React.FC<SatchelFitCalculatorProps> = ({ length, width, height, unit }) => {
  const { fittingSatchels, nonFittingSatchels, hasDimensions } = useMemo(() => {
    const hasValidDimensions = length > 0 && width > 0 && height > 0;
    if (!hasValidDimensions) {
        return { fittingSatchels: [], nonFittingSatchels: [], hasDimensions: false };
    }

    const l_mm = unit === 'cm' ? length * 10 : length;
    const w_mm = unit === 'cm' ? width * 10 : width;
    const h_mm = unit === 'cm' ? height * 10 : height;
    const boxDimensions = [l_mm, w_mm, h_mm];
    
    const results = satchels.map(satchel => ({
      ...satchel,
      fits: checkFit(boxDimensions, satchel),
    }));

    const sortedResults = results.sort((a, b) => a.length * a.width - b.length * b.width);

    return {
        fittingSatchels: sortedResults.filter(s => s.fits),
        nonFittingSatchels: sortedResults.filter(s => !s.fits),
        hasDimensions: true,
    }
  }, [length, width, height, unit]);

  if (!hasDimensions) {
    return (
      <div className="text-center text-slate-500 bg-slate-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-slate-800 mb-2">Express Satchel Fit Guide</h3>
        <p>Enter package dimensions to see which satchels it fits.</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-800 mb-4 text-center">Express Satchel Fit Guide</h3>
      <div className="space-y-4">
        {fittingSatchels.length > 0 && (
            <div>
                <div className="flex items-center gap-2 p-2 bg-green-100/60 rounded-t-lg border-b-2 border-green-200">
                    <CheckIcon className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <h4 className="font-bold text-green-800 text-base">Fits These Satchels</h4>
                </div>
                <div className="divide-y divide-slate-100 bg-white rounded-b-lg border border-t-0 border-slate-200 shadow-sm">
                    {fittingSatchels.map(satchel => <SatchelRow key={satchel.name} satchel={satchel} />)}
                </div>
            </div>
        )}

        {nonFittingSatchels.length > 0 && (
            <div>
                <div className="flex items-center gap-2 p-2 bg-red-100/60 rounded-t-lg border-b-2 border-red-200">
                    <CrossIcon className="h-5 w-5 text-red-600 flex-shrink-0" />
                    <h4 className="font-bold text-red-800 text-base">Does Not Fit These Satchels</h4>
                </div>
                <div className="divide-y divide-slate-100 bg-slate-50/50 rounded-b-lg border border-t-0 border-slate-200 shadow-sm">
                    {nonFittingSatchels.map(satchel => <SatchelRow key={satchel.name} satchel={satchel} isMuted />)}
                </div>
            </div>
        )}
        
        {fittingSatchels.length === 0 && nonFittingSatchels.length > 0 && (
             <div className="text-center text-slate-500 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="font-semibold text-yellow-800">Your package does not fit in any standard express satchels.</p>
            </div>
        )}

      </div>
      <div className="mt-4 text-xs text-slate-500 text-center space-y-1">
        <p>
          Express packs used for Saturday, Residential or Rural services require an extra ticket relevant to that service.
        </p>
        <p>
          <a href="https://help.nzcouriers.co.nz/pricing-ticketing/price-of-express-packs" target="_blank" rel="noopener noreferrer" className="text-brandRed hover:underline font-medium">
            View official pricing details
          </a>
        </p>
      </div>
    </div>
  );
};

export default SatchelFitCalculator;
