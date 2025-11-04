import { WeatherCard } from "../WeatherCard";

export default function WeatherCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <WeatherCard
        city="Lahore"
        temperature={32}
        condition="sunny"
        humidity={65}
        windSpeed={12}
      />
    </div>
  );
}
