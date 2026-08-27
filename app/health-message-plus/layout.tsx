"use client";

import { HealthMessageProvider } from "@/context/HealthMessageEnContext";

export default function HealthMessagePlusLayout({ children }: { children: React.ReactNode }) {
  return <HealthMessageProvider>{children}</HealthMessageProvider>;
}
