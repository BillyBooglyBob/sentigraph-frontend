import Navbar from "@/components/Navbar";
import AppSidebar from "@/components/AppSidebar";
import React from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider className="flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset>
          <SidebarTrigger className="ml-4 mt-4 mb-0 pb-0"/>
          <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
