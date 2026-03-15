import { create } from 'zustand';
import type { Item, Connection, ItemType, ItemStatus, ConnectionType } from '@/lib/types';
import * as db from '@/lib/db-client';

interface AppState {
  // Data
  items: Item[];
  connections: Connection[];
  
  // UI State
  selectedItemId: string | null;
  filterType: ItemType | 'all';
  filterStatus: ItemStatus | 'all';
  searchQuery: string;
  viewMode: 'list' | 'graph' | 'text';
  
  // Loading
  isLoading: boolean;
  
  // Actions
  loadData: () => Promise<void>;
  addItem: (item: { type: ItemType; title: string; description: string; status: ItemStatus }) => Promise<Item>;
  updateItem: (id: string, updates: Partial<Omit<Item, 'id' | 'createdAt'>>) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  addConnection: (connection: { fromId: string; toId: string; type: ConnectionType; note: string }) => Promise<Connection>;
  deleteConnection: (id: string) => Promise<void>;
  setSelectedItem: (id: string | null) => void;
  setFilterType: (type: ItemType | 'all') => void;
  setFilterStatus: (status: ItemStatus | 'all') => void;
  setSearchQuery: (query: string) => void;
  setViewMode: (mode: 'list' | 'graph' | 'text') => void;
  exportData: () => Promise<string>;
  importData: (encoded: string) => Promise<{ success: boolean; message: string; stats?: { items: number; connections: number } }>;
  clearAllData: () => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
  // Initial state
  items: [],
  connections: [],
  selectedItemId: null,
  filterType: 'all',
  filterStatus: 'all',
  searchQuery: '',
  viewMode: 'text',
  isLoading: true,
  
  // Actions
  loadData: async () => {
    set({ isLoading: true });
    const [items, connections] = await Promise.all([
      db.getAllItems(),
      db.getAllConnections(),
    ]);
    set({ items, connections, isLoading: false });
  },
  
  addItem: async (itemData) => {
    const newItem = await db.addItem(itemData);
    set((state) => ({ items: [...state.items, newItem] }));
    return newItem;
  },
  
  updateItem: async (id, updates) => {
    await db.updateItem(id, updates);
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, ...updates, updatedAt: Date.now() } : item
      ),
    }));
  },
  
  deleteItem: async (id) => {
    await db.deleteItem(id);
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
      connections: state.connections.filter(
        (conn) => conn.fromId !== id && conn.toId !== id
      ),
      selectedItemId: state.selectedItemId === id ? null : state.selectedItemId,
    }));
  },
  
  addConnection: async (connectionData) => {
    const newConnection = await db.addConnection(connectionData);
    set((state) => ({ connections: [...state.connections, newConnection] }));
    return newConnection;
  },
  
  deleteConnection: async (id) => {
    await db.deleteConnection(id);
    set((state) => ({
      connections: state.connections.filter((conn) => conn.id !== id),
    }));
  },
  
  setSelectedItem: (id) => set({ selectedItemId: id }),
  
  setFilterType: (type) => set({ filterType: type }),
  
  setFilterStatus: (status) => set({ filterStatus: status }),
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  setViewMode: (mode) => set({ viewMode: mode }),
  
  exportData: async () => {
    return db.exportData();
  },
  
  importData: async (encoded) => {
    const result = await db.importData(encoded);
    if (result.success) {
      await get().loadData();
    }
    return result;
  },
  
  clearAllData: async () => {
    await db.clearAllData();
    set({ items: [], connections: [], selectedItemId: null });
  },
}));
