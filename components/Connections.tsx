
import React from 'react';
import { WorkflowNode, Connection } from '../types';

interface ConnectionsProps {
  nodes: WorkflowNode[];
  connections: Connection[];
}

const Connections: React.FC<ConnectionsProps> = ({ nodes, connections }) => {
  // Helper to find node coordinates
  const getNodePos = (id: string) => {
    const node = nodes.find(n => n.id === id);
    if (!node) return { x: 0, y: 0 };
    return { 
      x: node.position.x, 
      y: node.position.y
    };
  };

  return (
    <svg className="absolute inset-0 overflow-visible pointer-events-none w-full h-full">
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
        </marker>
      </defs>
      {connections.map((conn, idx) => {
        const start = getNodePos(conn.from);
        const end = getNodePos(conn.to);
        
        // CARD DIMENSIONS CONSTANTS
        // w-72 = 288px width
        // Anchor vertical: Top padding (20) + Header approx height center (68) ~ 88px from top
        const ANCHOR_Y_OFFSET = 88;
        const CARD_WIDTH = 288;

        const startX = start.x + CARD_WIDTH; 
        const startY = start.y + ANCHOR_Y_OFFSET;
        const endX = end.x;
        const endY = end.y + ANCHOR_Y_OFFSET;

        // Bezier Curve Logic
        const dist = Math.abs(endX - startX);
        const controlPoint1 = { x: startX + dist * 0.5, y: startY };
        const controlPoint2 = { x: endX - dist * 0.5, y: endY };

        const pathData = `M ${startX} ${startY} C ${controlPoint1.x} ${controlPoint1.y}, ${controlPoint2.x} ${controlPoint2.y}, ${endX} ${endY}`;
        
        return (
          <g key={`${conn.from}-${conn.to}`}>
            {/* Background Thick Line for hover tolerance or shadow */}
            <path 
              d={pathData} 
              stroke="white" 
              strokeWidth="6" 
              fill="none" 
              className="opacity-50"
            />
            {/* Main Line */}
            <path 
              d={pathData} 
              stroke="#cbd5e1" 
              strokeWidth="2" 
              fill="none" 
              markerEnd="url(#arrowhead)"
              className="transition-colors duration-500"
            />
            {/* Animated Dash for flow effect - Blue only if connected from active/completed */}
            <path 
              d={pathData} 
              stroke="#3b82f6" 
              strokeWidth="2" 
              fill="none" 
              strokeDasharray="10,10"
              className="opacity-0 animate-dash"
              style={{ animation: 'dash 1.5s linear infinite' }}
            />
          </g>
        );
      })}
    </svg>
  );
};

export default Connections;
