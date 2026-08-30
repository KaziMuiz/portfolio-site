import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Qazi Abdul Muiz — Portfolio",
  description: "Portfolio site built during the FlyRank AI Internship.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-gray-950 text-white flex flex-col antialiased">
        <Navigation />
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-10">
          {children}
        </main>
        <footer className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">
          Built by Qazi Abdul Muiz — FlyRank AI Internship
        </footer>
      </body>
    </html>
  );
}
