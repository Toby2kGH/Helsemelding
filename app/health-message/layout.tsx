"use client";

import { HealthMessageProvider } from "@/context/HealthMessageEnContext";

export default function HealthMessageLayout({ children }: { children: React.ReactNode }) {
  return <HealthMessageProvider>{children}</HealthMessageProvider>;
}
