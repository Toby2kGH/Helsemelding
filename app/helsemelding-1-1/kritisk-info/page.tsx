import { FlowKritiskInfo } from "@/components/flow/FlowKritiskInfo";
import { STEG_11 } from "@/lib/helsemelding11";

export default function Page() {
  return <FlowKritiskInfo steg={STEG_11} basePath="/helsemelding-1-1" />;
}
