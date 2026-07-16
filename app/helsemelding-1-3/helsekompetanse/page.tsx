import { FlowHelsekompetanseRCT } from "@/components/flow/FlowHelsekompetanseRCT";
import { STEG_13 } from "@/lib/helsemelding11";

export default function Page() {
  return <FlowHelsekompetanseRCT steg={STEG_13} basePath="/helsemelding-1-3" />;
}
