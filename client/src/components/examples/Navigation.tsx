import { Navigation } from "../Navigation";
import farmerAvatar from "@assets/generated_images/Pakistani_farmer_portrait_cce040c4.png";

export default function NavigationExample() {
  return <Navigation userRole="farmer" userName="Ahmed Khan" userAvatar={farmerAvatar} />;
}
