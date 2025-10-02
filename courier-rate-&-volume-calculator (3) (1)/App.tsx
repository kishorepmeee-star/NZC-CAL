import React from 'react';
import VolumeCalculator from './components/VolumeCalculator';
import RateCalculator from './components/RateCalculator';

const App: React.FC = () => {
  return (
    <div className="min-h-screen text-slate-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <img 
            src="https://my.nzcouriers.co.nz/Content/Skin/NZC/images/banner-logo.png?75b116"
            alt="New Zealand Couriers Logo" 
            className="w-full max-w-sm sm:max-w-md mx-auto h-auto"
          />
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Quickly calculate package volume and shipping costs with our easy-to-use tools.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <VolumeCalculator />
          <RateCalculator />
        </main>

        <footer className="text-center mt-16 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} Courier Calculator. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;