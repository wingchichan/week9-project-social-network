import UserInfoForm from "./components/UserInfoForm";
// import "@radix-ui/themes/styles.css";
// import { Heading } from "@radix-ui/themes";
// import { Theme } from "@radix-ui/themes";
import { Audiowide } from "next/font/google";

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div>
      <h1 className="{audiowide.className} uppercase text-6xl font-extrabold">
        Encipher
      </h1>
    </div>
  );
}
