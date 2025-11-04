import { MessageSquare, ThumbsUp } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ForumPostCardProps {
  id: string;
  title: string;
  content: string;
  author: string;
  authorRole: "admin" | "farmer";
  authorAvatar?: string;
  timestamp: string;
  commentCount: number;
  likeCount: number;
  onClick?: () => void;
}

export function ForumPostCard({
  title,
  content,
  author,
  authorRole,
  authorAvatar,
  timestamp,
  commentCount,
  likeCount,
  onClick,
}: ForumPostCardProps) {
  return (
    <Card className="hover-elevate overflow-visible cursor-pointer" onClick={onClick} data-testid={`card-forum-post-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader className="space-y-0 pb-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={authorAvatar} alt={author} />
            <AvatarFallback>{author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">{author}</span>
              <Badge variant="secondary" className="text-xs capitalize">
                {authorRole}
              </Badge>
            </div>
            <span className="text-xs text-muted-foreground">{timestamp}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-base text-muted-foreground line-clamp-3">{content}</p>
        </div>
        <div className="flex items-center gap-4 pt-2 border-t">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MessageSquare className="h-4 w-4" />
            <span>{commentCount}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <ThumbsUp className="h-4 w-4" />
            <span>{likeCount}</span>
          </div>
          <button 
            className="ml-auto p-0 h-auto text-primary hover:underline font-medium text-sm" 
            data-testid={`button-view-discussion-${title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            View Discussion
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
