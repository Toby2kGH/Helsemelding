import { FollowUpStep } from "@/components/en/FollowUpStep";
import { STEPS_11 } from "@/lib/healthMessageEn";

export default function Page() {
  return <FollowUpStep steps={STEPS_11} basePath="/health-message-plus" />;
}
