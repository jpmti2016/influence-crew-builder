import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Adalian Crew Simulator",
  description: "Optimize your crew composition for the current task",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen sm:p-32`}>
        {children}
      </body>
    </html>
  );
}
