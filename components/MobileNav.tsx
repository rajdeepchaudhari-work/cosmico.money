"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from "react-plaid-link";
import { createLinkToken, exchangePublicToken } from "@/lib/actions/user.actions";
import Footer from "./Footer";

const MobileNav = ({ user }: MobileNavProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [sheetOpen, setSheetOpen] = useState(false);

  // Plaid Link setup at MobileNav level so the hook persists after Sheet closes
  const [token, setToken] = useState("");

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);
      setToken(data?.linkToken);
    };
    getLinkToken();
  }, [user]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      await exchangePublicToken({ publicToken: public_token, user });
      router.push("/");
    },
    [user, router]
  );

  const config: PlaidLinkOptions = { token, onSuccess };
  const { open, ready } = usePlaidLink(config);

  const handleConnectBank = () => {
    setSheetOpen(false);
    // Delay opening Plaid until the Sheet overlay and focus trap are gone
    setTimeout(() => open(), 300);
  };

  return (
    <section className="w-full max-w-[264px]">
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer"
          />
        </SheetTrigger>

        {/* PANEL */}
        <SheetContent side="left" className="border-none bg-white p-0">
          <div className="flex h-full flex-col justify-between">
            {/* TOP */}
            <div>
              {/* LOGO */}
              <Link href="/" className="flex items-center gap-2 px-6 py-6">
                <Image
                  src="/icons/logo.svg"
                  width={34}
                  height={34}
                  alt="logo"
                />
                <h1 className="text-26 font-bold text-black-1">Cosmico</h1>
              </Link>

              {/* NAV LINKS */}
              <nav className="flex flex-col gap-2 px-4 mt-6">
                {sidebarLinks.map((item) => {
                  const isActive =
                    pathname === item.route ||
                    pathname.startsWith(`${item.route}/`);

                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        href={item.route}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-4 py-3",
                          isActive && "bg-bank-gradient"
                        )}
                      >
                        <Image
                          src={item.imgURL}
                          alt={item.label}
                          width={20}
                          height={20}
                          className={cn({
                            "brightness-[3] invert-0": isActive,
                          })}
                        />

                        <p
                          className={cn(
                            "text-16 font-semibold text-black-2",
                            isActive && "text-white"
                          )}
                        >
                          {item.label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}

                {/* CONNECT BANK BUTTON */}
                <Button
                  onClick={handleConnectBank}
                  disabled={!ready}
                  className="plaidlink-default"
                >
                  <Image
                    src="/icons/connect-bank.svg"
                    alt="connect bank"
                    width={24}
                    height={24}
                  />
                  <p className="text-[16px] font-semibold text-black-2">
                    Connect bank
                  </p>
                </Button>
              </nav>
            </div>

            {/* FOOTER */}
            <div className="pb-10 px-4">
              <Footer user={user} type="mobile" />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
