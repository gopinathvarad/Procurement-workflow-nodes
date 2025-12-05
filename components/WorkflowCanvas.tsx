
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { WorkflowNode, Connection, WorkflowStep } from '../types';
import { INITIAL_NODES, INITIAL_CONNECTIONS } from '../constants';
import NodeCard from './NodeCard';
import Connections from './Connections';
import DetailSidebar from './DetailSidebar';

const WorkflowCanvas: React.FC = () => {
  const [nodes, setNodes] = useState<WorkflowNode[]>(INITIAL_NODES);
  const [connections] = useState<Connection[]>(INITIAL_CONNECTIONS);
  
  // Viewport State
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isPanning, setIsPanning] = useState(false);
  
  // Node Dragging State
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  
  // Selection
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedStep, setSelectedStep] = useState<{ step: WorkflowStep; phaseTitle: string } | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);

  // --- Handlers ---

  const handleMouseDown = (e: React.MouseEvent) => {
    // Background click = pan
    if (e.target === canvasRef.current || (e.target as HTMLElement).tagName === 'SVG') {
      setIsPanning(true);
      dragStartRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isPanning && dragStartRef.current) {
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }));
      dragStartRef.current = { x: e.clientX, y: e.clientY };
    } else if (draggingNodeId && dragStartRef.current) {
        // Dragging a specific node
        const dx = (e.clientX - dragStartRef.current.x) / zoom;
        const dy = (e.clientY - dragStartRef.current.y) / zoom;
        
        setNodes(prev => prev.map(n => {
            if (n.id === draggingNodeId) {
                return {
                    ...n,
                    position: {
                        x: n.position.x + dx,
                        y: n.position.y + dy
                    }
                };
            }
            return n;
        }));
        
        dragStartRef.current = { x: e.clientX, y: e.clientY };
    }
  }, [isPanning, draggingNodeId, zoom]);

  const handleMouseUp = () => {
    setIsPanning(false);
    setDraggingNodeId(null);
    dragStartRef.current = null;
  };

  const handleWheel = (e: React.WheelEvent) => {
    // Zoom logic
    if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const zoomSensitivity = 0.001;
        const newZoom = Math.min(Math.max(0.2, zoom - e.deltaY * zoomSensitivity), 2);
        setZoom(newZoom);
    } else {
        // Standard pan with scroll
        setPan(prev => ({ x: prev.x - e.deltaX, y: prev.y - e.deltaY }));
    }
  };

  // Node Interactions
  const handleNodeMouseDown = (e: React.MouseEvent, nodeId: string) => {
      e.stopPropagation();
      setDraggingNodeId(nodeId);
      dragStartRef.current = { x: e.clientX, y: e.clientY };
      setSelectedNodeId(nodeId);
  };
  
  const handleStepClick = (step: WorkflowStep, phaseTitle: string) => {
      setSelectedStep({ step, phaseTitle });
  };

  // Center view on active node on mount
  useEffect(() => {
     const activeNode = nodes.find(n => n.status === 'active');
     if (activeNode && canvasRef.current) {
         const centerX = window.innerWidth / 2;
         const centerY = window.innerHeight / 2;
         setPan({
             x: centerX - (activeNode.position.x * zoom) - 144, // 144 is half card width (288/2)
             y: centerY - (activeNode.position.y * zoom) - 150 // Approx center
         });
     }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-50 cursor-crosshair select-none">
      
      {/* Grid Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
            backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)',
            backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
            backgroundPosition: `${pan.x}px ${pan.y}px`
        }}
      />

      {/* Main Canvas Container */}
      <div 
        ref={canvasRef}
        className="w-full h-full transform-origin-0-0"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <div 
            style={{ 
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transition: isPanning || draggingNodeId ? 'none' : 'transform 0.1s ease-out'
            }}
            className="absolute inset-0 w-full h-full"
        >
            <Connections nodes={nodes} connections={connections} />
            {nodes.map(node => (
                <NodeCard 
                    key={node.id} 
                    node={node} 
                    selected={selectedNodeId === node.id}
                    onMouseDown={handleNodeMouseDown}
                    onClick={setSelectedNodeId}
                    onStepClick={(step) => handleStepClick(step, node.title)}
                />
            ))}
        </div>
      </div>

      {/* Controls Overlay */}
      <div className="absolute bottom-6 left-6 flex space-x-2 bg-white p-2 rounded-xl shadow-lg border border-slate-100 z-10">
         <button onClick={() => setZoom(z => Math.max(0.2, z - 0.2))} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600">-</button>
         <span className="p-2 text-xs font-mono text-slate-400 w-12 text-center">{(zoom * 100).toFixed(0)}%</span>
         <button onClick={() => setZoom(z => Math.min(2, z + 0.2))} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600">+</button>
         <div className="w-px bg-slate-200 mx-2"></div>
         <button onClick={() => { setPan({x:0, y:0}); setZoom(1); }} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 text-xs font-bold">RESET</button>
      </div>

      {/* Sidebar Overlay */}
      <div className={`absolute top-0 right-0 h-full transition-transform duration-300 transform ${selectedStep ? 'translate-x-0' : 'translate-x-full'}`}>
         <DetailSidebar 
            step={selectedStep?.step || null} 
            phaseTitle={selectedStep?.phaseTitle}
            onClose={() => setSelectedStep(null)} 
         />
      </div>

    </div>
  );
};

export default WorkflowCanvas;
