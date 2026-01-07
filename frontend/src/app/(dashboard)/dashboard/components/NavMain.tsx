"use client"

import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SidebarMenuButton, SidebarMenuItem } from '~/components/ui/sidebar'
import { cn } from '~/lib/utils'

interface Props {
    items: {
        title: string,
        url: string,
        icon: LucideIcon,
        active: boolean
    }[]
}

export default function NavMain({ items }: Props) {


    const path = usePathname();

    items = items.map(item => ({
        ...item,
        active: path === item.url
    }))

    // const handleMenuClick = () => {

    // }

    return (
        <>
            {
                items.map((item) => {
                    return (<SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            isActive={item.active}
                            className={cn("group hover:bg-primary/10 hover:text-primary relative h-10 w-full justify-start rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200", item.active && "bg-primary/15 text-primary shadow-sm")}
                        >
                            <Link href={item.url} className='flex cursor-pointer items-center gap-3'>
                                <item.icon
                                    className={cn("h-5 w-5 transition-colors duration-200", item.active ? "text-primary" : "text-muted-foreground group-hover:text-primary")}
                                />
                                <span className='truncate'>{item.title}</span>
                                {
                                    item.active && (
                                        <div className='bg-primary absolute top-1/2 left-0 h-6 w-1 -translate-y-1/2 rounded-r-full' />
                                    )
                                }
                            </Link>

                        </SidebarMenuButton>
                    </SidebarMenuItem>)
                })
            }
        </>
    )
}
