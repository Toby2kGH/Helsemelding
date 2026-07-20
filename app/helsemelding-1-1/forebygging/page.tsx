import { FlowForebygging } from "@/components/flow/FlowForebygging";
import { STEG_11 } from "@/lib/helsemelding11";

export default function Page() {
  return <FlowForebygging steg={STEG_11} basePath="/helsemelding-1-1" />;
}
