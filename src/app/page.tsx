import Link from "next/link";
import Banner from "../Components/Banner";
import Header from "../Components/Header";
import Footer from "@/Components/Footer";
import { HotDeal } from "@/Components/HotDeal";

export default function Home() {
  return (
    <div>
      <Header />
      <Banner />
      <HotDeal />
      <Footer />
    </div>
  );
}
