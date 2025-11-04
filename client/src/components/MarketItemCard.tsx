import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MarketItemCardProps {
  id: string;
  name: string;
  category: string;
  currentPrice: number;
  region: string;
  priceChange: number;
  onClick?: () => void;
}

export function MarketItemCard({
  name,
  category,
  currentPrice,
  region,
  priceChange,
  onClick,
}: MarketItemCardProps) {
  const isPositive = priceChange >= 0;

  return (
    <Card className="hover-elevate overflow-visible cursor-pointer" onClick={onClick} data-testid={`card-market-item-${name.toLowerCase()}`}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-lg">{name}</h3>
          <Badge variant="secondary" className="w-fit text-xs">
            {category}
          </Badge>
        </div>
        <div className={`flex items-center gap-1 ${isPositive ? 'text-chart-2' : 'text-destructive'}`}>
          {isPositive ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
          <span className="text-sm font-medium">
            {isPositive ? '+' : ''}{priceChange}%
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-3xl font-bold">₨{currentPrice}</p>
            <p className="text-sm text-muted-foreground">per kg</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">{region}</p>
            <button 
              className="h-auto p-0 text-xs text-primary hover:underline font-medium" 
              data-testid={`button-view-details-${name.toLowerCase()}`}
            >
              View Details
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
