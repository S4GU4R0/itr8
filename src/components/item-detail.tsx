"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  AlertCircle, 
  Lightbulb, 
  GitBranch, 
  Pencil, 
  Trash2, 
  Link2,
  ArrowRight,
  ArrowLeft,
  X,
  ExternalLink
} from "lucide-react";
import type { Item, Connection } from "@/lib/types";
import { ITEM_TYPE_CONFIG, STATUS_CONFIG, CONNECTION_TYPE_LABELS } from "@/lib/types";

interface ItemDetailProps {
  item: Item;
  connections: Connection[];
  allItems: Item[];
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
  onConnect: (item: Item) => void;
  onSelectItem: (id: string | null) => void;
  onNavigateToItem: (id: string) => void;
}

const iconMap = {
  AlertCircle,
  Lightbulb,
  GitBranch,
};

export function ItemDetail({
  item,
  connections,
  allItems,
  onEdit,
  onDelete,
  onConnect,
  onSelectItem,
  onNavigateToItem,
}: ItemDetailProps) {
  const config = ITEM_TYPE_CONFIG[item.type];
  const Icon = iconMap[config.icon as keyof typeof iconMap];
  
  const { outgoing, incoming } = useMemo(() => {
    const outgoing = connections.filter((c) => c.fromId === item.id);
    const incoming = connections.filter((c) => c.toId === item.id);
    return { outgoing, incoming };
  }, [connections, item.id]);
  
  const getItemById = (id: string) => allItems.find((i) => i.id === id);
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Icon className={`h-5 w-5 ${config.color}`} />
            <CardTitle className="text-lg">{item.title}</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => onSelectItem(null)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Badge className={config.bgColor}>{config.label}</Badge>
          <Badge className={STATUS_CONFIG[item.status].color}>
            {STATUS_CONFIG[item.status].label}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <ScrollArea className="h-[calc(100vh-280px)]">
          {item.description && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Description</h4>
              <p className="text-sm">{item.description}</p>
            </div>
          )}
          
          <div className="flex gap-2 mb-4">
            <Button variant="outline" size="sm" onClick={() => onEdit(item)}>
              <Pencil className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button variant="outline" size="sm" onClick={() => onConnect(item)}>
              <Link2 className="h-4 w-4 mr-1" />
              Connect
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700"
              onClick={() => onDelete(item.id)}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
          
          <Separator className="my-4" />
          
          {/* Outgoing connections */}
          {outgoing.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
                <ArrowRight className="h-4 w-4" />
                Connects To ({outgoing.length})
              </h4>
              <div className="space-y-2">
                {outgoing.map((conn) => {
                  const target = getItemById(conn.toId);
                  if (!target) return null;
                  const targetConfig = ITEM_TYPE_CONFIG[target.type];
                  return (
                    <div
                      key={conn.id}
                      className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm ${CONNECTION_TYPE_LABELS[conn.type].color}`}>
                            {CONNECTION_TYPE_LABELS[conn.type].label}
                          </span>
                          <span className="text-sm font-medium">{target.title}</span>
                        </div>
                        {conn.note && (
                          <p className="text-xs text-muted-foreground mt-0.5">{conn.note}</p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() => onNavigateToItem(target.id)}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* Incoming connections */}
          {incoming.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                Connected From ({incoming.length})
              </h4>
              <div className="space-y-2">
                {incoming.map((conn) => {
                  const source = getItemById(conn.fromId);
                  if (!source) return null;
                  const sourceConfig = ITEM_TYPE_CONFIG[source.type];
                  return (
                    <div
                      key={conn.id}
                      className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{source.title}</span>
                          <span className={`text-sm ${CONNECTION_TYPE_LABELS[conn.type].color}`}>
                            → {CONNECTION_TYPE_LABELS[conn.type].label}
                          </span>
                        </div>
                        {conn.note && (
                          <p className="text-xs text-muted-foreground mt-0.5">{conn.note}</p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() => onNavigateToItem(source.id)}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {outgoing.length === 0 && incoming.length === 0 && (
            <div className="text-center py-4 text-muted-foreground text-sm">
              No connections yet. Click "Connect" to add one.
            </div>
          )}
          
          <div className="text-xs text-muted-foreground mt-4">
            <p>Created: {new Date(item.createdAt).toLocaleDateString()}</p>
            <p>Updated: {new Date(item.updatedAt).toLocaleDateString()}</p>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
