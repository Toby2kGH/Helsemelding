import { FlowSamtykker } from "@/components/flow/FlowSamtykker";
import { STEG_12 } from "@/lib/helsemelding11";

export default function Page() {
  return <FlowSamtykker steg={STEG_12} basePath="/helsemelding-1-2" />;
}
