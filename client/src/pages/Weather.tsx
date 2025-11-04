import { Navigation } from "@/components/Navigation";
import { WeatherCard } from "@/components/WeatherCard";
import { PakistanWeatherMap } from "@/components/PakistanWeatherMap";
import farmerAvatar from "@assets/generated_images/Pakistani_farmer_portrait_cce040c4.png";

export default function Weather() {
  const weatherData = [
    { city: "Lahore", temperature: 32, condition: "sunny" as const, humidity: 65, windSpeed: 12 },
    { city: "Karachi", temperature: 28, condition: "cloudy" as const, humidity: 75, windSpeed: 18 },
    { city: "Islamabad", temperature: 25, condition: "rainy" as const, humidity: 85, windSpeed: 15 },
    { city: "Faisalabad", temperature: 34, condition: "sunny" as const, humidity: 60, windSpeed: 10 },
    { city: "Multan", temperature: 36, condition: "sunny" as const, humidity: 55, windSpeed: 8 },
    { city: "Peshawar", temperature: 27, condition: "cloudy" as const, humidity: 70, windSpeed: 14 },
    { city: "Quetta", temperature: 22, condition: "rainy" as const, humidity: 80, windSpeed: 20 },
    { city: "Rawalpindi", temperature: 26, condition: "cloudy" as const, humidity: 78, windSpeed: 16 },
  ];

  const mapRegions = [
    { name: "Punjab", condition: "heat" as const },
    { name: "Sindh", condition: "normal" as const },
    { name: "Balochistan", condition: "heat" as const },
    { name: "KPK", condition: "rain" as const },
    { name: "Kashmir", condition: "rain" as const },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation userRole="farmer" userName="Ahmed Khan" userAvatar={farmerAvatar} />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Weather Updates</h1>
          <p className="text-lg text-muted-foreground">
            Live weather information across Pakistan
          </p>
        </div>

        <div className="mb-12">
          <PakistanWeatherMap regions={mapRegions} />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">City-wise Weather</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {weatherData.map((weather) => (
              <WeatherCard key={weather.city} {...weather} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
