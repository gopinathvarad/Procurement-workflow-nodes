import React from 'react';

const TopBar: React.FC = () => {
  return (
    <div className="absolute top-6 left-6 right-6 z-20 pointer-events-none flex justify-between items-start">
        {/* Brand & Title */}
        <div className="pointer-events-auto bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50 flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 max-w-2xl">
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-300">
                    P
                </div>
                <div>
                    <h1 className="font-bold text-slate-800 leading-tight">Procurement Workflow</h1>
                    <p className="text-xs text-slate-500">ID: #REQ-2023-8924 • Cooling Systems Upgrade</p>
                </div>
            </div>

            <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>

            <div className="flex space-x-6">
                <div>
                    <p className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Overall Progress</p>
                    <div className="flex items-center space-x-2">
                        <div className="flex-1 w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 w-[65%] rounded-full shadow-sm"></div>
                        </div>
                        <span className="text-sm font-bold text-slate-700">65%</span>
                    </div>
                </div>
                <div>
                    <p className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Est. Completion</p>
                    <p className="text-sm font-bold text-slate-700">Dec 14, 2023</p>
                </div>
            </div>
        </div>

        {/* Action Buttons */}
        <div className="pointer-events-auto flex space-x-3">
             <button className="bg-white/90 backdrop-blur text-slate-600 px-4 py-3 rounded-xl shadow-lg border border-white/50 font-medium text-sm hover:bg-slate-50 transition-colors">
                 Help
             </button>
             <button className="bg-slate-800 text-white px-5 py-3 rounded-xl shadow-lg shadow-slate-300 font-medium text-sm hover:bg-slate-700 transition-transform active:scale-95 flex items-center space-x-2">
                 <span>New Request</span>
                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
             </button>
        </div>
    </div>
  );
};

export default TopBar;