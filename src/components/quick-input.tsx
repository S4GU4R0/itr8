"use client";

import { useState, useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  AlertCircle, 
  Lightbulb, 
  GitBranch, 
  ArrowRight,
  Play,
  FileText,
  HelpCircle
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { parseInput, type ParseResult } from "@/lib/parser";
import { CONNECTION_TYPE_LABELS } from "@/lib/types";

interface QuickInputProps {
  onApply: (parsed: ParseResult) => Promise<void>;
  existingItemsCount: number;
}

export function QuickInput({ onApply, existingItemsCount }: QuickInputProps) {
  const [text, setText] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  
  const parsed = useMemo(() => parseInput(text), [text]);
  
  const handleApply = useCallback(async () => {
    if (parsed.items.length === 0 && parsed.connections.length === 0) return;
    
    setIsApplying(true);
    try {
      await onApply(parsed);
      setText("");
    } finally {
      setIsApplying(false);
    }
  }, [parsed, onApply]);
  
  const exampleText = `# Example syntax:
P: Slow website loading
S: Optimize images "Reduce file sizes"
I: Compress PNGs v1

Slow website loading --solves--> Optimize images
Optimize images --iterates--> Compress PNGs v1`;

  return (
    <div className="flex gap-4 h-full">
      {/* Input Panel */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Quick Input</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <HelpCircle className="h-3 w-3 text-muted-foreground" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  <div className="text-xs space-y-1">
                    <p><strong>P:</strong> Problem, <strong>S:</strong> Solution, <strong>I:</strong> Iteration</p>
                    <p>Add description in quotes: <code>S: Title &quot;description&quot;</code></p>
                    <p><strong>Connections:</strong></p>
                    <p className="font-mono text-[10px]">{`Title --solves--> Target`}</p>
                    <p className="font-mono text-[10px]">{`Title --causes--> Target`}</p>
                    <p className="font-mono text-[10px]">{`Title --iterates--> Target`}</p>
                    <p className="font-mono text-[10px]">{`Title --breaks-down--> Target`}</p>
                    <p className="font-mono text-[10px]">{`Title --> Target (related)`}</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs"
              onClick={() => setText(exampleText)}
            >
              Load Example
            </Button>
            <Button
              size="sm"
              onClick={handleApply}
              disabled={parsed.items.length === 0 || isApplying}
            >
              <Play className="h-3 w-3 mr-1" />
              Apply ({parsed.items.length})
            </Button>
          </div>
        </div>
        
        <Textarea
          placeholder="Type items and connections..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 font-mono text-sm min-h-[200px] resize-none"
        />
        
        {/* Errors */}
        {parsed.errors.length > 0 && (
          <div className="mt-2 p-2 rounded bg-destructive/10 text-destructive text-xs">
            {parsed.errors.map((error, i) => (
              <div key={i}>{error}</div>
            ))}
          </div>
        )}
      </div>
      
      {/* Preview Panel */}
      <Card className="w-80 flex flex-col">
        <CardHeader className="py-2 px-3">
          <CardTitle className="text-sm">Preview</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <ScrollArea className="h-[calc(100vh-280px)]">
            <div className="p-3 pt-0">
              {parsed.items.length === 0 && parsed.connections.length === 0 ? (
                <div className="text-sm text-muted-foreground text-center py-8">
                  Start typing to see a preview
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Items */}
                  {parsed.items.length > 0 && (
                    <div>
                      <div className="text-xs font-medium text-muted-foreground mb-1">
                        Items ({parsed.items.length})
                      </div>
                      <div className="space-y-1">
                        {parsed.items.map((item) => {
                          const iconMap = {
                            problem: AlertCircle,
                            solution: Lightbulb,
                            iteration: GitBranch,
                          };
                          const colorMap = {
                            problem: 'text-red-600',
                            solution: 'text-green-600',
                            iteration: 'text-purple-600',
                          };
                          const Icon = iconMap[item.type];
                          return (
                            <div
                              key={item.tempId}
                              className="flex items-center gap-2 text-xs p-1.5 rounded bg-muted/50"
                            >
                              <Icon className={`h-3 w-3 ${colorMap[item.type]}`} />
                              <span className="font-medium">{item.title}</span>
                              {item.description && (
                                <span className="text-muted-foreground truncate">
                                  "{item.description}"
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  
                  {/* Connections */}
                  {parsed.connections.length > 0 && (
                    <div>
                      <div className="text-xs font-medium text-muted-foreground mb-1">
                        Connections ({parsed.connections.length})
                      </div>
                      <div className="space-y-1">
                        {parsed.connections.map((conn, i) => (
                          <div
                            key={i}
                            className="text-xs p-1.5 rounded bg-muted/50"
                          >
                            <div className="flex items-center gap-1 flex-wrap">
                              <span className="font-medium truncate max-w-[80px]">
                                {conn.fromTitle}
                              </span>
                              <ArrowRight className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                              <span className={CONNECTION_TYPE_LABELS[conn.type].color}>
                                {conn.type}
                              </span>
                              <ArrowRight className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                              <span className="font-medium truncate max-w-[80px]">
                                {conn.toTitle}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
