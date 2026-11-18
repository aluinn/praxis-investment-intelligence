import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { AppTransitionProvider } from "@/components/transition/app-transition";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const serif = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const DESCRIPTION =
  "Praxis is an investment intelligence platform bringing together market insights, portfolio analytics and research to support informed investment decisions.";

export const metadata: Metadata = {
  applicationName: "Praxis",
  title: {
    default: "Praxis Investment Intelligence",
    template: "%s · Praxis",
  },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "Praxis",
    title: "Praxis Investment Intelligence",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: "Praxis Investment Intelligence",
    description: DESCRIPTION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${serif.variable} h-full antialiased`}>
      <body className="min-h-full">
        <AppTransitionProvider>{children}</AppTransitionProvider>
      </body>
    </html>
  );
}
