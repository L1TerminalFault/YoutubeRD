import { Geist, Geist_Mono, DM_Sans } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "MovieApp",
    template: "%s | MovieApp",
  },
  description: "",
};

export default async function RootLayout({ children }) {

  return (
    <html lang="en" className="bg-[#040510] h-screen">
      <body
        // className={`antialiased h-screen bg-[#070816]`}
        className={`${dmSans.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased bg-[#040510]`}
      >
        {children}
      </body>
    </html>
  );
}
