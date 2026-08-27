import { VaccinationsStep } from "@/components/en/VaccinationsStep";
import { STEPS_10 } from "@/lib/healthMessageEn";

export default function Page() {
  return <VaccinationsStep steps={STEPS_10} basePath="/health-message" />;
}
