import { KeyInfoStep } from "@/components/en/KeyInfoStep";
import { STEPS_10 } from "@/lib/healthMessageEn";

export default function Page() {
  return <KeyInfoStep steps={STEPS_10} basePath="/health-message" />;
}
