import { FlowHelsekompetanse } from "@/components/flow/FlowHelsekompetanse";
import { STEG_12 } from "@/lib/helsemelding11";

export default function Page() {
  return <FlowHelsekompetanse steg={STEG_12} basePath="/helsemelding-1-2" />;
}
