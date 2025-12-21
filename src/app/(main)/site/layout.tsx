import React from "react";

interface SiteLayoutProps {
  children: React.ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <section className="max-w-[1200px] mx-auto py-4 px-4 sm:px-6">
      {children}
    </section>
  );
}
