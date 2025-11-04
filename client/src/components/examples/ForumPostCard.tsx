import { ForumPostCard } from "../ForumPostCard";
import farmerAvatar from "@assets/generated_images/Pakistani_farmer_portrait_cce040c4.png";

export default function ForumPostCardExample() {
  return (
    <div className="p-8">
      <ForumPostCard
        id="1"
        title="Best time to plant wheat this season?"
        content="I'm planning to plant wheat in my 5-acre field near Faisalabad. Given the current weather patterns and market prices, what would be the optimal time to start planting? Any experienced farmers have suggestions?"
        author="Ahmed Khan"
        authorRole="farmer"
        authorAvatar={farmerAvatar}
        timestamp="2 hours ago"
        commentCount={12}
        likeCount={8}
        onClick={() => console.log("View forum post details")}
      />
    </div>
  );
}
