import { ConfirmStep } from "@/components/en/ConfirmStep";
import { STEPS_10 } from "@/lib/healthMessageEn";

export default function Page() {
  return <ConfirmStep steps={STEPS_10} basePath="/health-message" />;
}
