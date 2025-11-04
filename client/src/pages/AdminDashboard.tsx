import { Navigation } from "@/components/Navigation";
import { AdminMarketTable } from "@/components/AdminMarketTable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Package, TrendingUp, Clock } from "lucide-react";
import adminAvatar from "@assets/generated_images/Admin_officer_portrait_8dcbd10c.png";

export default function AdminDashboard() {
  const marketItems = [
    { id: "1", name: "Tomato", category: "Vegetable", price: 85, region: "Lahore", lastUpdated: "2 hours ago" },
    { id: "2", name: "Potato", category: "Vegetable", price: 45, region: "Karachi", lastUpdated: "3 hours ago" },
    { id: "3", name: "Onion", category: "Vegetable", price: 60, region: "Islamabad", lastUpdated: "1 hour ago" },
    { id: "4", name: "Carrot", category: "Vegetable", price: 55, region: "Faisalabad", lastUpdated: "4 hours ago" },
    { id: "5", name: "Cucumber", category: "Vegetable", price: 40, region: "Multan", lastUpdated: "2 hours ago" },
    { id: "6", name: "Apple", category: "Fruit", price: 180, region: "Lahore", lastUpdated: "1 hour ago" },
  ];

  const avgPrice = Math.round(marketItems.reduce((sum, item) => sum + item.price, 0) / marketItems.length);

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
          <AdminMarketTable
            items={marketItems}
            onEdit={(id) => console.log("Edit item:", id)}
            onDelete={(id) => console.log("Delete item:", id)}
            onAdd={() => console.log("Add new item")}
          />
        </div>
      </div>
    </div>
  );
}
