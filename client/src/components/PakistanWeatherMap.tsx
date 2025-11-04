import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, CloudRain, Sun, Wind } from "lucide-react";
import { useState } from "react";

interface RegionWeather {
  name: string;
  condition: "normal" | "rain" | "heat";
  temp?: number;
}

interface PakistanWeatherMapProps {
  regions: RegionWeather[];
}

export function PakistanWeatherMap({ regions }: PakistanWeatherMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const getRegionData = (regionName: string) => {
    return regions.find(r => r.name === regionName);
  };

  const getColorStyle = (condition: string, isHovered: boolean) => {
    const opacity = isHovered ? "60" : "40";
    switch (condition) {
      case "rain":
        return {
          fill: `hsl(var(--chart-3) / 0.${opacity})`,
          stroke: `hsl(var(--chart-3))`,
        };
      case "heat":
        return {
          fill: `hsl(var(--chart-2) / 0.${opacity})`,
          stroke: `hsl(var(--chart-2))`,
        };
      default:
        return {
          fill: `hsl(var(--chart-1) / 0.${opacity})`,
          stroke: `hsl(var(--chart-1))`,
        };
    }
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "rain":
        return CloudRain;
      case "heat":
        return Sun;
      default:
        return Cloud;
    }
  };

  return (
    <Card className="overflow-visible" data-testid="card-pakistan-weather-map">
      <CardHeader>
        <div className="flex justify-between items-center flex-wrap gap-2">
          <h3 className="text-xl font-bold">Pakistan Weather Map</h3>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="secondary" className="gap-1.5">
              <Cloud className="h-3 w-3" />
              Normal
            </Badge>
            <Badge variant="secondary" className="gap-1.5">
              <CloudRain className="h-3 w-3" />
              Rain
            </Badge>
            <Badge variant="secondary" className="gap-1.5">
              <Sun className="h-3 w-3" />
              Heat
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <svg
            viewBox="0 0 500 700"
            className="w-full max-w-lg mx-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="shadow">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2"/>
              </filter>
            </defs>

            {/* Balochistan - Largest province in southwest */}
            <g 
              id="balochistan" 
              onMouseEnter={() => setHoveredRegion("Balochistan")}
              onMouseLeave={() => setHoveredRegion(null)}
              className="cursor-pointer transition-all duration-200"
              filter="url(#shadow)"
            >
              <path
                d="M 40 280 L 45 260 L 55 245 L 70 235 L 90 232 L 110 238 L 130 250 L 145 265 L 160 285 L 170 310 L 175 340 L 178 370 L 180 400 L 178 430 L 175 460 L 170 490 L 165 515 L 158 540 L 150 560 L 138 575 L 120 588 L 100 595 L 80 598 L 60 595 L 45 585 L 35 570 L 28 550 L 23 525 L 20 495 L 20 460 L 22 425 L 25 390 L 28 355 L 32 320 L 36 300 Z"
                style={getColorStyle(getRegionData("Balochistan")?.condition || "normal", hoveredRegion === "Balochistan")}
                strokeWidth="2.5"
              />
              <text 
                x="100" 
                y="400" 
                fontSize="16" 
                fontWeight="600"
                fill="currentColor" 
                textAnchor="middle"
                className="pointer-events-none"
              >
                Balochistan
              </text>
            </g>

            {/* Sindh - Southeast province */}
            <g 
              id="sindh"
              onMouseEnter={() => setHoveredRegion("Sindh")}
              onMouseLeave={() => setHoveredRegion(null)}
              className="cursor-pointer transition-all duration-200"
              filter="url(#shadow)"
            >
              <path
                d="M 170 310 L 185 300 L 205 295 L 225 298 L 245 305 L 260 318 L 272 335 L 280 355 L 285 378 L 288 402 L 288 428 L 285 452 L 278 475 L 268 495 L 255 510 L 238 520 L 218 525 L 198 525 L 180 520 L 165 510 L 158 495 L 155 475 L 158 455 L 162 435 L 168 410 L 172 385 L 175 360 L 173 335 Z"
                style={getColorStyle(getRegionData("Sindh")?.condition || "normal", hoveredRegion === "Sindh")}
                strokeWidth="2.5"
              />
              <text 
                x="220" 
                y="410" 
                fontSize="16" 
                fontWeight="600"
                fill="currentColor" 
                textAnchor="middle"
                className="pointer-events-none"
              >
                Sindh
              </text>
            </g>

            {/* Punjab - Central/eastern province */}
            <g 
              id="punjab"
              onMouseEnter={() => setHoveredRegion("Punjab")}
              onMouseLeave={() => setHoveredRegion(null)}
              className="cursor-pointer transition-all duration-200"
              filter="url(#shadow)"
            >
              <path
                d="M 160 285 L 175 270 L 192 258 L 210 250 L 230 246 L 252 245 L 275 248 L 295 255 L 312 265 L 328 278 L 340 295 L 348 315 L 352 335 L 350 355 L 345 372 L 335 385 L 320 395 L 302 400 L 282 400 L 265 395 L 248 385 L 235 370 L 225 352 L 218 332 L 212 312 L 205 295 L 195 285 L 180 280 Z"
                style={getColorStyle(getRegionData("Punjab")?.condition || "normal", hoveredRegion === "Punjab")}
                strokeWidth="2.5"
              />
              <text 
                x="270" 
                y="320" 
                fontSize="16" 
                fontWeight="600"
                fill="currentColor" 
                textAnchor="middle"
                className="pointer-events-none"
              >
                Punjab
              </text>
            </g>

            {/* KPK - Northwest province */}
            <g 
              id="kpk"
              onMouseEnter={() => setHoveredRegion("KPK")}
              onMouseLeave={() => setHoveredRegion(null)}
              className="cursor-pointer transition-all duration-200"
              filter="url(#shadow)"
            >
              <path
                d="M 145 265 L 160 248 L 178 235 L 198 225 L 218 218 L 238 215 L 258 216 L 275 220 L 288 228 L 298 240 L 305 255 L 308 270 L 305 285 L 295 295 L 280 300 L 262 302 L 245 298 L 228 290 L 212 280 L 195 270 L 178 262 L 160 258 Z"
                style={getColorStyle(getRegionData("KPK")?.condition || "normal", hoveredRegion === "KPK")}
                strokeWidth="2.5"
              />
              <text 
                x="235" 
                y="260" 
                fontSize="15" 
                fontWeight="600"
                fill="currentColor" 
                textAnchor="middle"
                className="pointer-events-none"
              >
                KPK
              </text>
            </g>

            {/* Gilgit-Baltistan - Northern region */}
            <g 
              id="gilgit"
              onMouseEnter={() => setHoveredRegion("Gilgit-Baltistan")}
              onMouseLeave={() => setHoveredRegion(null)}
              className="cursor-pointer transition-all duration-200"
              filter="url(#shadow)"
            >
              <path
                d="M 218 180 L 235 165 L 255 155 L 275 150 L 295 150 L 312 155 L 325 165 L 335 178 L 340 195 L 338 210 L 330 223 L 318 232 L 302 238 L 285 240 L 268 238 L 252 232 L 238 222 L 228 208 L 222 192 Z"
                style={getColorStyle(getRegionData("Gilgit-Baltistan")?.condition || "normal", hoveredRegion === "Gilgit-Baltistan")}
                strokeWidth="2.5"
              />
              <text 
                x="280" 
                y="198" 
                fontSize="13" 
                fontWeight="600"
                fill="currentColor" 
                textAnchor="middle"
                className="pointer-events-none"
              >
                Gilgit-Baltistan
              </text>
            </g>

            {/* Kashmir - Northeastern region */}
            <g 
              id="kashmir"
              onMouseEnter={() => setHoveredRegion("Kashmir")}
              onMouseLeave={() => setHoveredRegion(null)}
              className="cursor-pointer transition-all duration-200"
              filter="url(#shadow)"
            >
              <path
                d="M 308 270 L 320 260 L 335 252 L 350 248 L 365 248 L 378 252 L 388 260 L 395 272 L 398 286 L 395 300 L 388 312 L 378 320 L 365 325 L 350 326 L 338 322 L 328 314 L 320 302 L 315 288 Z"
                style={getColorStyle(getRegionData("Kashmir")?.condition || "normal", hoveredRegion === "Kashmir")}
                strokeWidth="2.5"
              />
              <text 
                x="358" 
                y="290" 
                fontSize="14" 
                fontWeight="600"
                fill="currentColor" 
                textAnchor="middle"
                className="pointer-events-none"
              >
                Kashmir
              </text>
            </g>
          </svg>

          {/* Hover tooltip */}
          {hoveredRegion && (
            <div className="absolute top-4 right-4 bg-card border rounded-lg p-3 shadow-lg" data-testid={`tooltip-${hoveredRegion.toLowerCase()}`}>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold">{hoveredRegion}</h4>
                {(() => {
                  const Icon = getWeatherIcon(getRegionData(hoveredRegion)?.condition || "normal");
                  return <Icon className="h-4 w-4" />;
                })()}
              </div>
              <p className="text-sm text-muted-foreground capitalize">
                {getRegionData(hoveredRegion)?.condition || "normal"} conditions
              </p>
              {getRegionData(hoveredRegion)?.temp && (
                <p className="text-sm font-medium mt-1">
                  {getRegionData(hoveredRegion)?.temp}°C
                </p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
