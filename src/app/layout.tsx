import type { Metadata } from "next";
import { Inter, Cardo } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cardo = Cardo({
  variable: "--font-cardo",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Identifyyou | Intelligent IT Solutions",
  description: "Empowering enterprises with cutting-edge Data Analytics, Cloud Migration, CRM, ERP, and Edge Computing solutions.",
  keywords: ["Data Analytics", "Cloud Migration", "CRM", "ERP", "Edge Computing", "Identifyyou"],
  openGraph: {
    title: "Identifyyou | Intelligent IT Solutions",
    description: "Empowering enterprises with cutting-edge Data Analytics, Cloud Migration, CRM, ERP, and Edge Computing solutions.",
    url: "https://identifyyou.in",
    siteName: "Identifyyou",
    images: [
      {
        url: "https://identifyyou.in/wp-content/uploads/2025/01/id_logo-dark.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
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
        className={`${inter.variable} ${cardo.variable} font-sans antialiased min-h-full flex flex-col overflow-x-hidden`}
      >
        <Header />
        <main className="flex-grow pt-[90px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
