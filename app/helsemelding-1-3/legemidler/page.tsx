import { FlowLegemidler } from "@/components/flow/FlowLegemidler";
import { STEG_13 } from "@/lib/helsemelding11";

export default function Page() {
  return <FlowLegemidler steg={STEG_13} basePath="/helsemelding-1-3" />;
}
