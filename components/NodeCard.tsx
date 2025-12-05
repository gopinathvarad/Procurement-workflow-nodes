
import React, { useState } from 'react';
import { Icons } from '../constants';
import { WorkflowNode, WorkflowStep } from '../types';

interface NodeCardProps {
  node: WorkflowNode;
  selected: boolean;
  onMouseDown: (e: React.MouseEvent, nodeId: string) => void;
  onClick: (nodeId: string) => void;
  onStepClick: (step: WorkflowStep) => void;
}

const NodeCard: React.FC<NodeCardProps> = ({ node, selected, onMouseDown, onClick, onStepClick }) => {
  const [expanded, setExpanded] = useState(false);

  const isCompleted = node.status === 'completed';
  const isActive = node.status === 'active';
  const isPending = node.status === 'pending';

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(!expanded);
    onClick(node.id); // Also select the node
  };

  return (
    <div
      className={`
        absolute w-72 rounded-3xl transition-all duration-500 ease-spring group
        ${selected ? 'z-20' : 'z-10 hover:z-20'}
        ${expanded ? 'shadow-2xl' : 'shadow-lg'}
        ${isActive ? 'shadow-blue-200/50' : ''}
        cursor-grab active:cursor-grabbing
      `}
      style={{
        transform: `translate(${node.position.x}px, ${node.position.y}px)`,
      }}
      onMouseDown={(e) => onMouseDown(e, node.id)}
      onClick={() => onClick(node.id)}
    >
      {/* Background Glow for Active State */}
      {isActive && (
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-3xl blur-xl opacity-75 pointer-events-none animate-pulse"></div>
      )}

      {/* Main Card Container */}
      <div className={`
        relative bg-white/95 backdrop-blur-xl rounded-3xl overflow-hidden border transition-colors duration-300
        ${isActive ? 'border-blue-400 ring-1 ring-blue-100' : 'border-slate-200'}
        ${isCompleted ? 'border-emerald-400 ring-1 ring-emerald-100' : ''}
      `}>
        
        {/* === Header Section (Always Visible) === */}
        <div 
          className="p-5 cursor-pointer"
          onClick={toggleExpand}
        >
          <div className="flex justify-between items-center mb-3">
             <div className="flex items-center space-x-2">
                <div className={`
                   w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold
                   ${isCompleted ? 'bg-emerald-500' : isActive ? 'bg-blue-600' : 'bg-slate-300'}
                `}>
                   {isCompleted ? <Icons.Check /> : isActive ? <span className="animate-spin-slow"><Icons.Clock /></span> : <Icons.Lock />}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-blue-600' : 'text-slate-500'}`}>
                  Phase {node.id.split('-')[1]}
                </span>
             </div>
             
             {/* Progress Pill */}
             <div className="bg-slate-100 px-2 py-1 rounded-md text-[10px] font-bold text-slate-600 flex items-center space-x-1">
               <span>{node.progress}%</span>
             </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 leading-tight mb-2 pr-4">
             {node.title}
          </h3>

          <div className="flex justify-between items-center mt-4">
              <div className="flex -space-x-2 overflow-hidden">
                 {/* Stack of avatars for steps assignees (limit to 3) */}
                 {node.steps.slice(0, 3).map((step, idx) => (
                    <div key={idx} className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-slate-200 flex items-center justify-center text-[8px] font-bold text-slate-600">
                       {step.assignee?.name.charAt(0)}
                    </div>
                 ))}
                 {node.steps.length > 3 && (
                    <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-slate-100 flex items-center justify-center text-[8px] text-slate-500">
                       +{node.steps.length - 3}
                    </div>
                 )}
              </div>
              
              <button className={`
                 transform transition-transform duration-300 p-1 rounded-full hover:bg-slate-100 text-slate-400
                 ${expanded ? 'rotate-180' : ''}
              `}>
                 <Icons.ChevronDown className="w-5 h-5" />
              </button>
          </div>
          
          {/* Progress Bar Line */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-100">
             <div 
                className={`h-full transition-all duration-1000 ${isCompleted ? 'bg-emerald-500' : isActive ? 'bg-blue-500' : 'bg-slate-300'}`} 
                style={{ width: `${node.progress}%` }}
             />
          </div>
        </div>

        {/* === Expanded Content (Sub-steps) === */}
        <div className={`
             bg-slate-50 border-t border-slate-100
             transition-all duration-500 ease-in-out overflow-hidden
             ${expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}>
          <div className="p-2 space-y-1">
            {node.steps.map((step, index) => (
               <div 
                  key={step.id}
                  onClick={(e) => {
                      e.stopPropagation();
                      onStepClick(step);
                  }}
                  className={`
                     flex items-center p-3 rounded-xl cursor-pointer transition-all hover:bg-white hover:shadow-md border border-transparent hover:border-slate-100
                     group
                  `}
               >
                  {/* Status Line/Icon */}
                  <div className={`mr-3 flex flex-col items-center`}>
                      <div className={`
                         w-2 h-2 rounded-full mb-1
                         ${step.status === 'completed' ? 'bg-emerald-500' : 
                           step.status === 'active' ? 'bg-blue-500 animate-pulse' : 'bg-slate-300'}
                      `}></div>
                      {index !== node.steps.length - 1 && <div className="w-px h-full bg-slate-200 min-h-[10px]"></div>}
                  </div>

                  <div className="flex-1">
                      <div className="flex justify-between items-center mb-0.5">
                         <span className={`text-xs font-semibold ${step.status === 'pending' ? 'text-slate-400' : 'text-slate-700'}`}>
                           {step.title}
                         </span>
                         {step.status === 'completed' && <span className="text-emerald-500"><Icons.Check /></span>}
                      </div>
                      <div className="flex items-center justify-between">
                         <span className="text-[10px] text-slate-400">{step.assignee?.name}</span>
                         {step.status === 'active' && <span className="text-[9px] bg-blue-100 text-blue-600 px-1.5 rounded-sm font-bold">NOW</span>}
                      </div>
                  </div>
               </div>
            ))}
            <div className="h-2"></div>
          </div>
        </div>
      </div>

      {/* Connector Nodes (Visual anchors for lines) */}
      <div className="absolute top-[88px] -left-1 w-2 h-2 bg-slate-300 rounded-full"></div>
      <div className="absolute top-[88px] -right-1 w-2 h-2 bg-slate-300 rounded-full"></div>

    </div>
  );
};

export default NodeCard;
