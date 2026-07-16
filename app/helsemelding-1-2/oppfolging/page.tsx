import { FlowOppfolging } from "@/components/flow/FlowOppfolging";
import { STEG_12 } from "@/lib/helsemelding11";

export default function Page() {
  return <FlowOppfolging steg={STEG_12} basePath="/helsemelding-1-2" />;
}
