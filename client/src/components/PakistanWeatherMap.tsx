import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RegionWeather {
  name: string;
  condition: "normal" | "rain" | "heat";
}

interface PakistanWeatherMapProps {
  regions: RegionWeather[];
}

export function PakistanWeatherMap({ regions }: PakistanWeatherMapProps) {
  const getColorClass = (condition: string) => {
    switch (condition) {
      case "rain":
        return "fill-chart-3/40 stroke-chart-3";
      case "heat":
        return "fill-chart-2/40 stroke-chart-2";
      default:
        return "fill-chart-1/40 stroke-chart-1";
    }
  };

  return (
    <Card className="overflow-visible" data-testid="card-pakistan-weather-map">
      <CardHeader>
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Pakistan Weather Map</h3>
          <div className="flex gap-2">
            <Badge variant="secondary" className="gap-1">
              <div className="h-3 w-3 rounded-full bg-chart-1" />
              Normal
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <div className="h-3 w-3 rounded-full bg-chart-3" />
              Rain
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <div className="h-3 w-3 rounded-full bg-chart-2" />
              Heat
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <svg
          viewBox="0 0 400 600"
          className="w-full max-w-md mx-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="punjab" className={getColorClass(regions.find(r => r.name === "Punjab")?.condition || "normal")}>
            <path
              d="M 150 120 L 200 100 L 280 140 L 300 200 L 280 240 L 220 260 L 180 240 L 150 200 Z"
              strokeWidth="2"
            />
            <text x="220" y="180" fontSize="14" fill="currentColor" textAnchor="middle">
              Punjab
            </text>
          </g>

          <g id="sindh" className={getColorClass(regions.find(r => r.name === "Sindh")?.condition || "normal")}>
            <path
              d="M 180 240 L 220 260 L 240 320 L 220 400 L 180 420 L 140 380 L 140 280 Z"
              strokeWidth="2"
            />
            <text x="180" y="330" fontSize="14" fill="currentColor" textAnchor="middle">
              Sindh
            </text>
          </g>

          <g id="balochistan" className={getColorClass(regions.find(r => r.name === "Balochistan")?.condition || "normal")}>
            <path
              d="M 60 200 L 150 200 L 180 240 L 140 280 L 140 380 L 80 420 L 40 380 L 40 240 Z"
              strokeWidth="2"
            />
            <text x="100" y="300" fontSize="14" fill="currentColor" textAnchor="middle">
              Balochistan
            </text>
          </g>

          <g id="kpk" className={getColorClass(regions.find(r => r.name === "KPK")?.condition || "normal")}>
            <path
              d="M 150 60 L 200 40 L 240 60 L 260 100 L 200 100 L 150 120 Z"
              strokeWidth="2"
            />
            <text x="200" y="80" fontSize="12" fill="currentColor" textAnchor="middle">
              KPK
            </text>
          </g>

          <g id="kashmir" className={getColorClass(regions.find(r => r.name === "Kashmir")?.condition || "normal")}>
            <path
              d="M 240 60 L 280 50 L 320 80 L 300 120 L 280 140 L 260 100 Z"
              strokeWidth="2"
            />
            <text x="280" y="95" fontSize="11" fill="currentColor" textAnchor="middle">
              Kashmir
            </text>
          </g>
        </svg>
      </CardContent>
    </Card>
  );
}
