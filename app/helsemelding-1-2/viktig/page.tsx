import { FlowViktig } from "@/components/flow/FlowViktig";
import { STEG_12 } from "@/lib/helsemelding11";

export default function Page() {
  return <FlowViktig steg={STEG_12} basePath="/helsemelding-1-2" />;
}
