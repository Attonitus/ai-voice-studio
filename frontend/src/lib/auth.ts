import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { Polar } from '@polar-sh/sdk'
import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth";
import { env } from "~/env";
import { db } from "~/server/db";

const prisma = new PrismaClient();

const polarClient = new Polar({
    accessToken: env.POLAR_ACCESS_TOKEN,
    // Use 'sandbox' if you're using the Polar Sandbox environment
    // Remember that access tokens, products, etc. are completely separated between environments.
    // Access tokens obtained in Production are for instance not usable in the Sandbox environment.
    server: 'sandbox'
});


export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: {
        enabled: true,
    },
    plugins: [
        polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use: [
                checkout({
                    products: [
                        {
                            productId: "23e09741-592a-468d-9107-3c7c990f46de",
                            slug: "small",
                        },
                        {
                            productId: "3096a802-61e3-4d7c-8ec5-6c35129e98f8",
                            slug: "medium",
                        },
                        {
                            productId: "5dbf7332-c266-4b08-91d8-ab7cd8d944b5",
                            slug: "large",
                        },
                    ],
                    successUrl: "/dashboard",
                    authenticatedUsersOnly: true,
                }),
                portal(),
                usage(),
                webhooks({
                    secret: env.POLAR_WEBHOOK_SECRET,
                    onOrderPaid: async (order) => {
                        const externalCustomerId = order.data.customer.externalId;

                        if (!externalCustomerId) {
                            console.error("No external customer ID found.");
                            throw new Error("No external customer id found.");
                        }

                        const productId = order.data.productId;

                        let creditsToAdd = 0;

                        switch (productId) {
                            case "23e09741-592a-468d-9107-3c7c990f46de":
                                creditsToAdd = 50;
                                break;
                            case "3096a802-61e3-4d7c-8ec5-6c35129e98f8":
                                creditsToAdd = 200;
                                break;
                            case "5dbf7332-c266-4b08-91d8-ab7cd8d944b5":
                                creditsToAdd = 400;
                                break;
                        }

                        await db.user.update({
                            where: { id: externalCustomerId },
                            data: {
                                credits: {
                                    increment: creditsToAdd,
                                },
                            },
                        });
                    },
                })
            ],
        })
    ]
});