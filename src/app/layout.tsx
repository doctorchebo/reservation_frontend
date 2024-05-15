import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../../components/header/Header";
import StoreProvider from "../app/store/StoreProvider";
import "./globals.css";
import Footer from "../../components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reservations App",
  description: "Reserve your service easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>
          <>
            <Header />
            {children}
            <Footer />
          </>
        </body>
      </html>
    </StoreProvider>
  );
}
