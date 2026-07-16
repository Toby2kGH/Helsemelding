import { FlowLegemidler } from "@/components/flow/FlowLegemidler";
import { STEG_12 } from "@/lib/helsemelding11";

export default function Page() {
  return <FlowLegemidler steg={STEG_12} basePath="/helsemelding-1-2" />;
}
