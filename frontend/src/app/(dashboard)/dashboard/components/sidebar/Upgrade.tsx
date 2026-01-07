"use client"

import { Crown, Sparkles } from "lucide-react"
import { Button } from "~/components/ui/button"
import { authClient } from "~/lib/auth-client"

export default function Upgrade() {

    const upgrade = async () => {
        await authClient.checkout({
            products: ["23e09741-592a-468d-9107-3c7c990f46de", "3096a802-61e3-4d7c-8ec5-6c35129e98f8", "5dbf7332-c266-4b08-91d8-ab7cd8d944b5"]
        })
    }

    return (
        <Button
            variant="outline"
            size="sm"
            className="group relative ml-2 overflow-hidden border-orange-400/50 bg-gradient-to-r from-orange-400/10 to-pink-500/10 text-orange-400 transition-all duration-300 hover:border-orange-500/70 hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-600 hover:text-white hover:shadow-lg hover:shadow-orange-500/25"
            onClick={upgrade}
        >
            <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                <span className="font-medium">Upgrade</span>
                <Sparkles className="h-3 w-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-md bg-gradient-to-r from-orange-400/20 to-pink-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </Button>
    )
}
