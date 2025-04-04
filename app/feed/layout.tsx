import type { Metadata } from "next";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function FeedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <BottomNav />
      {children}
    </>
  );
}
