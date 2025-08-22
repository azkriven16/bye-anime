"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  const alphabetItems = [
    { label: "All", href: "/atoz/all" },
    { label: "#", href: "/atoz/other" },
    { label: "0-9", href: "/atoz/0-9" },
    ...Array.from({ length: 26 }, (_, i) => {
      const letter = String.fromCharCode(65 + i);
      return { label: letter, href: `/atoz/${letter.toLowerCase()}` };
    }),
  ];

  return (
    <footer className="px-4 md:px-12 lg:px-16 py-12 mb-10 md:mb-0 border-t mt-auto">
      <div className="flex flex-col items-center space-y-8">
        {/* A-Z List Component */}
        <div className="w-full">
          <div className="mb-3 md:mb-6">
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-2 md:mb-4 text-center md:text-left">
              A-Z LIST{" "}
              <span className="text-muted-foreground font-normal ml-2 hidden sm:inline">
                Searching anime order by alphabet name A to Z.
              </span>
            </h3>
          </div>

          {/* Alphabet navigation */}
          <div className="flex flex-wrap justify-center md:justify-start gap-1 md:gap-2">
            {alphabetItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-2 py-1 md:px-3 md:py-2 text-xs md:text-sm font-medium rounded border min-w-[32px] md:min-w-[40px] text-center transition-colors
                    ${
                      isActive
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-secondary/50 text-muted-foreground border-border/50 hover:bg-primary hover:text-primary-foreground hover:border-primary"
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Footer content - stacked on mobile, side by side on larger screens */}
        <div className="w-full flex flex-col md:flex-row md:justify-between md:items-start space-y-6 md:space-y-0 md:space-x-8">
          {/* Left column - Disclaimer and Copyright */}
          <div className="flex flex-col space-y-4 text-center md:text-left md:flex-1">
            <p className="text-sm text-muted-foreground max-w-2xl">
              ByeAnime does not store any files on our server, we only linked to
              the media which is hosted on 3rd party services.
            </p>
            <p className="text-xs text-muted-foreground">
              © ByeAnime.to. All rights reserved.
            </p>
          </div>

          {/* Right column - Links */}
          <div className="flex flex-wrap justify-center md:justify-end gap-8 text-sm md:flex-shrink-0">
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Terms of service
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              DMCA
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Contact
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              ByeAnime App
            </Link>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-5xl md:text-8xl lg:text-9xl font-bold text-primary tracking-wider">
            BYEANIME
          </h2>
        </div>
      </div>
    </footer>
  );
}
