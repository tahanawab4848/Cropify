import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useRef } from "react";

interface PriceChartProps {
  itemName: string;
  data: Array<{ date: string; price: number }>;
  color?: string;
}

export function PriceChart({ itemName, data, color = "#22c55e" }: PriceChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const padding = 40;

    ctx.clearRect(0, 0, width, height);

    const prices = data.map((d) => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice || 1;

    const xStep = (width - padding * 2) / (data.length - 1);
    const yScale = (height - padding * 2) / priceRange;

    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding + (i * (height - padding * 2)) / 4;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    data.forEach((point, index) => {
      const x = padding + index * xStep;
      const y = height - padding - (point.price - minPrice) * yScale;
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    ctx.fillStyle = color;
    data.forEach((point, index) => {
      const x = padding + index * xStep;
      const y = height - padding - (point.price - minPrice) * yScale;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.fillStyle = "#6b7280";
    ctx.font = "12px Inter";
    ctx.textAlign = "center";
    data.forEach((point, index) => {
      if (index % 2 === 0) {
        const x = padding + index * xStep;
        const date = new Date(point.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
        ctx.fillText(date, x, height - 10);
      }
    });

    ctx.textAlign = "right";
    for (let i = 0; i <= 4; i++) {
      const price = minPrice + (i * priceRange) / 4;
      const y = height - padding - (i * (height - padding * 2)) / 4;
      ctx.fillText(`₨${price.toFixed(0)}`, padding - 10, y + 4);
    }
  }, [data, color]);

  return (
    <Card className="overflow-visible" data-testid={`card-price-chart-${itemName.toLowerCase()}`}>
      <CardHeader>
        <h3 className="text-xl font-bold">{itemName}</h3>
        <p className="text-sm text-muted-foreground">7-Day Price Trend</p>
      </CardHeader>
      <CardContent>
        <canvas ref={canvasRef} className="w-full h-64" />
      </CardContent>
    </Card>
  );
}
