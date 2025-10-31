import { Geist, Geist_Mono, Russo_One, Poppins } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const russoOne = Russo_One({
  variable: "--font-russo-one",
  weight: "400",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Cinematic Nature Experience",
  description: "An immersive cinematic experience built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Preload cinematic assets for instant load */}
        <link
          rel="preload"
          as="video"
          href="/videos/bg-hero.mp4"
          type="video/mp4"
        />
        <link
          rel="preload"
          as="video"
          href="/videos/bg-waterfall.mp4"
          type="video/mp4"
        />
        <link
          rel="preload"
          as="image"
          href="/images/landing-bg.jpg"
          type="image/jpeg"
        />
        <link
          rel="preload"
          as="image"
          href="/images/logo.png"
          type="image/png"
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} ${russoOne.variable} ${poppins.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
