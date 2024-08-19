import Image from "next/image";
import { Roboto } from "next/font/google";
import JobList from "./components/HomePage";
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});
export default function Home() {
  return (
    <main className="roboto.className">
      <JobList />
    </main>
  );
}
