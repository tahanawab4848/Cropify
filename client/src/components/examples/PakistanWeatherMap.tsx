import { PakistanWeatherMap } from "../PakistanWeatherMap";

export default function PakistanWeatherMapExample() {
  const mockRegions = [
    { name: "Punjab", condition: "heat" as const },
    { name: "Sindh", condition: "normal" as const },
    { name: "Balochistan", condition: "heat" as const },
    { name: "KPK", condition: "rain" as const },
    { name: "Kashmir", condition: "rain" as const },
  ];

  return (
    <div className="p-8">
      <PakistanWeatherMap regions={mockRegions} />
    </div>
  );
}
