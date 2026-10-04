import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FAFAF8",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://patel-cafe.editorial"),
  title: "PATEL — Modern Indian Gastronomy & Artisanal Café",
  description:
    "An interactive haute-cuisine and artisanal café editorial experience deconstructing the imperial Indian royal thali, samosa, and single-origin brews. 36 floating gastronomic elements engineered for the senses.",
  openGraph: {
    title: "PATEL — Modern Indian Gastronomy & Artisanal Café",
    description:
      "An interactive haute-cuisine and artisanal café editorial experience deconstructing the imperial Indian royal thali.",
    images: [{ url: "/images/image-1.webp", width: 1920, height: 1080 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} scroll-smooth`}>
      <body className="bg-[#FAFAF8] text-[#2B2320] font-sans antialiased selection:bg-[#2B2320] selection:text-[#FAFAF8] overflow-x-hidden min-h-screen">
        {children}
      </body>
    </html>
  );
}
