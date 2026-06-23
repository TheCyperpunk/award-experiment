import type { Metadata } from "next";
import PrivacyPolicyContent from "@/components/PrivacyPolicy";

export const metadata: Metadata = {
  title: "Privacy Policy | XMO Messenger",
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />;
}
