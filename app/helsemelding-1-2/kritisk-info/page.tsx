import { FlowKritiskInfo } from "@/components/flow/FlowKritiskInfo";
import { STEG_12 } from "@/lib/helsemelding11";

export default function Page() {
  return <FlowKritiskInfo steg={STEG_12} basePath="/helsemelding-1-2" />;
}
