import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
} from "~/components/ui/breadcrumb"

import { Separator } from "~/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import BreadcrumbPageClient from "./components/BreadcrumbPageClient";
import AppSidebar from "./components/AppSidebar";


export const metadata = {
    title: 'AI Voice Studio',
    description: 'AI Voice Studio - Transform text to voice',
    icons: [{ rel: "icon", url: "/favicon.ico" }]
};


export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="flex h-screen flex-col">
                <header className="bg-background/95 supports-backgrop-filter:bg-background/60 border-border/40 sticky top-0 z-10 border-b px-6 py-3 shadow-sm backdrop-blur">
                    <div className="flex shrink-0 grow items-center gap-3">
                        <SidebarTrigger className="hover:bg-muted -ml-1 h-8 w-8 transition-colors" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 h-6 data-[orientation=vertical]:h-6"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPageClient />
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <main className="from-background to-muted/20 flex-1 overflow-y-auto bg-gradient-to-brp-6">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}