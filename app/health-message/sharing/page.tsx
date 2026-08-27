import { SharingStep } from "@/components/en/SharingStep";
import { STEPS_10 } from "@/lib/healthMessageEn";

export default function Page() {
  return <SharingStep steps={STEPS_10} basePath="/health-message" />;
}
