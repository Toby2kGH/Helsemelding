import { FlowOppsummering } from "@/components/flow/FlowOppsummering";
import { STEG_11 } from "@/lib/helsemelding11";

export default function Page() {
  return <FlowOppsummering steg={STEG_11} basePath="/helsemelding-1-1" versjon="1.1" />;
}
