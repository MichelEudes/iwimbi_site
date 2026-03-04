import "./globals.css";
import type { Metadata } from "next";
// Import de votre police (ex: Inter)

export const metadata: Metadata = {
  title: "Iwimbi Group | Solutions Intelligentes",
  description: "Transformer les idées en solutions intelligentes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      {/* C'est ici que ça se joue : m-0 et p-0 forcent le retrait de la bordure blanche */}
      <body className="m-0 p-0 antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}