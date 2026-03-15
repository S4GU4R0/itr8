"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  AlertCircle, 
  Lightbulb, 
  GitBranch, 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  Link2,
  ExternalLink,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import type { Item, Connection } from "@/lib/types";
import { ITEM_TYPE_CONFIG, STATUS_CONFIG, CONNECTION_TYPE_LABELS } from "@/lib/types";

interface ItemCardProps {
  item: Item;
  connections: Connection[];
  allItems: Item[];
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
  onConnect: (item: Item) => void;
  onSelect: (id: string) => void;
  isSelected: boolean;
}

const iconMap = {
  AlertCircle,
  Lightbulb,
  GitBranch,
};

export function ItemCard({ 
  item, 
  connections, 
  allItems, 
  onEdit, 
  onDelete, 
  onConnect,
  onSelect,
  isSelected 
}: ItemCardProps) {
  const config = ITEM_TYPE_CONFIG[item.type];
  const Icon = iconMap[config.icon as keyof typeof iconMap];
  
  const { outgoing, incoming } = useMemo(() => {
    const outgoing = connections.filter((c) => c.fromId === item.id);
    const incoming = connections.filter((c) => c.toId === item.id);
    return { outgoing, incoming };
  }, [connections, item.id]);
  
  const getItemById = (id: string) => allItems.find((i) => i.id === id);
  
  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${isSelected ? 'ring-2 ring-primary' : ''} ${config.bgColor}`}
      onClick={() => onSelect(item.id)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Icon className={`h-5 w-5 ${config.color}`} />
            <CardTitle className="text-base font-semibold line-clamp-1">
              {item.title}
            </CardTitle>
          </div>
          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(item)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onConnect(item)}>
                  <Link2 className="mr-2 h-4 w-4" />
                  Add Connection
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => onDelete(item.id)}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {item.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {item.description}
          </p>
        )}
        
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="secondary" className={STATUS_CONFIG[item.status].color}>
            {STATUS_CONFIG[item.status].label}
          </Badge>
          
          {(outgoing.length > 0 || incoming.length > 0) && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="text-xs">
                    <Link2 className="h-3 w-3 mr-1" />
                    {outgoing.length + incoming.length}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <div className="space-y-1 text-xs">
                    {outgoing.map((conn) => {
                      const target = getItemById(conn.toId);
                      return target ? (
                        <div key={conn.id} className="flex items-center gap-1">
                          <ArrowRight className="h-3 w-3" />
                          <span className={CONNECTION_TYPE_LABELS[conn.type].color}>
                            {CONNECTION_TYPE_LABELS[conn.type].label}
                          </span>
                          <span className="truncate">{target.title}</span>
                        </div>
                      ) : null;
                    })}
                    {incoming.map((conn) => {
                      const source = getItemById(conn.fromId);
                      return source ? (
                        <div key={conn.id} className="flex items-center gap-1">
                          <ArrowLeft className="h-3 w-3" />
                          <span className="truncate">{source.title}</span>
                          <span className={CONNECTION_TYPE_LABELS[conn.type].color}>
                            → {CONNECTION_TYPE_LABELS[conn.type].label}
                          </span>
                        </div>
                      ) : null;
                    })}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        
        {/* Connection chips */}
        {(outgoing.length > 0 || incoming.length > 0) && (
          <div className="mt-2 pt-2 border-t border-border/50">
            <div className="flex flex-wrap gap-1">
              {outgoing.map((conn) => {
                const target = getItemById(conn.toId);
                if (!target) return null;
                const targetConfig = ITEM_TYPE_CONFIG[target.type];
                return (
                  <TooltipProvider key={conn.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          className="inline-flex items-center text-xs px-1.5 py-0.5 rounded bg-muted hover:bg-muted/80 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelect(target.id);
                          }}
                        >
                          <ArrowRight className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span className={CONNECTION_TYPE_LABELS[conn.type].color}>
                            {CONNECTION_TYPE_LABELS[conn.type].label.toLowerCase()}
                          </span>
                          <ExternalLink className="h-3 w-3 ml-1 text-muted-foreground" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <span className={targetConfig.color}>{target.title}</span>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              })}
              {incoming.map((conn) => {
                const source = getItemById(conn.fromId);
                if (!source) return null;
                const sourceConfig = ITEM_TYPE_CONFIG[source.type];
                return (
                  <TooltipProvider key={conn.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          className="inline-flex items-center text-xs px-1.5 py-0.5 rounded bg-muted hover:bg-muted/80 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelect(source.id);
                          }}
                        >
                          <ArrowLeft className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span className={CONNECTION_TYPE_LABELS[conn.type].color}>
                            {CONNECTION_TYPE_LABELS[conn.type].label.toLowerCase()}
                          </span>
                          <span className="text-muted-foreground">from</span>
                          <ExternalLink className="h-3 w-3 ml-1 text-muted-foreground" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <span className={sourceConfig.color}>{source.title}</span>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
