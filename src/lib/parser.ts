// Parser for Mermaid-like syntax
// Supports:
// - P: Problem title  or  problem: Title  or  (P) Title
// - S: Solution title  or  solution: Title  or  (S) Title
// - I: Iteration title  or  iteration: Title  or  (I) Title
// - Title --solves--> Target  or  Title --> solves --> Target
// - Title --> Target  (defaults to 'related')

import type { Item, Connection, ItemType, ConnectionType } from './types';

export interface ParsedItem {
  tempId: string;
  type: ItemType;
  title: string;
  description?: string;
}

export interface ParsedConnection {
  fromTitle: string;
  toTitle: string;
  type: ConnectionType;
  note?: string;
}

export interface ParseResult {
  items: ParsedItem[];
  connections: ParsedConnection[];
  errors: string[];
}

// Normalize title for matching
function normalizeTitle(title: string): string {
  return title.trim().toLowerCase();
}

// Parse a single line for an item
function parseItemLine(line: string): ParsedItem | null {
  const trimmed = line.trim();
  if (!trimmed) return null;
  
  // Match patterns like:
  // P: Title, S: Title, I: Title
  // problem: Title, solution: Title, iteration: Title
  // (P) Title, (S) Title, (I) Title
  // [P] Title, [S] Title, [I] Title
  
  const patterns = [
    /^([PSI])\s*:\s*(.+)$/i,
    /^(problem|solution|iteration)\s*:\s*(.+)$/i,
    /^\(([PSI])\)\s*(.+)$/i,
    /^\[([PSI])\]\s*(.+)$/i,
  ];
  
  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match) {
      let type: ItemType;
      const typeChar = match[1].toUpperCase();
      
      if (typeChar === 'P' || match[1].toLowerCase() === 'problem') {
        type = 'problem';
      } else if (typeChar === 'S' || match[1].toLowerCase() === 'solution') {
        type = 'solution';
      } else if (typeChar === 'I' || match[1].toLowerCase() === 'iteration') {
        type = 'iteration';
      } else {
        continue;
      }
      
      const title = match[2].trim();
      if (!title) continue;
      
      // Check for description in quotes
      const descMatch = title.match(/^(.+?)\s*["'](.+?)["']$/);
      const itemTitle = descMatch ? descMatch[1].trim() : title;
      const description = descMatch?.[2];
      
      return {
        tempId: crypto.randomUUID(),
        type,
        title: itemTitle,
        description,
      };
    }
  }
  
  return null;
}

// Parse a connection line
function parseConnectionLine(line: string): ParsedConnection | null {
  const trimmed = line.trim();
  if (!trimmed) return null;
  
  // Match patterns:
  // Title --solves--> Target
  // Title --> solves --> Target
  // Title --> Target (related)
  // Title -> Target (related)
  // Title -solves-> Target
  // Title --breaks-down--> Target (for sub-problems)
  
  const connectionPatterns = [
    /^(.+?)\s*--\s*(solves|causes|iterates|breaks-down|breaks down|related)\s*-->\s*(.+)$/i,
    /^(.+?)\s*-->\s*(solves|causes|iterates|breaks-down|breaks down|related)\s*-->\s*(.+)$/i,
    /^(.+?)\s*->\s*(solves|causes|iterates|breaks-down|breaks down|related)\s*->\s*(.+)$/i,
    /^(.+?)\s*-\s*(solves|causes|iterates|breaks-down|breaks down|related)\s*->\s*(.+)$/i,
    /^(.+?)\s*-->\s*(.+)$/,
    /^(.+?)\s*->\s*(.+)$/,
  ];
  
  for (const pattern of connectionPatterns) {
    const match = trimmed.match(pattern);
    if (match) {
      const fromTitle = match[1].trim();
      let toTitle: string;
      let type: ConnectionType = 'related';
      
      if (match.length === 4) {
        // Has connection type - normalize it
        let typeStr = match[2].toLowerCase().replace(/\s+/g, '-');
        type = typeStr as ConnectionType;
        toTitle = match[3].trim();
      } else {
        toTitle = match[2].trim();
      }
      
      if (!fromTitle || !toTitle) continue;
      
      return { fromTitle, toTitle, type };
    }
  }
  
  return null;
}

// Main parser function
export function parseInput(text: string): ParseResult {
  const lines = text.split('\n');
  const items: ParsedItem[] = [];
  const connections: ParsedConnection[] = [];
  const errors: string[] = [];
  const titleSet = new Set<string>();
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.startsWith('#') || line.startsWith('//')) continue;
    
    // Try to parse as item first
    const item = parseItemLine(line);
    if (item) {
      const normalized = normalizeTitle(item.title);
      if (titleSet.has(normalized)) {
        errors.push(`Line ${i + 1}: Duplicate item "${item.title}"`);
      } else {
        items.push(item);
        titleSet.add(normalized);
      }
      continue;
    }
    
    // Try to parse as connection
    const connection = parseConnectionLine(line);
    if (connection) {
      connections.push(connection);
      continue;
    }
  }
  
  // Validate connections reference existing items
  for (const conn of connections) {
    const fromNorm = normalizeTitle(conn.fromTitle);
    const toNorm = normalizeTitle(conn.toTitle);
    
    // Block self-referencing connections
    if (fromNorm === toNorm) {
      errors.push(`Self-referencing connection not allowed: "${conn.fromTitle}"`);
      continue;
    }
    
    if (!titleSet.has(fromNorm)) {
      errors.push(`Connection references unknown item: "${conn.fromTitle}"`);
    }
    if (!titleSet.has(toNorm)) {
      errors.push(`Connection references unknown item: "${conn.toTitle}"`);
    }
  }
  
  return { items, connections, errors };
}

// Generate text from items and connections
export function generateText(items: Item[], connections: Connection[]): string {
  const lines: string[] = [];
  lines.push('# Connection Tracker Data');
  lines.push('# Format: P: Problem, S: Solution, I: Iteration');
  lines.push('# Connections: Title --solves--> Target');
  lines.push('');
  
  // Group items by type
  const problems = items.filter(i => i.type === 'problem');
  const solutions = items.filter(i => i.type === 'solution');
  const iterations = items.filter(i => i.type === 'iteration');
  
  if (problems.length > 0) {
    lines.push('# Problems');
    for (const item of problems) {
      let line = `P: ${item.title}`;
      if (item.description) {
        line += ` "${item.description}"`;
      }
      lines.push(line);
    }
    lines.push('');
  }
  
  if (solutions.length > 0) {
    lines.push('# Solutions');
    for (const item of solutions) {
      let line = `S: ${item.title}`;
      if (item.description) {
        line += ` "${item.description}"`;
      }
      lines.push(line);
    }
    lines.push('');
  }
  
  if (iterations.length > 0) {
    lines.push('# Iterations');
    for (const item of iterations) {
      let line = `I: ${item.title}`;
      if (item.description) {
        line += ` "${item.description}"`;
      }
      lines.push(line);
    }
    lines.push('');
  }
  
  if (connections.length > 0) {
    lines.push('# Connections');
    const itemMap = new Map(items.map(i => [i.id, i]));
    for (const conn of connections) {
      const from = itemMap.get(conn.fromId);
      const to = itemMap.get(conn.toId);
      if (from && to) {
        lines.push(`${from.title} --${conn.type}--> ${to.title}`);
      }
    }
  }
  
  return lines.join('\n');
}

// Apply parsed data to create actual items and connections
export async function applyParsedData(
  parsed: ParseResult,
  existingItems: Item[],
  addItemFn: (item: { type: ItemType; title: string; description: string; status: 'active' }) => Promise<Item>,
  addConnectionFn: (conn: { fromId: string; toId: string; type: ConnectionType; note: string }) => Promise<void>
): Promise<{ itemsAdded: number; connectionsAdded: number }> {
  // Create title to ID mapping (existing items)
  const titleToId = new Map<string, string>();
  for (const item of existingItems) {
    titleToId.set(normalizeTitle(item.title), item.id);
  }
  
  // Add new items
  for (const parsedItem of parsed.items) {
    const normalized = normalizeTitle(parsedItem.title);
    if (!titleToId.has(normalized)) {
      const newItem = await addItemFn({
        type: parsedItem.type,
        title: parsedItem.title,
        description: parsedItem.description || '',
        status: 'active',
      });
      titleToId.set(normalized, newItem.id);
    }
  }
  
  // Add connections
  let connectionsAdded = 0;
  for (const conn of parsed.connections) {
    const fromId = titleToId.get(normalizeTitle(conn.fromTitle));
    const toId = titleToId.get(normalizeTitle(conn.toTitle));
    
    // Skip self-referencing connections
    if (fromId && toId && fromId !== toId) {
      await addConnectionFn({
        fromId,
        toId,
        type: conn.type,
        note: conn.note || '',
      });
      connectionsAdded++;
    }
  }
  
  return {
    itemsAdded: parsed.items.length,
    connectionsAdded,
  };
}
