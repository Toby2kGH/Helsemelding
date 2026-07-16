import { FlowSamtykker } from "@/components/flow/FlowSamtykker";
import { STEG_11 } from "@/lib/helsemelding11";

export default function Page() {
  return <FlowSamtykker steg={STEG_11} basePath="/helsemelding-1-1" />;
}
