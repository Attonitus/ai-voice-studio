import { headers } from "next/headers"
import { redirect } from "next/navigation";
import { auth } from "~/lib/auth"
import CustomerPortalRedirect from "../components/sidebar/CustomerPortalRedirect";

export default async function page() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session) redirect("/login");

    return (
        <CustomerPortalRedirect />
    )
}
