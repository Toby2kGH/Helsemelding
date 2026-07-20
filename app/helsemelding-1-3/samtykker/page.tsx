import { FlowSamtykker } from "@/components/flow/FlowSamtykker";
import { STEG_13 } from "@/lib/helsemelding11";

export default function Page() {
  return <FlowSamtykker steg={STEG_13} basePath="/helsemelding-1-3" />;
}
