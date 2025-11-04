import { Lightbulb, RefreshCw, Clock } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AIAdviceCardProps {
  advice: string;
  timestamp?: string;
  weatherBased?: boolean;
  priceBased?: boolean;
  onRefresh?: () => void;
}

export function AIAdviceCard({
  advice,
  timestamp = "2 hours ago",
  weatherBased = false,
  priceBased = false,
  onRefresh,
}: AIAdviceCardProps) {
  return (
    <Card className="overflow-visible" data-testid="card-ai-advice">
      <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Lightbulb className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Smart Farming Advice</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onRefresh}
          data-testid="button-refresh-advice"
          aria-label="Get new advice"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg leading-relaxed">{advice}</p>
        <div className="flex flex-wrap items-center gap-2">
          {weatherBased && (
            <Badge variant="secondary" data-testid="badge-weather-based">
              Weather-based
            </Badge>
          )}
          {priceBased && (
            <Badge variant="secondary" data-testid="badge-price-based">
              Price trend
            </Badge>
          )}
          <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
            <Clock className="h-3 w-3" />
            <span>{timestamp}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
