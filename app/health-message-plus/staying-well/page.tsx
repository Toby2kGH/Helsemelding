import { PreventionStep } from "@/components/en/PreventionStep";
import { STEPS_11 } from "@/lib/healthMessageEn";

export default function Page() {
  return <PreventionStep steps={STEPS_11} basePath="/health-message-plus" />;
}
