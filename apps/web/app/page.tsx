import Image from "next/image";
import * as FancyButton from "@repo/ui/fancy-button";
import { RiHome2Line } from "@repo/ui/icon";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <section className="flex flex-col items-center justify-center gap-4">
        <Image src="/next.svg" alt="Logo" width={197} height={80} />
        <h1 className="text-title-h4 font-bold">It works!</h1>
        <FancyButton.Root>
          <FancyButton.Icon as={RiHome2Line} />
          Click me!
        </FancyButton.Root>
      </section>
    </main>
  );
}
