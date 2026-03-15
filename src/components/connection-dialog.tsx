"use client";

import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import type { Item, Connection, ConnectionType } from "@/lib/types";
import { ITEM_TYPE_CONFIG, CONNECTION_TYPE_LABELS } from "@/lib/types";

interface ConnectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sourceItem: Item | null;
  allItems: Item[];
  existingConnections: Connection[];
  onSave: (connection: { fromId: string; toId: string; type: ConnectionType; note: string }) => void;
}

export function ConnectionDialog({
  open,
  onOpenChange,
  sourceItem,
  allItems,
  existingConnections,
  onSave,
}: ConnectionDialogProps) {
  const [targetId, setTargetId] = useState<string>("");
  const [connectionType, setConnectionType] = useState<ConnectionType>("related");
  const [note, setNote] = useState("");
  
  // Filter out the source item and already connected items
  const availableTargets = useMemo(() => {
    if (!sourceItem) return [];
    const connectedIds = new Set(
      existingConnections
        .filter((c) => c.fromId === sourceItem.id)
        .map((c) => c.toId)
    );
    return allItems.filter((item) => item.id !== sourceItem.id && !connectedIds.has(item.id));
  }, [sourceItem, allItems, existingConnections]);
  
  const handleSave = () => {
    if (!sourceItem || !targetId) return;
    onSave({
      fromId: sourceItem.id,
      toId: targetId,
      type: connectionType,
      note: note.trim(),
    });
    // Reset form
    setTargetId("");
    setConnectionType("related");
    setNote("");
    onOpenChange(false);
  };
  
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setTargetId("");
      setConnectionType("related");
      setNote("");
    }
    onOpenChange(newOpen);
  };
  
  const getSelectedItem = () => availableTargets.find((i) => i.id === targetId);
  
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Connection</DialogTitle>
          <DialogDescription>
            Connect "{sourceItem?.title}" to another item.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {/* Show source item */}
          <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
            <span className="text-sm text-muted-foreground">From:</span>
            <span className={`font-medium ${ITEM_TYPE_CONFIG[sourceItem?.type || 'problem'].color}`}>
              {sourceItem?.title}
            </span>
          </div>
          
          {/* Connection type */}
          <div className="grid gap-2">
            <Label>Connection Type</Label>
            <RadioGroup
              value={connectionType}
              onValueChange={(v) => setConnectionType(v as ConnectionType)}
              className="grid grid-cols-2 gap-2"
            >
              {(Object.keys(CONNECTION_TYPE_LABELS) as ConnectionType[]).map((t) => (
                <div key={t} className="flex items-center space-x-2">
                  <RadioGroupItem value={t} id={`conn-${t}`} />
                  <Label htmlFor={`conn-${t}`} className={`font-normal ${CONNECTION_TYPE_LABELS[t].color}`}>
                    {CONNECTION_TYPE_LABELS[t].label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <p className="text-xs text-muted-foreground">
              {CONNECTION_TYPE_LABELS[connectionType].description}
            </p>
          </div>
          
          {/* Target selector */}
          <div className="grid gap-2">
            <Label>Connect To</Label>
            <Select value={targetId} onValueChange={setTargetId}>
              <SelectTrigger>
                <SelectValue placeholder="Select an item..." />
              </SelectTrigger>
              <SelectContent>
                {availableTargets.length === 0 ? (
                  <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                    No items available to connect
                  </div>
                ) : (
                  availableTargets.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      <span className={ITEM_TYPE_CONFIG[item.type].color}>
                        {ITEM_TYPE_CONFIG[item.type].label}:
                      </span>{" "}
                      {item.title}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          
          {/* Show selected target */}
          {targetId && (
            <Card className="p-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">To:</span>
                <span className={`font-medium ${ITEM_TYPE_CONFIG[getSelectedItem()?.type || 'problem'].color}`}>
                  {getSelectedItem()?.title}
                </span>
              </div>
              {getSelectedItem()?.description && (
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {getSelectedItem()?.description}
                </p>
              )}
            </Card>
          )}
          
          {/* Note */}
          <div className="grid gap-2">
            <Label htmlFor="note">Note (optional)</Label>
            <Textarea
              id="note"
              placeholder="Add context about this connection..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!targetId}>
            Add Connection
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
