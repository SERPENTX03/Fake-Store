import { ThemeProvider } from "@/components/theme-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)  {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NuqsAdapter>{children}</NuqsAdapter>
    </ThemeProvider>
  );
}
