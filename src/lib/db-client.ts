import Dexie, { type Table } from 'dexie';
import type { Item, Connection } from './types';

export class ConnectionTrackerDB extends Dexie {
  items!: Table<Item, string>;
  connections!: Table<Connection, string>;

  constructor() {
    super('ConnectionTrackerDB');
    
    this.version(1).stores({
      items: 'id, type, status, createdAt, updatedAt',
      connections: 'id, fromId, toId, type, createdAt'
    });
  }
}

export const db = new ConnectionTrackerDB();

// Helper functions for database operations
export async function getAllItems(): Promise<Item[]> {
  return db.items.toArray();
}

export async function getAllConnections(): Promise<Connection[]> {
  return db.connections.toArray();
}

export async function addItem(item: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>): Promise<Item> {
  const now = Date.now();
  const newItem: Item = {
    ...item,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };
  await db.items.add(newItem);
  return newItem;
}

export async function updateItem(id: string, updates: Partial<Omit<Item, 'id' | 'createdAt'>>): Promise<void> {
  await db.items.update(id, { ...updates, updatedAt: Date.now() });
}

export async function deleteItem(id: string): Promise<void> {
  // Also delete all connections involving this item
  await db.connections.where('fromId').equals(id).delete();
  await db.connections.where('toId').equals(id).delete();
  await db.items.delete(id);
}

export async function addConnection(connection: Omit<Connection, 'id' | 'createdAt'>): Promise<Connection> {
  const newConnection: Connection = {
    ...connection,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
  };
  await db.connections.add(newConnection);
  return newConnection;
}

export async function deleteConnection(id: string): Promise<void> {
  await db.connections.delete(id);
}

export async function getConnectionsForItem(itemId: string): Promise<{ outgoing: Connection[]; incoming: Connection[] }> {
  const outgoing = await db.connections.where('fromId').equals(itemId).toArray();
  const incoming = await db.connections.where('toId').equals(itemId).toArray();
  return { outgoing, incoming };
}

// Export all data
export async function exportData(): Promise<string> {
  const items = await getAllItems();
  const connections = await getAllConnections();
  
  const data = {
    items,
    connections,
    exportedAt: Date.now(),
    version: '1.0',
  };
  
  // Compress and encode for URL
  const jsonStr = JSON.stringify(data);
  return btoa(encodeURIComponent(jsonStr));
}

// Import data from encoded string
export async function importData(encoded: string): Promise<{ success: boolean; message: string; stats?: { items: number; connections: number } }> {
  try {
    const jsonStr = decodeURIComponent(atob(encoded));
    const data = JSON.parse(jsonStr);
    
    if (!data.items || !data.connections) {
      return { success: false, message: 'Invalid data format' };
    }
    
    // Clear existing data and import new
    await db.items.clear();
    await db.connections.clear();
    
    await db.items.bulkAdd(data.items);
    await db.connections.bulkAdd(data.connections);
    
    return { 
      success: true, 
      message: 'Data imported successfully',
      stats: { items: data.items.length, connections: data.connections.length }
    };
  } catch (error) {
    return { success: false, message: `Import failed: ${error instanceof Error ? error.message : 'Unknown error'}` };
  }
}

// Clear all data
export async function clearAllData(): Promise<void> {
  await db.items.clear();
  await db.connections.clear();
}
