"use server"

import { headers } from "next/headers"
import { auth } from "~/lib/auth"
import { db } from "~/server/db"
import { redirect } from "next/navigation"

interface User {
    id: string,
    name: string,
    email: string,
    emailVerified: boolean,
    image: string | null,
    createdAt: Date,
    updatedAt: Date,
    credits: number
}

export const getUserCredits = async () => {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user?.id) {
            return { success: false, error: "Unauthorized", credits: 0 };
        }

        const user = await db.user.findUnique({
            where: { id: session.user.id },
            select: { credits: true },
        });

        if (!user) {
            return { success: false, error: "User not found", credits: 0 };
        }

        return { success: true, credits: user.credits as number };
    } catch (error) {
        console.error("Error fetching user credits:", error);
        return { success: false, error: "Failed to fetch credits", credits: 0 };
    }
};

export const getUser = async () => {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user?.id) {
            return { success: false, error: "Unauthorized" };
        }

        const user: User = await db.user.findUnique({
            where: { id: session.user.id },
            select: { name: true, email: true, image: true, credits: true },
        });

        if (!user) {
            return { success: false, error: "User not found" };
        }


        return { success: true, user };
    } catch (error) {
        console.error("Error fetching user credits:", error);
        return { success: false, error: "Failed to fetch user" };
    }
};

export const logoutAction = async() => {
    await auth.api.signOut({
        headers: await headers(),
    })

    redirect("/")
}