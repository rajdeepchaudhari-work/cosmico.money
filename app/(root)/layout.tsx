/**
 * Authenticated app shell.
 *
 * Wraps every route inside the (root) group — dashboard, transaction
 * history, my-banks, payment-transfer, rewards, assistant, settings.
 * Two responsibilities:
 *   1. Auth gate — calls getLoggedInUser() and redirects to /landing
 *      if there is no Appwrite session.
 *   2. Renders the shared chrome: desktop sidebar, mobile nav, and the
 *      floating ChatWidget that is available on every page.
 */
import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import ChatWidget from "@/components/ChatWidget";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = await getLoggedInUser();

  if(!loggedIn) redirect('/landing')

  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={loggedIn} />

      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src="/icons/logo.svg" width={30} height={30} alt="logo" />
          <div>
            <MobileNav user={loggedIn} />
          </div>
        </div>
        {children}
      </div>
      <ChatWidget />
    </main>
  );
}
