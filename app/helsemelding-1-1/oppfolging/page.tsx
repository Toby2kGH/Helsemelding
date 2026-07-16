import { FlowOppfolging } from "@/components/flow/FlowOppfolging";
import { STEG_11 } from "@/lib/helsemelding11";

export default function Page() {
  return <FlowOppfolging steg={STEG_11} basePath="/helsemelding-1-1" />;
}
