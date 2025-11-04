import { Sprout, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "./ThemeToggle";
import { Link } from "wouter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NavigationProps {
  userRole?: "admin" | "farmer";
  userName?: string;
  userAvatar?: string;
}

export function Navigation({ userRole = "farmer", userName = "Ahmed Khan", userAvatar }: NavigationProps) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Sprout className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="hidden text-lg font-bold sm:inline-block">
                AgriMarket Tracker
              </span>
            </Link>

            <div className="hidden items-center gap-1 md:flex">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard" data-testid="link-dashboard">Dashboard</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/market" data-testid="link-market">Market Rates</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/weather" data-testid="link-weather">Weather</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/forum" data-testid="link-forum">Forum</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/ai-advice" data-testid="link-ai-advice">AI Advice</Link>
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2" data-testid="button-user-menu">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={userAvatar} alt={userName} />
                    <AvatarFallback>{userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="hidden flex-col items-start lg:flex">
                    <span className="text-sm font-medium">{userName}</span>
                  </div>
                  <Badge variant="secondary" className="hidden capitalize lg:inline-flex">
                    {userRole}
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem data-testid="menu-profile">Profile</DropdownMenuItem>
                <DropdownMenuItem data-testid="menu-settings">Settings</DropdownMenuItem>
                <DropdownMenuItem data-testid="menu-logout">Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                    <Menu className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/market">Market Rates</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/weather">Weather</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/forum">Forum</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/ai-advice">AI Advice</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
