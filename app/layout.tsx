import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ApolloWrapper from "./providers/ApolloProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tema",
  description: "Tema - социальная сеть",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
