"use client";

import { Helsemelding11Provider } from "@/context/Helsemelding11Context";

export default function Helsemelding11Layout({ children }: { children: React.ReactNode }) {
  return <Helsemelding11Provider>{children}</Helsemelding11Provider>;
}
