import { MarketItemCard } from "../MarketItemCard";

export default function MarketItemCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <MarketItemCard
        id="1"
        name="Tomato"
        category="Vegetable"
        currentPrice={85}
        region="Lahore"
        priceChange={5.2}
        onClick={() => console.log("View tomato details")}
      />
    </div>
  );
}
