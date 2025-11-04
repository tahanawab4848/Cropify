import { PriceChart } from "../PriceChart";

export default function PriceChartExample() {
  const mockData = [
    { date: "2024-10-28", price: 75 },
    { date: "2024-10-29", price: 78 },
    { date: "2024-10-30", price: 82 },
    { date: "2024-10-31", price: 80 },
    { date: "2024-11-01", price: 85 },
    { date: "2024-11-02", price: 88 },
    { date: "2024-11-03", price: 90 },
  ];

  return (
    <div className="p-8">
      <PriceChart itemName="Tomato" data={mockData} color="#22c55e" />
    </div>
  );
}
