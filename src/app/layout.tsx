import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Slide, ToastContainer } from "react-toastify";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Shop & Go",
  icons: {
    icon: "/favicon.ico"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
        <ToastContainer
          position="top-right"
          autoClose={6000}
          hideProgressBar={true}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={false}
          theme="light"
          transition={Slide}
        />
      </body>
    </html>
  );
}
