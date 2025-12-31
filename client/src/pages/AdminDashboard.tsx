import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { AdminMarketTable } from "@/components/AdminMarketTable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Package, TrendingUp, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import adminAvatar from "@assets/generated_images/Admin_officer_portrait_8dcbd10c.png";

export default function AdminDashboard() {
  const { toast } = useToast();
  const qc = useQueryClient();

  const itemsQuery = useQuery<{ id: string; name: string; category: string; price: number; region: string; lastUpdated: string }[]>({
    queryKey: ["/api", "market", "items"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/market/items");
      return await res.json();
    }
  });

  const marketItems = itemsQuery.data ?? [];

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [form, setForm] = useState({ name: "", category: "", price: "", region: "" });

  const createMutation = useMutation({
    mutationFn: async (input: { name: string; category: string; price: number; region: string }) => {
      const res = await apiRequest("POST", "/api/market/items", input);
      return await res.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["/api", "market", "items"] }),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, price }: { id: string; price: number }) => {
      const res = await apiRequest("PUT", `/api/market/items/${id}`, { price });
      return await res.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["/api", "market", "items"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("DELETE", `/api/market/items/${id}`);
      return await res.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["/api", "market", "items"] }),
  });

  const handleAdd = async () => {
    const name = form.name.trim();
    const category = form.category.trim();
    const region = form.region.trim();
    const priceNum = Number(form.price);
    if (!name || !category || !region || !priceNum) {
      toast({ title: "Missing fields", description: "Please fill all fields with valid values." });
      return;
    }
    await createMutation.mutateAsync({ name, category, price: priceNum, region });
    setIsAddOpen(false);
    setForm({ name: "", category: "", price: "", region: "" });
    toast({ title: "Item added", description: `${name} has been added.` });
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id, { onSuccess: () => toast({ title: "Item deleted" }) });
  };

  const handleEdit = (id: string) => {
    const current = marketItems.find((i) => i.id === id);
    if (!current) return;
    const newPriceStr = window.prompt(`Set new price for ${current.name} (₨)`, String(current.price));
    if (!newPriceStr) return;
    const newPrice = Number(newPriceStr);
    if (Number.isNaN(newPrice) || newPrice <= 0) {
      toast({ title: "Invalid price", description: "Please enter a valid number." });
      return;
    }
    updateMutation.mutate({ id, price: newPrice }, { onSuccess: () => toast({ title: "Price updated", description: `${current.name} set to ₨${newPrice}` }) });
  };

  const avgPrice = marketItems.length ? Math.round(marketItems.reduce((sum, item) => sum + item.price, 0) / marketItems.length) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navigation userRole="admin" userName="Ali Hassan" userAvatar={adminAvatar} />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Manage market data and track platform statistics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="overflow-visible" data-testid="card-admin-stat-items">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Total Entries</h3>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{marketItems.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Market items</p>
            </CardContent>
          </Card>

          <Card className="overflow-visible" data-testid="card-admin-stat-avg">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Average Price</h3>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">₨{avgPrice}</p>
              <p className="text-xs text-muted-foreground mt-1">Per kg across all items</p>
            </CardContent>
          </Card>

          <Card className="overflow-visible" data-testid="card-admin-stat-update">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Last Update</h3>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">1h</p>
              <p className="text-xs text-muted-foreground mt-1">Ago</p>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Market Data Management</h2>
          <UploadCsv />
          <AdminMarketTable
            items={marketItems}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAdd={() => setIsAddOpen(true)}
          />
        </div>
      </div>
      <AddItemDialog open={isAddOpen} onOpenChange={setIsAddOpen} form={form} setForm={setForm} onSubmit={handleAdd} />
    </div>
  );
}

// Add dialog at end of component file
export function AddItemDialog({ open, onOpenChange, form, setForm, onSubmit }: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  form: { name: string; category: string; price: string; region: string };
  setForm: React.Dispatch<React.SetStateAction<{ name: string; category: string; price: string; region: string }>>;
  onSubmit: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Market Item</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input id="category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price (₨)</Label>
            <Input id="price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="region">Region</Label>
            <Input id="region" value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onSubmit}>Add Item</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function UploadCsv() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const bulkMutation = useMutation({
    mutationFn: async (payload: { csv: string }) => {
      const res = await apiRequest("POST", "/api/market/bulk", payload);
      return await res.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["/api", "market", "items"] }),
  });

  const onFile = async (file?: File) => {
    if (!file) return;
    const text = await file.text();
    const { added } = await bulkMutation.mutateAsync({ csv: text });
    toast({ title: "Upload complete", description: `Added ${added} items` });
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <h3 className="text-sm font-medium text-muted-foreground">Bulk Upload Daily Rates</h3>
      </CardHeader>
      <CardContent className="flex items-center gap-3">
        <Input type="file" accept=".csv" onChange={(e) => onFile(e.target.files?.[0] || undefined)} />
        <div className="text-xs text-muted-foreground">CSV header: Name,Category,Price,Region</div>
      </CardContent>
    </Card>
  );
}

