
import React from 'react';
import { Icons } from '../constants';
import { WorkflowStep } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface DetailSidebarProps {
  step: WorkflowStep | null;
  phaseTitle?: string;
  onClose: () => void;
}

const DetailSidebar: React.FC<DetailSidebarProps> = ({ step, phaseTitle, onClose }) => {
  if (!step) return null;

  // Mock data for the chart based on step status
  const chartData = [
    { name: 'Completed', value: step.status === 'completed' ? 100 : 0 },
    { name: 'Remaining', value: step.status === 'completed' ? 0 : 100 },
  ];
  
  if (step.status === 'active') {
      chartData[0].value = 60;
      chartData[1].value = 40;
  }

  const COLORS = ['#10b981', '#e2e8f0'];
  if (step.status === 'active') COLORS[0] = '#3b82f6';
  if (step.status === 'pending') COLORS[0] = '#94a3b8';

  return (
    <div className="absolute right-0 top-0 bottom-0 w-96 bg-white/90 backdrop-blur-xl shadow-2xl border-l border-white/50 z-20 flex flex-col transform transition-transform duration-300 ease-in-out">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex justify-between items-start">
        <div>
          <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">{phaseTitle || 'Detail'}</span>
          <h2 className="text-2xl font-bold text-slate-800 mt-1">{step.title}</h2>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        
        {/* Status Section */}
        <div className="flex items-center space-x-4">
          <div className={`
            w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner
            ${step.status === 'completed' ? 'bg-emerald-100 text-emerald-600' : ''}
            ${step.status === 'active' ? 'bg-blue-100 text-blue-600' : ''}
            ${step.status === 'pending' ? 'bg-slate-100 text-slate-400' : ''}
          `}>
             {step.status === 'completed' && <Icons.Check />}
             {step.status === 'active' && <Icons.Clock />}
             {step.status === 'pending' && <Icons.Lock />}
          </div>
          <div>
            <p className="text-sm text-gray-500">Current Status</p>
            <p className="text-lg font-semibold capitalize text-slate-800">{step.status}</p>
          </div>
        </div>

        {/* Assignee Card */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <p className="text-xs text-slate-400 uppercase font-bold mb-3">Responsible Party</p>
          <div className="flex items-center space-x-3">
             <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
                {step.assignee?.name.charAt(0)}
             </div>
             <div>
               <p className="text-sm font-semibold text-slate-800">{step.assignee?.name}</p>
               <p className="text-xs text-slate-500">{step.assignee?.role}</p>
             </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-sm font-bold text-slate-800 mb-2">Details</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            {step.description}
          </p>
        </div>

        {/* Efficiency Chart */}
        <div className="h-48 w-full bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
            <h3 className="text-xs font-bold text-slate-400 uppercase mb-2">Step Completion</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
        </div>

        {/* Documents */}
        {step.documents && (
           <div>
            <h3 className="text-sm font-bold text-slate-800 mb-3">Documents</h3>
            <div className="space-y-2">
              {step.documents.map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg hover:border-blue-400 transition-colors cursor-pointer group">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-50 rounded text-red-500">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" /></svg>
                    </div>
                    <span className="text-sm font-medium text-slate-700">{doc.name}</span>
                  </div>
                  <span className="text-xs text-slate-400 group-hover:text-blue-500">Download</span>
                </div>
              ))}
            </div>
           </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t border-gray-100 bg-slate-50">
        {step.status === 'active' ? (
           <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center space-x-2">
             <span>Approve Step</span>
             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
           </button>
        ) : (
          <button className="w-full py-3 bg-white border border-slate-200 text-slate-500 rounded-xl font-medium hover:bg-slate-50 transition-colors">
            View Audit Log
          </button>
        )}
      </div>
    </div>
  );
};

export default DetailSidebar;
