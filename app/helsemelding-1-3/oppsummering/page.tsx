import { FlowOppsummering } from "@/components/flow/FlowOppsummering";
import { STEG_13 } from "@/lib/helsemelding11";

export default function Page() {
  return <FlowOppsummering steg={STEG_13} basePath="/helsemelding-1-3" versjon="1.3" />;
}
