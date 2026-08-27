import { MedicinesStep } from "@/components/en/MedicinesStep";
import { STEPS_11 } from "@/lib/healthMessageEn";

export default function Page() {
  return <MedicinesStep steps={STEPS_11} basePath="/health-message-plus" />;
}
