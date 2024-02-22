import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/components/StoreProvider";
import ThemeProvider from "./components/themeProvider/ThemeProvider";
import Sidebar from "@/components/sidebar/Sidebar";
import styles from "./layout.module.css"
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hrushikesh - Web Developer",
  description: "Aavula Hrushikesh - Web Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <ThemeProvider>
            <Sidebar />
            <Header />
            <div className={styles.maincontent}>
              {children}
            </div>
            <Footer />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
