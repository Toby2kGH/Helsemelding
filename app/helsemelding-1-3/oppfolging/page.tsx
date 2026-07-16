import { FlowOppfolgingAB } from "@/components/flow/FlowOppfolgingAB";
import { STEG_13 } from "@/lib/helsemelding11";

export default function Page() {
  return <FlowOppfolgingAB steg={STEG_13} basePath="/helsemelding-1-3" />;
}
