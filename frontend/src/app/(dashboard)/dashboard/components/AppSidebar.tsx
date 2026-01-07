"use client"
import { FolderOpen, LayoutDashboard, Settings, Sparkles, User, Wand2 } from "lucide-react";
import Link from "next/link";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu } from "~/components/ui/sidebar";
import { NavUser } from "./NavUser";
import NavMain from "./NavMain";
import MobileSidebarClose from "./MobileSidebarClose";

const navUserLinks = [
    {
        label: "Customer Portal",
        href: "/dashboard/customer-portal",
        icon: User
    },
    {
        label: "Settings",
        href: "/dashboard/settings",
        icon: Settings
    },
];

const navMainLinks = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        active: false
    },
    {
        title: "Create",
        url: "/dashboard/create",
        icon: Wand2,
        active: false
    },
    {
        title: "Projects",
        url: "/dashboard/projects",
        icon: FolderOpen,
        active: false
    },
    {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
        active: false
    },

]

export default function AppSidebar() {
    return (
        <Sidebar className="from-background to-muted/20 border-r-0 bg-gradient-to-b">
            <SidebarHeader className="px-3">
                <MobileSidebarClose />
                <SidebarGroup>
                    <SidebarGroupLabel className="text-primary mt-6 mb-8 flex flex-col items-start justify-start px-2">
                        <Link href="/" className="mb-1 flex cursor-pointer items-center gap-2">
                            <Sparkles className="text-primary h-6 w-6" />
                            <p className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent">
                                AI Voice
                            </p>
                        </Link>
                        <p className="text-muted-foreground ml-8 text-sm font-medium tracking-wide">
                            Studio
                        </p>
                    </SidebarGroupLabel>
                </SidebarGroup>
            </SidebarHeader>

            <SidebarContent>
                <SidebarMenu className="space-y-1">
                    <NavMain items={navMainLinks} />
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter>
                <NavUser links={navUserLinks} user={{ avatar: "/public/favicon.ico", email: "h@h.com", name: "Hogan" }} />
            </SidebarFooter>
        </Sidebar>
    )
}
