
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // Using Geist as requested
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import AppLayout from "@/components/layout/AppLayout";
import { Toaster } from "@/components/ui/toaster"; // ShadCN Toaster

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Info Central",
  description: "Monitor your services and stay informed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <AppLayout>
            {children}
          </AppLayout>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
