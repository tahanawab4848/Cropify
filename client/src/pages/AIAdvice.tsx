import { Navigation } from "@/components/Navigation";
import { AIAdviceCard } from "@/components/AIAdviceCard";
import farmerAvatar from "@assets/generated_images/Pakistani_farmer_portrait_cce040c4.png";

export default function AIAdvice() {
  const adviceList = [
    {
      id: "1",
      advice: "Tomato prices are rising steadily in Lahore market. Consider selling within the next 2 days to maximize profit. Weather forecast shows clear conditions, ideal for harvest and transport.",
      timestamp: "2 hours ago",
      weatherBased: true,
      priceBased: true,
    },
    {
      id: "2",
      advice: "Heavy rainfall expected in Islamabad region over the next 3 days. Avoid watering crops and consider harvesting ready produce before the rain to prevent damage.",
      timestamp: "5 hours ago",
      weatherBased: true,
      priceBased: false,
    },
    {
      id: "3",
      advice: "Potato prices have dropped by 8% in Karachi this week. Hold your stock if possible - historical trends show prices typically recover within 10-14 days.",
      timestamp: "1 day ago",
      weatherBased: false,
      priceBased: true,
    },
    {
      id: "4",
      advice: "Temperature in Faisalabad will be ideal (25-30°C) for the next week. This is the perfect time to plant cucumber seeds. Market demand is also showing an upward trend.",
      timestamp: "1 day ago",
      weatherBased: true,
      priceBased: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation userRole="farmer" userName="Ahmed Khan" userAvatar={farmerAvatar} />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">AI Farming Advice</h1>
          <p className="text-lg text-muted-foreground">
            Smart recommendations based on weather patterns and market trends
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {adviceList.map((advice) => (
            <AIAdviceCard
              key={advice.id}
              advice={advice.advice}
              timestamp={advice.timestamp}
              weatherBased={advice.weatherBased}
              priceBased={advice.priceBased}
              onRefresh={() => console.log(`Refresh advice: ${advice.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
