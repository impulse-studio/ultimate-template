// biome-ignore lint/performance/noNamespaceImport: Compound component pattern
import * as FancyButton from "@repo/ui/fancy-button";
import { FormInput } from "@repo/ui/form";
import { RiHome2Line } from "@repo/ui/icon";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <section className="flex flex-col items-center justify-center gap-4">
        <Image alt="Logo" height={80} src="/next.svg" width={197} />
        <h1 className="font-bold text-title-h4">It works!</h1>
        <FancyButton.Root>
          <FancyButton.Icon as={RiHome2Line} />
          Click me!
        </FancyButton.Root>
        <FormInput label="Name" name="name" />
      </section>
    </main>
  );
}
