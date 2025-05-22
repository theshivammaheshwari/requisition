
import React, { useEffect } from 'react';
import RequisitionForm from '@/components/RequisitionForm';
import '@/styles/print.css';

const Index = () => {
  // Force a repaint to ensure CSS is properly applied
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 print:bg-white print:p-0">
      <div className="max-w-4xl mx-auto">
        <RequisitionForm />
        <footer className="mt-8 text-center text-sm text-gray-500 print:hidden">
          <p>© 2025 LNMIIT. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
