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
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${russoOne.variable} ${poppins.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
