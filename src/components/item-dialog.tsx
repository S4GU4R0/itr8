"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import type { Item, ItemType, ItemStatus } from "@/lib/types";
import { ITEM_TYPE_CONFIG, STATUS_CONFIG } from "@/lib/types";

interface ItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (item: { type: ItemType; title: string; description: string; status: ItemStatus }) => void;
  editItem?: Item | null;
  preSelectedType?: ItemType | null;
}

export function ItemDialog({ open, onOpenChange, onSave, editItem, preSelectedType }: ItemDialogProps) {
  // Initialize state based on editItem or preSelectedType
  const getInitialState = () => ({
    type: editItem?.type || preSelectedType || "problem" as ItemType,
    title: editItem?.title || "",
    description: editItem?.description || "",
    status: (editItem?.status || "active") as ItemStatus,
  });
  
  const [formState, setFormState] = useState(getInitialState());
  
  // Reset form when dialog opens with new props
  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      // Reset form state when opening
      setFormState(getInitialState());
    }
    onOpenChange(newOpen);
  };
  
  // Get current state - use formState, but prioritize editItem/preSelectedType when dialog first opens
  const type = formState.type;
  const title = formState.title;
  const description = formState.description;
  const status = formState.status;

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({ type, title: title.trim(), description: description.trim(), status });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{editItem ? "Edit Item" : "Add New Item"}</DialogTitle>
          <DialogDescription>
            Create a problem, solution, or iteration to track.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Type</Label>
            <RadioGroup
              value={type}
              onValueChange={(v) => setFormState(s => ({ ...s, type: v as ItemType }))}
              className="flex gap-4"
            >
              {(Object.keys(ITEM_TYPE_CONFIG) as ItemType[]).map((t) => (
                <div key={t} className="flex items-center space-x-2">
                  <RadioGroupItem value={t} id={t} />
                  <Label htmlFor={t} className={`font-normal ${ITEM_TYPE_CONFIG[t].color}`}>
                    {ITEM_TYPE_CONFIG[t].label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter a title..."
              value={title}
              onChange={(e) => setFormState(s => ({ ...s, title: e.target.value }))}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Add details (optional)..."
              value={description}
              onChange={(e) => setFormState(s => ({ ...s, description: e.target.value }))}
              rows={3}
            />
          </div>
          
          <div className="grid gap-2">
            <Label>Status</Label>
            <Select value={status} onValueChange={(v) => setFormState(s => ({ ...s, status: v as ItemStatus }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(STATUS_CONFIG) as ItemStatus[]).map((s) => (
                  <SelectItem key={s} value={s}>
                    {STATUS_CONFIG[s].label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!title.trim()}>
            {editItem ? "Save Changes" : "Add Item"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
