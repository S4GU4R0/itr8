"use client";

import { useMemo, useRef, useState } from "react";
import type { Item, Connection } from "@/lib/types";
import { ITEM_TYPE_CONFIG } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Maximize2, Move } from "lucide-react";

interface GraphViewProps {
  items: Item[];
  connections: Connection[];
  selectedItemId: string | null;
  onSelectItem: (id: string) => void;
}

// Node dimensions - compact
const NODE_WIDTH = 140;
const NODE_HEIGHT = 32;
const H_GAP = 40; // Horizontal gap between nodes
const V_GAP = 12; // Vertical gap for branches

export function GraphView({ items, connections, selectedItemId, onSelectItem }: GraphViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  // Build layout with proper subtree sizing
  const { nodes, edges } = useMemo(() => {
    if (items.length === 0) return { nodes: [], edges: [] };
    
    const itemMap = new Map(items.map(i => [i.id, i]));
    
    // Track connections
    const outgoing = new Map<string, Connection[]>();
    const incoming = new Map<string, Connection[]>();
    
    for (const conn of connections) {
      if (!outgoing.has(conn.fromId)) outgoing.set(conn.fromId, []);
      outgoing.get(conn.fromId)!.push(conn);
      
      if (!incoming.has(conn.toId)) incoming.set(conn.toId, []);
      incoming.get(conn.toId)!.push(conn);
    }
    
    // Get connection direction
    const getDir = (conn: Connection): 'up' | 'down' | 'level' => {
      if (conn.type === 'solves' || conn.type === 'iterates') return 'up';
      if (conn.type === 'breaks-down') return 'down';
      return 'level';
    };
    
    // Find starting nodes (no incoming, or only level incoming)
    const isStart = (id: string) => {
      const inc = incoming.get(id) || [];
      if (inc.length === 0) return true;
      return inc.every(c => getDir(c) === 'level');
    };
    
    // First pass: calculate subtree heights (bottom-up)
    const subtreeHeights = new Map<string, number>();
    const calculating = new Set<string>();
    
    const calcSubtreeHeight = (itemId: string): number => {
      if (subtreeHeights.has(itemId)) return subtreeHeights.get(itemId)!;
      if (calculating.has(itemId)) return NODE_HEIGHT; // Cycle
      calculating.add(itemId);
      
      const out = outgoing.get(itemId) || [];
      if (out.length === 0) {
        subtreeHeights.set(itemId, NODE_HEIGHT);
        return NODE_HEIGHT;
      }
      
      // Group by direction
      const up: string[] = [];
      const down: string[] = [];
      const level: string[] = [];
      
      for (const c of out) {
        const d = getDir(c);
        if (d === 'up') up.push(c.toId);
        else if (d === 'down') down.push(c.toId);
        else level.push(c.toId);
      }
      
      // Calculate heights for each group
      const upHeights = up.map(id => calcSubtreeHeight(id));
      const downHeights = down.map(id => calcSubtreeHeight(id));
      const levelHeights = level.map(id => calcSubtreeHeight(id));
      
      // Total height = max of (up total, down total, level total, self)
      const upTotal = upHeights.reduce((a, h) => a + h + V_GAP, -V_GAP);
      const downTotal = downHeights.reduce((a, h) => a + h + V_GAP, -V_GAP);
      const levelTotal = levelHeights.reduce((a, h) => a + h + V_GAP, -V_GAP);
      
      // Also need to span from top of up to bottom of down
      const upAbove = up.length > 0 ? upHeights.reduce((a, h) => a + h + V_GAP, -V_GAP) / 2 : 0;
      const downBelow = down.length > 0 ? downHeights.reduce((a, h) => a + h + V_GAP, -V_GAP) / 2 : 0;
      
      const totalHeight = Math.max(NODE_HEIGHT, upAbove + NODE_HEIGHT / 2 + downBelow, upTotal, downTotal, levelTotal);
      
      subtreeHeights.set(itemId, totalHeight);
      return totalHeight;
    };
    
    // Calculate all subtree heights
    for (const item of items) {
      calcSubtreeHeight(item.id);
    }
    
    // Second pass: position nodes (top-down)
    const visited = new Set<string>();
    const nodePositions: { item: Item; x: number; y: number }[] = [];
    
    const layoutTree = (itemId: string, x: number, yCenter: number) => {
      if (visited.has(itemId)) return;
      visited.add(itemId);
      
      const item = itemMap.get(itemId);
      if (!item) return;
      
      // Position this node centered at yCenter
      const nodeY = yCenter - NODE_HEIGHT / 2;
      nodePositions.push({ item, x, y: nodeY });
      
      const out = outgoing.get(itemId) || [];
      if (out.length === 0) return;
      
      // Group children by direction
      const up: { id: string; height: number }[] = [];
      const down: { id: string; height: number }[] = [];
      const level: { id: string; height: number }[] = [];
      
      for (const c of out) {
        const d = getDir(c);
        const h = subtreeHeights.get(c.toId) || NODE_HEIGHT;
        if (d === 'up') up.push({ id: c.toId, height: h });
        else if (d === 'down') down.push({ id: c.toId, height: h });
        else level.push({ id: c.toId, height: h });
      }
      
      const nextX = x + NODE_WIDTH + H_GAP;
      
      // Layout up children (above current node center)
      if (up.length > 0) {
        const totalUpHeight = up.reduce((a, c) => a + c.height + V_GAP, -V_GAP);
        let uy = yCenter - NODE_HEIGHT / 2 - V_GAP - up[0].height / 2;
        // Adjust to center the group above
        uy = yCenter - NODE_HEIGHT - V_GAP - totalUpHeight / 2 + up[0].height / 2;
        
        for (const child of up) {
          layoutTree(child.id, nextX, uy);
          uy += child.height + V_GAP;
        }
      }
      
      // Layout down children (below current node center)
      if (down.length > 0) {
        const totalDownHeight = down.reduce((a, c) => a + c.height + V_GAP, -V_GAP);
        let dy = yCenter + NODE_HEIGHT / 2 + V_GAP + down[0].height / 2;
        // Adjust to center the group below
        dy = yCenter + NODE_HEIGHT + V_GAP + totalDownHeight / 2 - down[0].height / 2;
        
        for (const child of down) {
          layoutTree(child.id, nextX, dy);
          dy += child.height + V_GAP;
        }
      }
      
      // Layout level children (same level)
      if (level.length > 0) {
        let ly = yCenter;
        for (let i = 0; i < level.length; i++) {
          layoutTree(level[i].id, nextX, ly);
          ly += level[i].height + V_GAP;
        }
      }
    };
    
    // Layout starting nodes as rows with proper spacing
    let currentY = 30;
    const starts = items.filter(i => isStart(i.id));
    
    for (const s of starts) {
      if (visited.has(s.id)) continue;
      const height = subtreeHeights.get(s.id) || NODE_HEIGHT;
      layoutTree(s.id, 20, currentY + height / 2);
      currentY += height + V_GAP * 2;
    }
    
    // Orphans
    for (const item of items) {
      if (!visited.has(item.id)) {
        nodePositions.push({ item, x: 20, y: currentY });
        currentY += NODE_HEIGHT + V_GAP * 2;
      }
    }
    
    // Build edges
    const posMap = new Map(nodePositions.map(n => [n.item.id, n]));
    const edges: { x1: number; y1: number; x2: number; y2: number; conn: Connection }[] = [];
    
    for (const conn of connections) {
      const from = posMap.get(conn.fromId);
      const to = posMap.get(conn.toId);
      if (!from || !to) continue;
      
      edges.push({
        x1: from.x + NODE_WIDTH,
        y1: from.y + NODE_HEIGHT / 2,
        x2: to.x,
        y2: to.y + NODE_HEIGHT / 2,
        conn,
      });
    }
    
    return { nodes: nodePositions, edges };
  }, [items, connections]);
  
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setScale((s) => Math.max(0.25, Math.min(2, s * delta)));
  };
  
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setOffset({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
  };
  
  const handleMouseUp = () => setIsDragging(false);
  
  const resetView = () => {
    setScale(1);
    setOffset({ x: 20, y: 20 });
  };
  
  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Add items to see the graph
      </div>
    );
  }
  
  return (
    <div className="relative h-full w-full overflow-hidden bg-muted/30 rounded-lg">
      {/* Controls */}
      <div className="absolute top-2 right-2 z-10 flex gap-1">
        <Button variant="outline" size="sm" onClick={() => setScale((s) => Math.min(2, s * 1.2))}>
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={() => setScale((s) => Math.max(0.25, s * 0.8))}>
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={resetView}>
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Graph */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <svg
          width="100%"
          height="100%"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {/* Edges - straight lines */}
          {edges.map((edge) => {
            const isSelected = selectedItemId === edge.conn.fromId || selectedItemId === edge.conn.toId;
            const color = 
              edge.conn.type === 'solves' ? '#16a34a' :
              edge.conn.type === 'iterates' ? '#9333ea' :
              edge.conn.type === 'breaks-down' ? '#ea580c' :
              edge.conn.type === 'causes' ? '#dc2626' : '#6b7280';
            
            return (
              <g key={edge.conn.id}>
                <line
                  x1={edge.x1}
                  y1={edge.y1}
                  x2={edge.x2}
                  y2={edge.y2}
                  stroke={isSelected ? '#3b82f6' : color}
                  strokeWidth={isSelected ? 2 : 1.5}
                  strokeDasharray={edge.conn.type === 'iterates' ? "4,3" : undefined}
                />
                {/* Arrow at target node */}
                <polygon
                  points={`${edge.x2},${edge.y2} ${edge.x2 - 8},${edge.y2 - 4} ${edge.x2 - 8},${edge.y2 + 4}`}
                  fill={isSelected ? '#3b82f6' : color}
                />
              </g>
            );
          })}
          
          {/* Nodes */}
          {nodes.map((node) => {
            const config = ITEM_TYPE_CONFIG[node.item.type];
            const isSelected = selectedItemId === node.item.id;
            const bgColor = node.item.type === 'problem' ? '#fef2f2' : node.item.type === 'solution' ? '#f0fdf4' : '#faf5ff';
            const borderColor = node.item.type === 'problem' ? '#fca5a5' : node.item.type === 'solution' ? '#86efac' : '#d8b4fe';
            const typeColor = node.item.type === 'problem' ? '#dc2626' : node.item.type === 'solution' ? '#16a34a' : '#9333ea';
            
            return (
              <g
                key={node.item.id}
                onClick={() => onSelectItem(node.item.id)}
                className="cursor-pointer"
              >
                <rect
                  x={node.x}
                  y={node.y}
                  width={NODE_WIDTH}
                  height={NODE_HEIGHT}
                  rx={4}
                  fill={bgColor}
                  stroke={isSelected ? '#3b82f6' : borderColor}
                  strokeWidth={isSelected ? 2 : 1}
                />
                <rect
                  x={node.x}
                  y={node.y}
                  width={22}
                  height={NODE_HEIGHT}
                  rx={4}
                  fill={typeColor}
                />
                <text
                  x={node.x + 11}
                  y={node.y + NODE_HEIGHT / 2 + 4}
                  fontSize="11"
                  fontWeight="bold"
                  fill="white"
                  textAnchor="middle"
                >
                  {config.label[0]}
                </text>
                <text
                  x={node.x + 28}
                  y={node.y + NODE_HEIGHT / 2 + 4}
                  fontSize="11"
                  fill="#1f2937"
                >
                  {node.item.title.length > 12 ? `${node.item.title.slice(0, 12)}…` : node.item.title}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-2 left-2 bg-background/90 rounded-lg p-2 text-xs">
        <div className="flex gap-3">
          <span className="text-green-600">↑ solves/iterates</span>
          <span className="text-orange-600">↓ breaks-down</span>
          <span className="text-gray-500">→ causes/related</span>
        </div>
      </div>
      
      <div className="absolute bottom-2 right-2 text-xs text-muted-foreground flex items-center gap-1">
        <Move className="h-3 w-3" />
        Drag, scroll to zoom
      </div>
    </div>
  );
}
