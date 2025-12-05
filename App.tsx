import React from 'react';
import WorkflowCanvas from './components/WorkflowCanvas';
import TopBar from './components/TopBar';

function App() {
  return (
    <div className="w-full h-screen relative bg-slate-50 text-slate-900 overflow-hidden font-sans">
      <TopBar />
      <WorkflowCanvas />
      
      {/* Global Styles for Animations */}
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -20;
          }
        }
        .animate-dash {
          animation: dash 1s linear infinite;
        }
        .animate-spin-slow {
            animation: spin 3s linear infinite;
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default App;