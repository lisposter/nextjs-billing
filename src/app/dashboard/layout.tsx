import type { Metadata } from "next";
import Script from "next/script";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Toaster } from "@/components/toaster";
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: "Dashboard | Lemon Squeezy Next.js Billing Template",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/')
  }
  return (
    <>
      {/* Load the Lemon Squeezy's Lemon.js script before the page is interactive. */}
      <Script
        src="https://app.lemonsqueezy.com/js/lemon.js"
        strategy="beforeInteractive"
      />

      <div className="grid h-lvh grid-cols-[270px_1fr] text-sm leading-6 text-surface-500">
        <Sidebar />
        {data.user.email}
        {children}
      </div>
      <Toaster position="bottom-right" />
    </>
  );
}
