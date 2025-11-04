import { Cloud, CloudRain, Sun, Wind, Droplets } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface WeatherCardProps {
  city: string;
  temperature: number;
  condition: "sunny" | "cloudy" | "rainy";
  humidity: number;
  windSpeed: number;
}

export function WeatherCard({
  city,
  temperature,
  condition,
  humidity,
  windSpeed,
}: WeatherCardProps) {
  const getWeatherIcon = () => {
    switch (condition) {
      case "sunny":
        return <Sun className="h-16 w-16 text-chart-2" />;
      case "cloudy":
        return <Cloud className="h-16 w-16 text-muted-foreground" />;
      case "rainy":
        return <CloudRain className="h-16 w-16 text-chart-3" />;
      default:
        return <Sun className="h-16 w-16 text-chart-2" />;
    }
  };

  return (
    <Card className="hover-elevate overflow-visible" data-testid={`card-weather-${city.toLowerCase()}`}>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">{city}</h3>
        <div className="flex flex-col items-center gap-4">
          {getWeatherIcon()}
          <div className="text-center">
            <p className="text-4xl font-bold">{temperature}°C</p>
            <p className="text-sm text-muted-foreground capitalize mt-1">{condition}</p>
          </div>
          <div className="flex w-full justify-around gap-4 pt-4 border-t">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{humidity}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{windSpeed} km/h</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
