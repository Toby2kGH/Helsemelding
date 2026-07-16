import { FlowKritiskInfo } from "@/components/flow/FlowKritiskInfo";
import { STEG_13 } from "@/lib/helsemelding11";

export default function Page() {
  return <FlowKritiskInfo steg={STEG_13} basePath="/helsemelding-1-3" />;
}
