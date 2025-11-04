import { Navigation } from "@/components/Navigation";
import { MarketItemCard } from "@/components/MarketItemCard";
import { WeatherCard } from "@/components/WeatherCard";
import { AIAdviceCard } from "@/components/AIAdviceCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrendingUp, Package, MapPin } from "lucide-react";
import farmerAvatar from "@assets/generated_images/Pakistani_farmer_portrait_cce040c4.png";

export default function FarmerDashboard() {
  const trendingItems = [
    { id: "1", name: "Tomato", category: "Vegetable", currentPrice: 85, region: "Lahore", priceChange: 5.2 },
    { id: "2", name: "Potato", category: "Vegetable", currentPrice: 45, region: "Karachi", priceChange: -2.1 },
    { id: "3", name: "Onion", category: "Vegetable", currentPrice: 60, region: "Islamabad", priceChange: 3.8 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation userRole="farmer" userName="Ahmed Khan" userAvatar={farmerAvatar} />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Farmer Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Welcome back, Ahmed! Here's today's market overview.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="overflow-visible" data-testid="card-stat-items">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Total Items Tracked</h3>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">24</p>
              <p className="text-xs text-muted-foreground mt-1">Vegetables & Fruits</p>
            </CardContent>
          </Card>

          <Card className="overflow-visible" data-testid="card-stat-trending">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Trending Up</h3>
              <TrendingUp className="h-4 w-4 text-chart-1" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-chart-1">12</p>
              <p className="text-xs text-muted-foreground mt-1">Price increases today</p>
            </CardContent>
          </Card>

          <Card className="overflow-visible" data-testid="card-stat-regions">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Regions Covered</h3>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">8</p>
              <p className="text-xs text-muted-foreground mt-1">Major cities</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">Trending Market Items</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trendingItems.map((item) => (
                <MarketItemCard
                  key={item.id}
                  {...item}
                  onClick={() => console.log(`View details for ${item.name}`)}
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Today's Weather</h2>
            <WeatherCard
              city="Lahore"
              temperature={32}
              condition="sunny"
              humidity={65}
              windSpeed={12}
            />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">AI Farming Advice</h2>
          <AIAdviceCard
            advice="Tomato prices are rising steadily in Lahore market. Consider selling within the next 2 days to maximize profit. Weather forecast shows clear conditions, ideal for harvest and transport."
            timestamp="2 hours ago"
            weatherBased
            priceBased
            onRefresh={() => console.log("Refresh AI advice")}
          />
        </div>
      </div>
    </div>
  );
}
