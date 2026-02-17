"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Footer from "./Footer";
import PlaidLink from "@/components/PlaidLink";

const MobileNav = ({ user }: MobileNavProps) => {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
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
                <SheetClose asChild>
                  <div>
                    <PlaidLink user={user} variant="nav" />
                  </div>
                </SheetClose>
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