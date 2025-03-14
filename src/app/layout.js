import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Menubar from "./components/Menubar";

// import "@radix-ui/themes/styles.css";
// import { Theme, Container, ThemePanel } from "@radix-ui/themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Encipher",
  description: "A community for all coders",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="p-4">
          <header className="border-b-[1px] border-neutral-300 border-dashed max-w-5xl mx-auto">
            <SignedIn>
              <section className="flex flex-col w-full justify-between">
                <h1 className="{audiowide.className} uppercase text-3xl font-extrabold mb-4 text-center md:text-left">
                  Encipher
                </h1>
              </section>
            </SignedIn>
            <div className="flex justify-center md:justify-end gap-4">
              <SignedOut>
                <SignInButton />
                <SignUpButton />
              </SignedOut>
              <SignedIn>
                <Menubar />
                <UserButton />
              </SignedIn>
            </div>
          </header>
          <main className="max-w-5xl mx-auto">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
