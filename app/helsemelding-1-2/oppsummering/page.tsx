import { FlowOppsummering } from "@/components/flow/FlowOppsummering";
import { STEG_12 } from "@/lib/helsemelding11";

export default function Page() {
  return <FlowOppsummering steg={STEG_12} basePath="/helsemelding-1-2" versjon="1.2" />;
}
