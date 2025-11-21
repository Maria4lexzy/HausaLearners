import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useCurrentUser } from "@/lib/user-context";
import { LogOut, Shield } from "lucide-react";
import { useLocation } from "wouter";
import { CalabashXPBar, IncenseStreakCounter } from "@/components/hausa-gamification";

export function AppHeader() {
  const { user, logout } = useCurrentUser();
  const [, setLocation] = useLocation();

  const handleLogout = async () => {
    await logout();
    setLocation("/auth/login");
  };

  if (!user) return null;

  // Display name: prioritize firstName+lastName (OAuth) > username > email
  const displayName = user.firstName && user.lastName
    ? `${user.firstName} ${user.lastName}`
    : user.username || user.email || "User";

  // Generate initials from display name
  const initials = displayName
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const currentLevelProgress = user.xp % 100;
  const xpForNextLevel = 100;

  return (
    <header className="flex items-center justify-between gap-4 border-b p-4 bg-card/50 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <SidebarTrigger data-testid="button-sidebar-toggle" />
        
        <div className="hidden lg:flex items-center gap-6">
          <CalabashXPBar 
            currentXP={currentLevelProgress} 
            maxXP={xpForNextLevel} 
            level={user.level} 
          />
          <div className="h-6 w-px bg-border" />
          <IncenseStreakCounter streak={user.streak} />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex flex-col items-end">
          <p className="text-sm font-medium" data-testid="text-username">{displayName}</p>
          <div className="flex items-center gap-3 lg:hidden">
            <span className="text-xs text-muted-foreground">Malam {user.level}</span>
            <span className="text-xs text-muted-foreground">{user.streak} ranaku</span>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full" data-testid="button-user-menu">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{displayName}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {user.isAdmin && (
              <>
                <DropdownMenuItem onClick={() => setLocation("/admin")} data-testid="menu-item-admin">
                  <Shield className="mr-2 h-4 w-4" />
                  Admin Panel
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuItem onClick={handleLogout} data-testid="menu-item-logout">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
