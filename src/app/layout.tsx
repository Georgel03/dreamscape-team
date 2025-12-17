import type { Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { DreamProvider } from '@/context/DreamContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oneiric",
  description: "Make your dreams come to life with Oneiric",
  icons: {
    icon: "/logo.png",
  },
};

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} selection:bg-cyan-500/30 selection:text-cyan-100 bg-[#020205]`}>
        <DreamProvider>
          {children}
        </DreamProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
