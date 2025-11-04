import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { MarketItemCard } from "@/components/MarketItemCard";
import { PriceChart } from "@/components/PriceChart";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search } from "lucide-react";
import farmerAvatar from "@assets/generated_images/Pakistani_farmer_portrait_cce040c4.png";

export default function MarketRates() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [region, setRegion] = useState("all");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const marketItems = [
    { id: "1", name: "Tomato", category: "Vegetable", currentPrice: 85, region: "Lahore", priceChange: 5.2 },
    { id: "2", name: "Potato", category: "Vegetable", currentPrice: 45, region: "Karachi", priceChange: -2.1 },
    { id: "3", name: "Onion", category: "Vegetable", currentPrice: 60, region: "Islamabad", priceChange: 3.8 },
    { id: "4", name: "Carrot", category: "Vegetable", currentPrice: 55, region: "Faisalabad", priceChange: 1.5 },
    { id: "5", name: "Cucumber", category: "Vegetable", currentPrice: 40, region: "Multan", priceChange: -0.8 },
    { id: "6", name: "Apple", category: "Fruit", currentPrice: 180, region: "Lahore", priceChange: 2.3 },
    { id: "7", name: "Banana", category: "Fruit", currentPrice: 120, region: "Karachi", priceChange: -1.5 },
    { id: "8", name: "Mango", category: "Fruit", currentPrice: 200, region: "Multan", priceChange: 4.7 },
  ];

  const generate7DayData = (currentPrice: number) => {
    const data = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const variance = (Math.random() - 0.5) * 20;
      data.push({
        date: date.toISOString().split('T')[0],
        price: Math.max(10, Math.round(currentPrice + variance))
      });
    }
    return data;
  };

  const filteredItems = marketItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || item.category.toLowerCase() === category.toLowerCase();
    const matchesRegion = region === "all" || item.region.toLowerCase() === region.toLowerCase();
    return matchesSearch && matchesCategory && matchesRegion;
  });

  const selectedItemData = marketItems.find(item => item.id === selectedItem);

  return (
    <div className="min-h-screen bg-background">
      <Navigation userRole="farmer" userName="Ahmed Khan" userAvatar={farmerAvatar} />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Market Rates</h1>
          <p className="text-lg text-muted-foreground">
            Current vegetable and fruit prices across Pakistan
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
              data-testid="input-search-market"
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full md:w-48" data-testid="select-category">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="vegetable">Vegetable</SelectItem>
              <SelectItem value="fruit">Fruit</SelectItem>
            </SelectContent>
          </Select>
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger className="w-full md:w-48" data-testid="select-region">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="lahore">Lahore</SelectItem>
              <SelectItem value="karachi">Karachi</SelectItem>
              <SelectItem value="islamabad">Islamabad</SelectItem>
              <SelectItem value="faisalabad">Faisalabad</SelectItem>
              <SelectItem value="multan">Multan</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <MarketItemCard
              key={item.id}
              {...item}
              onClick={() => setSelectedItem(item.id)}
            />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No items found matching your criteria.</p>
          </div>
        )}
      </div>

      <Dialog open={selectedItem !== null} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-3xl" data-testid="dialog-price-chart">
          <DialogHeader>
            <DialogTitle>Price Trend Analysis</DialogTitle>
          </DialogHeader>
          {selectedItemData && (
            <PriceChart
              itemName={selectedItemData.name}
              data={generate7DayData(selectedItemData.currentPrice)}
              color="#22c55e"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
