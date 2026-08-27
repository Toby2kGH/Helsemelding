import { MedicinesStep } from "@/components/en/MedicinesStep";
import { STEPS_10 } from "@/lib/healthMessageEn";

export default function Page() {
  return <MedicinesStep steps={STEPS_10} basePath="/health-message" />;
}
