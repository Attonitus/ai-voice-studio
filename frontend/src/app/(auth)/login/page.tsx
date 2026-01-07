"use client";

import { loginAction } from "./actions";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import Link from "next/link";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { useActionState } from "react";


export default function LoginPage() {
    const [state, action] = useActionState(loginAction, null);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                    <CardAction>
                        <Button variant="link" asChild>
                            <Link href="/register">Sign Up</Link>
                        </Button>
                    </CardAction>
                </CardHeader>

                <CardContent>
                    <form action={action} className="space-y-4">
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" required />
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" required />
                        </div>

                        {state?.error && (
                            <Alert variant="destructive">
                                <AlertDescription>{state.error}</AlertDescription>
                            </Alert>
                        )}


                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
