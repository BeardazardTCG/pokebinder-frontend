// /app/layout.tsx

import "@/app/globals.css";

export const metadata = {
  title: "PokéBinder",
  description: "Built by collectors, for collectors.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
