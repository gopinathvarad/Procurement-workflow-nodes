
export type Status = 'completed' | 'active' | 'pending' | 'blocked';

export interface User {
  name: string;
  role: string;
  avatar?: string;
}

// Represents the granular sub-steps (e.g., "PR Draft", "Technician Review")
export interface WorkflowStep {
  id: string;
  title: string;
  status: Status;
  assignee?: User;
  completedDate?: string;
  duration?: string; // e.g., "2 days"
  description: string;
  tags?: string[];
  blockers?: string[]; // If blocked, why
  documents?: { name: string; type: string }[];
}

export interface NodePosition {
  x: number;
  y: number;
}

// Represents the Main Phase Node on the canvas
export interface WorkflowNode {
  id: string;
  title: string; // e.g., "Purchase Requisition"
  status: Status;
  position: NodePosition;
  steps: WorkflowStep[]; // Nested steps
  progress: number; // Percentage complete (0-100)
}

export interface Connection {
  from: string;
  to: string;
}
