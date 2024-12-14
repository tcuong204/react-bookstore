import Link from "next/link";
import Banner from "../Components/Banner";
import { HotDeal } from "@/Components/HotDeal";

export default function Home() {
  return (
    <div>
      <Banner />
      <HotDeal />
    </div>
  );
}
