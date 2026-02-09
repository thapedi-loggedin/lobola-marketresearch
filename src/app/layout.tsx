import type { Metadata } from "next";
import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lobola.co.za"),
  icons: {
    icon: { url: "/lobola-favicon.svg", type: "image/svg+xml" },
  },
  title: "lobola.co.za | Marriage. Family. Legacy.",
  description:
    "South Africa’s trusted digital platform for marriage-related legal, customary, and family services — online, in all 11 official languages.",
  openGraph: {
    title: "lobola.co.za | Marriage. Family. Legacy.",
    description:
      "South Africa’s trusted digital platform for marriage-related legal, customary, and family services — online, in all 11 official languages.",
    url: "https://www.lobola.co.za",
    siteName: "lobola.co.za",
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "lobola.co.za | Marriage. Family. Legacy.",
    description:
      "South Africa’s trusted digital platform for marriage-related legal, customary, and family services — online, in all 11 official languages.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
