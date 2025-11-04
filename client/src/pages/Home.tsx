import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Sprout, TrendingUp, Cloud, MessageSquare, Lightbulb, BarChart3 } from "lucide-react";
import heroImage from "@assets/generated_images/Pakistani_agricultural_field_landscape_49400108.png";
import marketImage from "@assets/generated_images/Pakistani_vegetable_market_scene_434ad349.png";
import farmerAvatar from "@assets/generated_images/Pakistani_farmer_portrait_cce040c4.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation userRole="farmer" userName="Ahmed Khan" userAvatar={farmerAvatar} />
      
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Pakistani agricultural field"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        </div>
        
        <div className="relative container mx-auto px-6 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-6">
              Smart Agriculture Market Tracker
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Empowering Pakistani farmers with real-time market rates, weather insights, 
              AI-powered advice, and community knowledge sharing.
            </p>
            <div className="flex gap-4">
              <Button size="lg" variant="default" asChild data-testid="button-get-started">
                <Link href="/dashboard">Get Started</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="backdrop-blur-md bg-white/10 border-white/30 text-white hover:bg-white/20"
                asChild
                data-testid="button-learn-more"
              >
                <Link href="/market">View Market Rates</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need in One Platform</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Access market data, weather updates, AI recommendations, and connect with fellow farmers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="overflow-visible hover-elevate" data-testid="card-feature-market">
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Real-Time Market Rates</h3>
                <p className="text-muted-foreground">
                  Track daily vegetable and fruit prices across all major Pakistani cities and regions.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-visible hover-elevate" data-testid="card-feature-weather">
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-3/10 mb-4">
                  <Cloud className="h-6 w-6 text-chart-3" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Weather Insights</h3>
                <p className="text-muted-foreground">
                  Get live weather updates and forecasts to plan your farming activities effectively.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-visible hover-elevate" data-testid="card-feature-ai">
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-2/10 mb-4">
                  <Lightbulb className="h-6 w-6 text-chart-2" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI-Powered Advice</h3>
                <p className="text-muted-foreground">
                  Receive smart recommendations based on weather patterns and market trends.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-visible hover-elevate" data-testid="card-feature-analytics">
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Price Trend Analytics</h3>
                <p className="text-muted-foreground">
                  View 7-day price trends and compare multiple vegetables to make informed decisions.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-visible hover-elevate" data-testid="card-feature-forum">
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-3/10 mb-4">
                  <MessageSquare className="h-6 w-6 text-chart-3" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community Forum</h3>
                <p className="text-muted-foreground">
                  Connect with fellow farmers, share experiences, and learn from each other.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-visible hover-elevate" data-testid="card-feature-admin">
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-2/10 mb-4">
                  <Sprout className="h-6 w-6 text-chart-2" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Admin Control Panel</h3>
                <p className="text-muted-foreground">
                  Manage market data efficiently with easy-to-use tools for admins.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Transparent Market Information
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Make better business decisions with access to current vegetable and fruit prices 
                from markets across Pakistan. Compare prices, track trends, and identify the best 
                times to sell your produce.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <span>Daily updated prices from all major Pakistani cities</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <span>7-day price trend analysis with visual charts</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <span>Compare multiple vegetables side-by-side</span>
                </li>
              </ul>
              <Button size="lg" asChild data-testid="button-explore-market">
                <Link href="/market">Explore Market Rates</Link>
              </Button>
            </div>
            <div>
              <img
                src={marketImage}
                alt="Pakistani vegetable market"
                className="rounded-xl shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of Pakistani farmers making smarter decisions with AgriMarket Tracker.
          </p>
          <Button size="lg" asChild data-testid="button-join-now">
            <Link href="/dashboard">Join Now - It's Free</Link>
          </Button>
        </div>
      </section>

      <footer className="py-12 border-t bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Sprout className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">AgriMarket Tracker</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 AgriMarket Tracker. Empowering Pakistani farmers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
