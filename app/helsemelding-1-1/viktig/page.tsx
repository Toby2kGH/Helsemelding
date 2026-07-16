import { FlowViktig } from "@/components/flow/FlowViktig";
import { STEG_11 } from "@/lib/helsemelding11";

export default function Page() {
  return <FlowViktig steg={STEG_11} basePath="/helsemelding-1-1" />;
}
