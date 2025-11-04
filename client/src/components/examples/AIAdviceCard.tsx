import { AIAdviceCard } from "../AIAdviceCard";

export default function AIAdviceCardExample() {
  return (
    <div className="p-8">
      <AIAdviceCard
        advice="Tomato prices are rising steadily in Lahore market. Consider selling within the next 2 days to maximize profit. Weather forecast shows clear conditions, ideal for harvest."
        timestamp="2 hours ago"
        weatherBased
        priceBased
        onRefresh={() => console.log("Refresh AI advice")}
      />
    </div>
  );
}
