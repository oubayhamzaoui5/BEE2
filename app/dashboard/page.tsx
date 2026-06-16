import { DashboardClient } from "./DashboardClient";
import { Hanken_Grotesk, Spectral } from "next/font/google";

const adminSans = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-admin-sans"
});

const adminSerif = Spectral({
  subsets: ["latin"],
  variable: "--font-admin-serif",
  weight: ["400", "500", "600", "700"]
});

export default function DashboardPage() {
  return (
    <div className={`${adminSans.variable} ${adminSerif.variable}`}>
      <DashboardClient />
    </div>
  );
}
