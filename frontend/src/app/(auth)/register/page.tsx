"use client";

import { Card, CardAction, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import Link from "next/link";
import { registerAction } from "./actions";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { useActionState } from "react";


export default function RegisterPage() {
    const [state, action] = useActionState(registerAction, null);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardAction>
                        <Button variant="link" asChild>
                            <Link href="/login">Sign In</Link>
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

                        <div className="space-y-1">
                            <Label htmlFor="password">Name</Label>
                            <Input id="name" name="name" type="text" required />
                        </div>

                        {state?.error && (
                            <Alert variant="destructive">
                                <AlertDescription>{state.error}</AlertDescription>
                            </Alert>
                        )}


                        <Button type="submit" className="w-full">
                            Register
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
