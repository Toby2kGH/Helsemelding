import { FlowLegemidler } from "@/components/flow/FlowLegemidler";
import { STEG_11 } from "@/lib/helsemelding11";

export default function Page() {
  return <FlowLegemidler steg={STEG_11} basePath="/helsemelding-1-1" />;
}
