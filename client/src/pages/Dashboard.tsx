import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Item } from "@shared/schema";
import { FoodItemCard } from "@/components/FoodItemCard";
import { AddItemDialog } from "@/components/AddItemDialog";
import { EditItemDialog } from "@/components/EditItemDialog";
import { BarcodeScannerDialog } from "@/components/BarcodeScannerDialog";
import { FilterBar } from "@/components/FilterBar";
import { EmptyState } from "@/components/EmptyState";
import { LoadingState } from "@/components/LoadingState";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus, Camera, Apple, LogOut } from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import { isUnauthorizedError } from "@/lib/authUtils";

export default function Dashboard() {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"expiration" | "name" | "category">("expiration");
  const [scannedProduct, setScannedProduct] = useState<{ name?: string; barcode?: string; imageUrl?: string } | null>(null);
  
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/auth/google";
      }, 500);
    }
  }, [isAuthenticated, authLoading, toast]);

  const { data: items = [], isLoading } = useQuery<Item[]>({
    queryKey: ["/api/items"],
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/items", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/items"] });
      setAddDialogOpen(false);
      toast({
        title: "Success",
        description: "Item added successfully",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error as Error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/auth/google";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to add item",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      apiRequest("PATCH", `/api/items/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/items"] });
      setEditDialogOpen(false);
      setSelectedItem(null);
      toast({
        title: "Success",
        description: "Item updated successfully",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error as Error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/auth/google";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to update item",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/items/${id}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/items"] });
      toast({
        title: "Success",
        description: "Item deleted successfully",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error as Error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/auth/google";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive",
      });
    },
  });

  const handleEdit = (item: Item) => {
    setSelectedItem(item);
    setEditDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleScanSuccess = async (barcode: string) => {
    try {
      const response = await fetch(`/api/barcode/${barcode}`);
      const data = await response.json();
      
      if (data.success && data.product) {
        setScannedProduct({
          name: data.product.name,
          barcode: data.product.barcode,
          imageUrl: data.product.imageUrl,
        });
        toast({
          title: "Product Found",
          description: `${data.product.name}`,
        });
      } else {
        setScannedProduct({ barcode });
        toast({
          title: "Barcode Scanned",
          description: data.message || `Barcode: ${barcode}`,
        });
      }
      setAddDialogOpen(true);
    } catch (error) {
      setScannedProduct({ barcode });
      toast({
        title: "Barcode Scanned",
        description: `Barcode: ${barcode}`,
      });
      setAddDialogOpen(true);
    }
  };

  const filteredItems = items.filter((item) =>
    selectedCategory ? item.category === selectedCategory : true
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case "expiration":
        return new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime();
      case "name":
        return a.name.localeCompare(b.name);
      case "category":
        return a.category.localeCompare(b.category);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 bg-card border-b border-card-border shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Apple className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-bold text-foreground" data-testid="text-app-title">
                FreshGuard
              </h1>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Track your food and reduce waste
            </p>
          </div>
          <Button variant="outline" size="sm" asChild data-testid="button-logout">
            <a href="/api/auth/logout">
              <LogOut className="h-4 w-4 mr-2" />
              Log Out
            </a>
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 pb-24">
        {isLoading ? (
          <LoadingState />
        ) : items.length === 0 ? (
          <EmptyState onAddItem={() => setAddDialogOpen(true)} />
        ) : (
          <div className="space-y-6">
            <FilterBar
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />

            {sortedItems.length === 0 ? (
              <div className="text-center py-12" data-testid="no-results">
                <p className="text-muted-foreground">No items match your filters</p>
                <Button
                  variant="outline"
                  onClick={() => setSelectedCategory(null)}
                  className="mt-4"
                  data-testid="button-clear-filters"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid gap-4" data-testid="items-grid">
                {sortedItems.map((item) => (
                  <FoodItemCard
                    key={item.id}
                    item={item}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-30">
        <Button
          size="icon"
          variant="secondary"
          className="w-14 h-14 rounded-full shadow-lg"
          onClick={() => setAddDialogOpen(true)}
          data-testid="button-add-item-fab"
          aria-label="Add item"
        >
          <Plus className="w-6 h-6" />
        </Button>
        <Button
          size="icon"
          className="w-16 h-16 rounded-full shadow-xl"
          onClick={() => setScannerOpen(true)}
          data-testid="button-scan-barcode-fab"
          aria-label="Scan barcode"
        >
          <Camera className="w-7 h-7" />
        </Button>
      </div>

      <AddItemDialog
        open={addDialogOpen}
        onOpenChange={(open) => {
          setAddDialogOpen(open);
          if (!open) {
            setScannedProduct(null);
          }
        }}
        onSubmit={(data) => createMutation.mutate(data)}
        isPending={createMutation.isPending}
        initialValues={scannedProduct || undefined}
      />

      <EditItemDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        item={selectedItem}
        onSubmit={(id, data) => updateMutation.mutate({ id, data })}
        isPending={updateMutation.isPending}
      />

      <BarcodeScannerDialog
        open={scannerOpen}
        onOpenChange={setScannerOpen}
        onScanSuccess={handleScanSuccess}
      />
    </div>
  );
}
