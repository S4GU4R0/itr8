"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  Upload, 
  Trash2, 
  List, 
  GitBranch,
  Share2,
  Copy,
  Check,
  Search,
  Loader2,
  FileText,
  Download
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useStore } from "@/lib/store";
import type { Item, ItemType, ItemStatus, Connection } from "@/lib/types";
import { ITEM_TYPE_CONFIG, STATUS_CONFIG, CONNECTION_TYPE_LABELS } from "@/lib/types";
import { ItemCard } from "@/components/item-card";
import { ItemDetail } from "@/components/item-detail";
import { ConnectionDialog } from "@/components/connection-dialog";
import { GraphView } from "@/components/graph-view";
import { parseInput, applyParsedData, generateText, type ParseResult } from "@/lib/parser";

export default function HomePage() {
  const { toast } = useToast();
  const {
    items,
    connections,
    selectedItemId,
    filterType,
    filterStatus,
    searchQuery,
    viewMode,
    isLoading,
    loadData,
    addItem,
    updateItem,
    deleteItem,
    addConnection,
    setSelectedItem,
    setFilterType,
    setFilterStatus,
    setSearchQuery,
    setViewMode,
    exportData,
    importData,
    clearAllData,
  } = useStore();
  
  // Text input state - this is the main interface
  const [textInput, setTextInput] = useState("");
  
  // Dialog states
  const [connectionDialogOpen, setConnectionDialogOpen] = useState(false);
  const [connectingItem, setConnectingItem] = useState<Item | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  
  // Export states
  const [exportedUrl, setExportedUrl] = useState<string>("");
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Parse text as user types
  const parsed = useMemo(() => parseInput(textInput), [textInput]);
  
  // Load data on mount
  useEffect(() => {
    loadData().then(() => {
      const params = new URLSearchParams(window.location.search);
      const dataParam = params.get("data");
      
      if (dataParam) {
        importData(dataParam).then((result) => {
          if (result.success) {
            toast({
              title: "Data Imported",
              description: `Imported ${result.stats?.items} items and ${result.stats?.connections} connections.`,
            });
            window.history.replaceState({}, "", window.location.pathname);
          } else {
            toast({
              title: "Import Failed",
              description: result.message,
              variant: "destructive",
            });
          }
        });
      }
    });
  }, [loadData, importData, toast]);
  
  // Filter items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (filterType !== "all" && item.type !== filterType) return false;
      if (filterStatus !== "all" && item.status !== filterStatus) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [items, filterType, filterStatus, searchQuery]);
  
  // Selected item
  const selectedItem = useMemo(() => {
    return items.find((i) => i.id === selectedItemId) || null;
  }, [items, selectedItemId]);
  
  // Apply parsed text changes
  const applyChanges = useCallback(async () => {
    if (parsed.items.length === 0) return;
    
    const result = await applyParsedData(parsed, items, addItem, addConnection);
    toast({
      title: "Changes Applied",
      description: `Added ${result.itemsAdded} items and ${result.connectionsAdded} connections.`,
    });
    setTextInput("");
  }, [parsed, items, addItem, addConnection, toast]);
  
  // Handle view mode change - load data when switching to text mode
  const handleViewModeChange = useCallback((newMode: 'text' | 'list' | 'graph') => {
    if (newMode === 'text' && items.length > 0) {
      setTextInput(generateText(items, connections));
    }
    setViewMode(newMode);
  }, [items, connections, setViewMode]);
  
  // Handlers
  const handleDeleteItem = useCallback(async (id: string) => {
    setItemToDelete(id);
    setDeleteConfirmOpen(true);
  }, []);
  
  const confirmDelete = useCallback(async () => {
    if (itemToDelete) {
      await deleteItem(itemToDelete);
      toast({ title: "Item Deleted" });
      setItemToDelete(null);
    }
    setDeleteConfirmOpen(false);
  }, [itemToDelete, deleteItem, toast]);
  
  const handleConnect = useCallback((item: Item) => {
    setConnectingItem(item);
    setConnectionDialogOpen(true);
  }, []);
  
  const handleAddConnection = useCallback(async (data: { fromId: string; toId: string; type: any; note: string }) => {
    await addConnection(data);
    toast({ title: "Connection Added" });
    setConnectingItem(null);
  }, [addConnection, toast]);
  
  const handleExport = useCallback(async () => {
    const encoded = await exportData();
    const url = `${window.location.origin}${window.location.pathname}?data=${encoded}`;
    setExportedUrl(url);
    setExportDialogOpen(true);
  }, [exportData]);
  
  const handleCopyUrl = useCallback(async () => {
    await navigator.clipboard.writeText(exportedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "URL Copied", description: "Share this URL to transfer your data." });
  }, [exportedUrl, toast]);
  
  const handleImportFile = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      const text = await file.text();
      const parsedFile = parseInput(text);
      if (parsedFile.items.length > 0) {
        await applyParsedData(parsedFile, items, addItem, addConnection);
        toast({
          title: "Data Imported",
          description: `Imported ${parsedFile.items.length} items and ${parsedFile.connections.length} connections.`,
        });
      } else {
        const result = await importData(text);
        if (result.success) {
          toast({
            title: "Data Imported",
            description: `Imported ${result.stats?.items} items and ${result.stats?.connections} connections.`,
          });
        } else {
          toast({
            title: "Import Failed",
            description: result.message,
            variant: "destructive",
          });
        }
      }
    } catch {
      toast({
        title: "Import Failed",
        description: "Could not read the file.",
        variant: "destructive",
      });
    }
    
    e.target.value = "";
  }, [importData, toast, items, addItem, addConnection]);
  
  const handleClearAll = useCallback(async () => {
    if (confirm("Are you sure you want to delete all data? This cannot be undone.")) {
      await clearAllData();
      setTextInput("");
      toast({ title: "All Data Cleared" });
    }
  }, [clearAllData, toast]);
  
  const handleNavigateToItem = useCallback((id: string) => {
    setSelectedItem(id);
  }, [setSelectedItem]);
  
  const handleExportText = useCallback(() => {
    const text = generateText(items, connections);
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'itr8-data.txt';
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Exported as Text" });
  }, [items, connections, toast]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold">🔗 ITR8</h1>
              <Tabs value={viewMode} onValueChange={(v) => handleViewModeChange(v as 'text' | 'list' | 'graph')}>
                <TabsList className="h-8">
                  <TabsTrigger value="text" className="px-3 text-xs">
                    <FileText className="h-3.5 w-3.5 mr-1" />
                    Edit
                  </TabsTrigger>
                  <TabsTrigger value="list" className="px-3 text-xs">
                    <List className="h-3.5 w-3.5 mr-1" />
                    List
                  </TabsTrigger>
                  <TabsTrigger value="graph" className="px-3 text-xs">
                    <GitBranch className="h-3.5 w-3.5 mr-1" />
                    Graph
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="flex items-center gap-2">
              {viewMode === 'text' && (
                <Button size="sm" onClick={applyChanges} disabled={parsed.items.length === 0}>
                  Apply Changes ({parsed.items.length} items)
                </Button>
              )}
              
              <Button variant="outline" size="sm" onClick={handleExportText}>
                <Download className="h-4 w-4 mr-1" />
                Export .txt
              </Button>
              
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Share2 className="h-4 w-4 mr-1" />
                Share URL
              </Button>
              
              <label className="cursor-pointer">
                <Button variant="outline" size="sm" asChild>
                  <span>
                    <Upload className="h-4 w-4 mr-1" />
                    Import
                  </span>
                </Button>
                <input
                  type="file"
                  accept=".txt,.json"
                  className="hidden"
                  onChange={handleImportFile}
                />
              </label>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-4">
        {viewMode === 'text' ? (
          /* TEXT EDIT MODE - Primary interface */
          <div className="flex gap-4 h-[calc(100vh-160px)]">
            <div className="flex-1 flex flex-col">
              <div className="text-xs text-muted-foreground mb-2 flex flex-wrap gap-x-4 gap-y-1">
                <span>Items: <code className="bg-muted px-1 rounded">P:</code> <code className="bg-muted px-1 rounded">S:</code> <code className="bg-muted px-1 rounded">I:</code></span>
                <span>Connect: <code className="bg-muted px-1 rounded">--solves--&gt;</code> <code className="bg-muted px-1 rounded">--causes--&gt;</code> <code className="bg-muted px-1 rounded">--iterates--&gt;</code> <code className="bg-muted px-1 rounded">--breaks-down--&gt;</code></span>
                <span>Describe: <code className="bg-muted px-1 rounded">P: Title "description"</code></span>
              </div>
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder={`# Type your items here, like Mermaid syntax:
P: Users can't find checkout
P: Checkout button hidden     # sub-problem
S: Add prominent CTA button "Make it orange"
I: A/B test button colors

Users can't find checkout --breaks-down--> Checkout button hidden
Checkout button hidden --solves--> Add prominent CTA button
Add prominent CTA button --iterates--> A/B test button colors`}
                className="flex-1 w-full p-4 font-mono text-sm border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-background"
              />
              
              {/* Parse errors */}
              {parsed.errors.length > 0 && (
                <div className="mt-2 p-2 rounded bg-destructive/10 text-destructive text-xs">
                  {parsed.errors.map((error, i) => (
                    <div key={i}>{error}</div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Live Preview */}
            <div className="w-72 border rounded-lg p-3 overflow-auto">
              <div className="text-sm font-medium mb-2">Preview</div>
              {parsed.items.length === 0 ? (
                <div className="text-sm text-muted-foreground">Start typing to see a preview...</div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Items ({parsed.items.length})</div>
                    {parsed.items.map((item) => (
                      <div key={item.tempId} className="text-xs py-1 flex items-center gap-1">
                        <span className={ITEM_TYPE_CONFIG[item.type].color}>{item.type.charAt(0).toUpperCase()}:</span>
                        <span className="font-medium">{item.title}</span>
                      </div>
                    ))}
                  </div>
                  {parsed.connections.length > 0 && (
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Connections ({parsed.connections.length})</div>
                      {parsed.connections.map((conn, i) => (
                        <div key={i} className="text-xs py-1">
                          <span className="font-medium">{conn.fromTitle}</span>
                          <span className={CONNECTION_TYPE_LABELS[conn.type].color}> --{conn.type}--&gt; </span>
                          <span className="font-medium">{conn.toTitle}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* LIST / GRAPH MODES */
          <div className="flex gap-4 h-[calc(100vh-160px)]">
            <div className={`${selectedItem ? 'w-1/2' : 'w-full'} flex flex-col transition-all duration-300`}>
              {/* Toolbar */}
              <div className="flex items-center gap-2 mb-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                
                <Select value={filterType} onValueChange={(v) => setFilterType(v as ItemType | 'all')}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {Object.keys(ITEM_TYPE_CONFIG).map((type) => (
                      <SelectItem key={type} value={type}>
                        {ITEM_TYPE_CONFIG[type as ItemType].label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v as ItemStatus | 'all')}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    {Object.keys(STATUS_CONFIG).map((status) => (
                      <SelectItem key={status} value={status}>
                        {STATUS_CONFIG[status as ItemStatus].label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Content */}
              {viewMode === 'list' ? (
                <ScrollArea className="flex-1 -mx-4 px-4">
                  {filteredItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                      {items.length === 0 ? (
                        <>
                          <p className="text-lg font-medium mb-2">No items yet</p>
                          <p className="text-sm mb-4">Switch to "Edit" mode to add items by typing.</p>
                          <Button variant="outline" onClick={() => setViewMode('text')}>
                            <FileText className="h-4 w-4 mr-2" />
                            Switch to Edit Mode
                          </Button>
                        </>
                      ) : (
                        <>
                          <p className="text-lg font-medium mb-2">No matching items</p>
                          <p className="text-sm">Try adjusting your filters or search query.</p>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="grid gap-3">
                      {filteredItems.map((item) => (
                        <ItemCard
                          key={item.id}
                          item={item}
                          connections={connections}
                          allItems={items}
                          onEdit={() => {}} // No edit dialog - use text mode
                          onDelete={handleDeleteItem}
                          onConnect={handleConnect}
                          onSelect={setSelectedItem}
                          isSelected={selectedItemId === item.id}
                        />
                      ))}
                    </div>
                  )}
                </ScrollArea>
              ) : (
                <GraphView
                  items={filteredItems}
                  connections={connections}
                  selectedItemId={selectedItemId}
                  onSelectItem={setSelectedItem}
                />
              )}
            </div>
            
            {/* Right Panel - Item Detail */}
            {selectedItem && (
              <div className="w-1/2">
                <ItemDetail
                  item={selectedItem}
                  connections={connections}
                  allItems={items}
                  onEdit={() => {}} // No edit dialog - use text mode
                  onDelete={handleDeleteItem}
                  onConnect={handleConnect}
                  onSelectItem={setSelectedItem}
                  onNavigateToItem={handleNavigateToItem}
                />
              </div>
            )}
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="border-t bg-muted/30 mt-auto">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {items.length} items • {connections.length} connections
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs text-muted-foreground hover:text-destructive"
              onClick={handleClearAll}
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Clear All
            </Button>
            <span>Works offline • Data stored locally</span>
            <a
              className="text-xs text-muted-foreground hover:text-primary"
              href="/itr8/llm.txt"
              target="_blank"
              rel="noreferrer"
            >
              llm.txt
            </a>
            <a
              className="text-xs text-muted-foreground hover:text-primary"
              href="https://ring.0data.app/#random"
              target="_blank"
              rel="noreferrer"
            >
              Part of the Doorless App Ring
            </a>
          </div>
        </div>
      </footer>
      
      {/* Dialogs */}
      <ConnectionDialog
        open={connectionDialogOpen}
        onOpenChange={(open) => {
          setConnectionDialogOpen(open);
          if (!open) setConnectingItem(null);
        }}
        sourceItem={connectingItem}
        allItems={items}
        existingConnections={connections}
        onSave={handleAddConnection}
      />
      
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this item? All connections involving this item will also be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <AlertDialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Share Data</AlertDialogTitle>
            <AlertDialogDescription>
              Copy this URL to share your data. Anyone with this URL can import your items and connections.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex items-center gap-2">
            <Input
              value={exportedUrl}
              readOnly
              className="text-xs"
            />
            <Button onClick={handleCopyUrl} size="sm">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Done</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
