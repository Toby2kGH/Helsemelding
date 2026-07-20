import { FlowViktig } from "@/components/flow/FlowViktig";
import { STEG_13 } from "@/lib/helsemelding11";

export default function Page() {
  return <FlowViktig steg={STEG_13} basePath="/helsemelding-1-3" />;
}
