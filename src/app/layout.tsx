"use client";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../app/components/footer/Footer";
import Header from "../app/components/header/Header";
import Toast from "./components/toast/Toast";
import "./globals.css";
import { store } from "./store/store";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className={inter.className}>
          <div style={{ position: "relative" }}>
            <Header />
            <Toast />
            {children}
            <Footer />
          </div>
        </body>
      </html>
    </Provider>
  );
}
