// Core types for the Problem-Solution Connection Tracker

export type ItemType = 'problem' | 'solution' | 'iteration';
export type ItemStatus = 'active' | 'resolved' | 'archived';
export type ConnectionType = 'solves' | 'causes' | 'iterates' | 'breaks-down' | 'related';

export interface Item {
  id: string;
  type: ItemType;
  title: string;
  description: string;
  status: ItemStatus;
  createdAt: number;
  updatedAt: number;
}

export interface Connection {
  id: string;
  fromId: string;
  toId: string;
  type: ConnectionType;
  note: string;
  createdAt: number;
}

// For export/import
export interface AppData {
  items: Item[];
  connections: Connection[];
  exportedAt: number;
  version: string;
}

// Connection type labels for display
export const CONNECTION_TYPE_LABELS: Record<ConnectionType, { label: string; description: string; color: string; reverseLabel: string }> = {
  solves: { label: 'Solves', description: 'This solves the target', color: 'text-green-600', reverseLabel: 'solved by' },
  causes: { label: 'Causes', description: 'This causes the target', color: 'text-red-600', reverseLabel: 'caused by' },
  iterates: { label: 'Iterates', description: 'This is an iteration of the target', color: 'text-purple-600', reverseLabel: 'parent of' },
  'breaks-down': { label: 'Breaks down', description: 'This breaks down into the target (sub-problem)', color: 'text-orange-600', reverseLabel: 'parent of' },
  related: { label: 'Related', description: 'This is related to the target', color: 'text-gray-600', reverseLabel: 'related to' },
};

export const ITEM_TYPE_CONFIG: Record<ItemType, { label: string; color: string; bgColor: string; icon: string }> = {
  problem: { 
    label: 'Problem', 
    color: 'text-red-700', 
    bgColor: 'bg-red-50 border-red-200',
    icon: 'AlertCircle'
  },
  solution: { 
    label: 'Solution', 
    color: 'text-green-700', 
    bgColor: 'bg-green-50 border-green-200',
    icon: 'Lightbulb'
  },
  iteration: { 
    label: 'Iteration', 
    color: 'text-purple-700', 
    bgColor: 'bg-purple-50 border-purple-200',
    icon: 'GitBranch'
  },
};

export const STATUS_CONFIG: Record<ItemStatus, { label: string; color: string }> = {
  active: { label: 'Active', color: 'bg-blue-100 text-blue-800' },
  resolved: { label: 'Resolved', color: 'bg-green-100 text-green-800' },
  archived: { label: 'Archived', color: 'bg-gray-100 text-gray-800' },
};
