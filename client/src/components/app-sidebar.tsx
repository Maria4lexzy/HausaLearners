import { Trophy, Plus } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "wouter";
import { ThemeToggle } from "./theme-toggle";
import { 
  TurbanIcon, 
  MinaretIcon, 
  LeatherScrollIcon,
  CalabashIcon
} from "./hausa-icons";

// Wrapper components to match Lucide icon API
const HausaTurban = ({ className }: { className?: string }) => <TurbanIcon className={className} size={16} />;
const HausaMinaret = ({ className }: { className?: string }) => <MinaretIcon className={className} size={16} />;
const HausaScroll = ({ className }: { className?: string }) => <LeatherScrollIcon className={className} size={16} />;

const menuItems = [
  {
    title: "Home",
    titleHausa: "Gida",
    url: "/",
    icon: HausaTurban,
  },
  {
    title: "Learn",
    titleHausa: "Koyo",
    url: "/learn",
    icon: HausaMinaret,
  },
  {
    title: "Vocabulary",
    titleHausa: "Kalmomi",
    url: "/vocabulary",
    icon: HausaScroll,
  },
  {
    title: "Leaderboard",
    titleHausa: "Gwaninta",
    url: "/leaderboard",
    icon: Trophy,
  },
  {
    title: "Contribute",
    titleHausa: "Bayarwa",
    url: "/contribute",
    icon: Plus,
  },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4 desert-waves">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <CalabashIcon className="h-4 w-4" size={16} />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold">LingoQuest</span>
            <span className="text-[10px] text-muted-foreground font-hausa">Tafiyar Koyo</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="mud-cloth">
        <SidebarGroup>
          <SidebarGroupLabel className="font-hausa">Tafiya (Navigation)</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location === item.url}>
                    <Link href={item.url} data-testid={`link-${item.title.toLowerCase()}`}>
                      <item.icon className="h-4 w-4" />
                      <span className="flex items-center gap-2">
                        {item.title}
                        <span className="text-xs text-muted-foreground font-hausa">({item.titleHausa})</span>
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Settings</span>
          <ThemeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
