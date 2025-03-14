// import "@radix-ui/themes/styles.css";
// import { Heading } from "@radix-ui/themes";
// import { Theme } from "@radix-ui/themes";
import Image from "next/image";
import { Audiowide } from "next/font/google";

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="{audiowide.className} text-center mt-40">
      <h1 className=" uppercase text-6xl font-extrabold">Encipher</h1>
      <p className="text-2xl font-light">Connect over code</p>
      <section className="flex justify-around mt-10">
        <Image
          alt="Encipher Logo"
          width={300}
          height={300}
          src={
            "https://t4.ftcdn.net/jpg/05/40/42/53/360_F_540425300_mgTbjqN1GlPZF1MyrI4LXOx18FdrCZHj.jpg"
          }
        />
      </section>
    </div>
  );
}
