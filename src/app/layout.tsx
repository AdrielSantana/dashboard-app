import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard App",
  description: "Just a Dashboard App",
  applicationName: "Dashboard App",
  creator: "Adriel Santana",
  colorScheme: "light",
  icons: {
    icon: [
      "/favicon/icon.png",
      "favicon/favicon-32x32.png",
      "favicon/favicon-16x16.png",
    ],
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <h1>Layout</h1>
        {children}
      </body>
    </html>
  );
}
