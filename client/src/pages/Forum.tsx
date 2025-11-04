import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { ForumPostCard } from "@/components/ForumPostCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import farmerAvatar from "@assets/generated_images/Pakistani_farmer_portrait_cce040c4.png";
import adminAvatar from "@assets/generated_images/Admin_officer_portrait_8dcbd10c.png";

export default function Forum() {
  const [search, setSearch] = useState("");

  const forumPosts = [
    {
      id: "1",
      title: "Best time to plant wheat this season?",
      content: "I'm planning to plant wheat in my 5-acre field near Faisalabad. Given the current weather patterns and market prices, what would be the optimal time to start planting? Any experienced farmers have suggestions?",
      author: "Ahmed Khan",
      authorRole: "farmer" as const,
      authorAvatar: farmerAvatar,
      timestamp: "2 hours ago",
      commentCount: 12,
      likeCount: 8,
    },
    {
      id: "2",
      title: "Market Update: Tomato prices rising in Lahore",
      content: "Just wanted to share that tomato prices have increased by 15% in Lahore wholesale market this week. Good time for farmers to sell if you have stock ready.",
      author: "Ali Hassan",
      authorRole: "admin" as const,
      authorAvatar: adminAvatar,
      timestamp: "5 hours ago",
      commentCount: 24,
      likeCount: 18,
    },
    {
      id: "3",
      title: "Dealing with pest control in potato crops",
      content: "Has anyone dealt with aphid infestations in potato crops? Looking for organic pest control solutions that won't harm the produce. Would appreciate any advice from experienced farmers.",
      author: "Bilal Ahmad",
      authorRole: "farmer" as const,
      timestamp: "1 day ago",
      commentCount: 15,
      likeCount: 10,
    },
    {
      id: "4",
      title: "New irrigation techniques for water conservation",
      content: "With the ongoing water shortage issues, I've been researching drip irrigation systems. Has anyone implemented this in their fields? What are the cost benefits and challenges?",
      author: "Hassan Malik",
      authorRole: "farmer" as const,
      timestamp: "2 days ago",
      commentCount: 20,
      likeCount: 15,
    },
  ];

  const filteredPosts = forumPosts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.content.toLowerCase().includes(search.toLowerCase()) ||
    post.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation userRole="farmer" userName="Ahmed Khan" userAvatar={farmerAvatar} />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Community Forum</h1>
          <p className="text-lg text-muted-foreground">
            Connect with fellow farmers and share knowledge
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search discussions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
              data-testid="input-search-forum"
            />
          </div>
          <Button data-testid="button-new-post">
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {filteredPosts.map((post) => (
            <ForumPostCard
              key={post.id}
              {...post}
              onClick={() => console.log(`View post: ${post.id}`)}
            />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No posts found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
