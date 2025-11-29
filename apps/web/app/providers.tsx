import { Toaster } from "@repo/ui/toast";
import { Provider as TooltipProvider } from "@repo/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ORPCQueryClientProvider } from "@/providers/query-client.provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ORPCQueryClientProvider>
      <ThemeProvider attribute="class">
        <NuqsAdapter>
          <TooltipProvider>{children}</TooltipProvider>
        </NuqsAdapter>
        <Toaster expand={false} position="bottom-right" richColors />
      </ThemeProvider>
    </ORPCQueryClientProvider>
  );
}
