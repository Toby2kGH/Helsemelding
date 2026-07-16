import { FlowOppfolging } from "@/components/flow/FlowOppfolging";
import { STEG_13 } from "@/lib/helsemelding11";

export default function Page() {
  return <FlowOppfolging steg={STEG_13} basePath="/helsemelding-1-3" />;
}
