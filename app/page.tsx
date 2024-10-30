import Image from "next/image";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";

export default async function Home() {
  return (
    <div className="flex items-center flex-col">
      <Header />
      <BottomNav />
    </div>
  );
}
