
import { WorkflowNode, Connection } from './types';
import React from 'react';

// Icons as SVG components for reusability
export const Icons = {
  Check: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  ),
  Clock: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Lock: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  Alert: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  User: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  ChevronDown: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-4 w-4"} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
};

// Grouped Nodes (Phases)
export const INITIAL_NODES: WorkflowNode[] = [
  {
    id: 'phase-1',
    title: 'Purchase Requisition',
    status: 'completed',
    progress: 100,
    position: { x: 100, y: 300 },
    steps: [
      {
        id: 'pr-1',
        title: 'PR Draft Approved',
        status: 'completed',
        assignee: { name: 'Sarah Jenkins', role: 'Requestor' },
        completedDate: 'Dec 01, 2023',
        duration: '< 1 hour',
        description: 'Initial draft of the purchase requisition created by the department head.',
      },
      {
        id: 'pr-2',
        title: 'Technician Review',
        status: 'completed',
        assignee: { name: 'Mike Ross', role: 'Technician' },
        completedDate: 'Dec 02, 2023',
        duration: '4 hours',
        description: 'Technical specifications verification and approval.',
      },
      {
        id: 'pr-3',
        title: 'Material Review',
        status: 'completed',
        assignee: { name: 'Linda Chen', role: 'Material Controller' },
        completedDate: 'Dec 02, 2023',
        duration: '2 hours',
        description: 'Checking inventory availability and material codes.',
      },
      {
        id: 'pr-4',
        title: 'Budget Approval',
        status: 'completed',
        assignee: { name: 'Oscar Martinez', role: 'Budget Controller' },
        completedDate: 'Dec 03, 2023',
        duration: '1 day',
        description: 'Verification of available budget for the cost center.',
      },
      {
        id: 'pr-5',
        title: 'Final PR Approval',
        status: 'completed',
        assignee: { name: 'Elena Fisher', role: 'Plant Manager' },
        completedDate: 'Dec 04, 2023',
        duration: '5 hours',
        description: 'Final executive approval to proceed with sourcing.',
      }
    ]
  },
  {
    id: 'phase-2',
    title: 'RFQ / Sourcing',
    status: 'active',
    progress: 40,
    position: { x: 500, y: 300 }, // Spaced out for cards
    steps: [
      {
        id: 'rfq-1',
        title: 'Buyer Assignment',
        status: 'completed',
        assignee: { name: 'System', role: 'Automated' },
        completedDate: 'Dec 04, 2023',
        duration: 'Instant',
        description: 'Automatic assignment to category buyer based on material group.',
      },
      {
        id: 'rfq-2',
        title: 'RFQ Prep',
        status: 'active',
        assignee: { name: 'David Kim', role: 'Buyer' },
        duration: 'In Progress (2d)',
        description: 'Preparing the Request for Quotation document and selecting potential vendors.',
        tags: ['Urgent', 'High Value'],
        documents: [{name: 'TechSpecs_v2.pdf', type: 'PDF'}]
      },
      {
        id: 'rfq-3',
        title: 'Quote Collection',
        status: 'pending',
        assignee: { name: 'Vendors', role: 'External' },
        description: 'Waiting for vendors to submit their technical and commercial proposals.',
      },
      {
        id: 'rfq-4',
        title: 'Evaluation',
        status: 'pending',
        assignee: { name: 'Evaluation Team', role: 'Committee' },
        description: 'Scoring vendor responses based on price, quality, and delivery.',
      }
    ]
  },
  {
    id: 'phase-3',
    title: 'Award & Contract',
    status: 'pending',
    progress: 0,
    position: { x: 900, y: 300 },
    steps: [
      {
        id: 'award-1',
        title: 'Vendor Selection',
        status: 'pending',
        assignee: { name: 'Award Manager', role: 'Procurement' },
        description: 'Formal selection of the winning bid.',
      },
      {
        id: 'legal-1',
        title: 'Legal Review',
        status: 'pending',
        assignee: { name: 'Legal Dept', role: 'Legal' },
        description: 'Contract terms review (Optional).',
      }
    ]
  },
  {
    id: 'phase-4',
    title: 'Purchase Order',
    status: 'pending',
    progress: 0,
    position: { x: 1300, y: 300 },
    steps: [
        {
          id: 'po-1',
          title: 'PO Generation',
          status: 'pending',
          assignee: { name: 'System', role: 'ERP' },
          description: 'Creation of the Purchase Order in SAP.',
        },
        {
          id: 'po-2',
          title: 'PO Approval',
          status: 'pending',
          assignee: { name: 'Procurement Head', role: 'Signatory' },
          description: 'Final signature on the Purchase Order.',
        }
    ]
  },
  {
      id: 'phase-5',
      title: 'Delivery & Quality',
      status: 'pending',
      progress: 0,
      position: { x: 1700, y: 300 },
      steps: [
          { id: 'del-1', title: 'Goods In Transit', status: 'pending', description: 'Goods shipped by vendor.', assignee: {name: 'Logistics', role: 'Provider'} },
          { id: 'del-2', title: 'Goods Receipt', status: 'pending', description: 'Warehouse receiving.', assignee: {name: 'Warehouse', role: 'Ops'} },
          { id: 'del-3', title: 'QC Inspection', status: 'pending', description: 'Quality verification.', assignee: {name: 'Quality Team', role: 'QC'} },
      ]
  }
];

// Linear flow connections between Phases
export const INITIAL_CONNECTIONS: Connection[] = [
  { from: 'phase-1', to: 'phase-2' },
  { from: 'phase-2', to: 'phase-3' },
  { from: 'phase-3', to: 'phase-4' },
  { from: 'phase-4', to: 'phase-5' },
];
