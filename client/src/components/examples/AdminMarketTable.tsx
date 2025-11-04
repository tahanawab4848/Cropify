import { AdminMarketTable } from "../AdminMarketTable";

export default function AdminMarketTableExample() {
  const mockItems = [
    { id: "1", name: "Tomato", category: "Vegetable", price: 85, region: "Lahore", lastUpdated: "2 hours ago" },
    { id: "2", name: "Potato", category: "Vegetable", price: 45, region: "Karachi", lastUpdated: "3 hours ago" },
    { id: "3", name: "Onion", category: "Vegetable", price: 60, region: "Islamabad", lastUpdated: "1 hour ago" },
  ];

  return (
    <div className="p-8">
      <AdminMarketTable
        items={mockItems}
        onEdit={(id) => console.log("Edit item:", id)}
        onDelete={(id) => console.log("Delete item:", id)}
        onAdd={() => console.log("Add new item")}
      />
    </div>
  );
}
