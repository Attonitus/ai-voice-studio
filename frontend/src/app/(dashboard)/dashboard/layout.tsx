import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
} from "~/components/ui/breadcrumb"

import { Separator } from "~/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import BreadcrumbPageClient from "./components/sidebar/BreadcrumbPageClient";
import AppSidebar from "./components/sidebar/AppSidebar";
import { getUser } from "~/actions/tt"
import { redirect } from "next/navigation";


export const metadata = {
    title: 'AI Voice Studio',
    description: 'AI Voice Studio - Transform text to voice',
    icons: [{ rel: "icon", url: "/favicon.ico" }]
};


export default async function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {

    const { user, success } = await getUser()

    if (!success || !user) {
        redirect("/");
    }

    return (
        <SidebarProvider>
            <AppSidebar user={user} />
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