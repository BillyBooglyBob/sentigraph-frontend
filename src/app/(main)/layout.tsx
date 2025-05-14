import Navbar from "@/components/Navbar";
import AppSidebar from "@/components/AppSidebar";
import React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
      <SidebarProvider className="flex flex-col">
        <Navbar />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
          </SidebarInset>
        </div>
      </SidebarProvider>
  );
};

export default MainLayout;
