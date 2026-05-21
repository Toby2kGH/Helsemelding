import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Helsenorge — Helsemelding (DEMO)",
  description:
    "Proof of concept for Helsemelding — en ny nasjonal helsetjeneste. Dette er en demo med fiktive pasientdata.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nb">
      <body className="flex min-h-screen flex-col bg-neutral-50">
        <UserProvider>
          <Header />
          <main className="flex-1" id="main-content">
            {children}
          </main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
