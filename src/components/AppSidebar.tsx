"use client";

import { Home, Newspaper, ChartArea, User, Folder } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = {
  main: [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Companies",
      url: "/companies",
      icon: Newspaper,
    },
    {
      title: "Compare",
      url: "/companies-comparison",
      icon: ChartArea,
    },
  ],
  admin: [
    {
      title: "Admin",
      url: "/admin",
      icon: Folder,
    },
  ],
  user: [
    {
      title: "Profile",
      url: "/profile",
      icon: User,
    },
  ],
};

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/hook";

const AppSidebar = () => {
  const pathname = usePathname();

  // Get user information from Redux store.
  const user = useAppSelector((state) => state.user);

  // Function to check if the current path matches the menu item URL.
  // This is used to highlight the active menu item.
  const isActive = (url: string) => {
    return pathname === url;
  };

  // Menus to display, conditioned based on user role.
  const groups = [
    { label: "Main", items: items.main },
    ...(user?.is_staff || user?.is_superuser
      ? [{ label: "Admin", items: items.admin }]
      : []),
    // { label: "Profile", items: items.user },
  ];

  return (
    <Sidebar className="mt-20" variant="inset">
      <SidebarContent>
        {groups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive(item.url)}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
