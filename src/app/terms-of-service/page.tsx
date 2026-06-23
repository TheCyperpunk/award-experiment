import type { Metadata } from "next";
import TermsOfServiceContent from "@/components/TermsOfService";

export const metadata: Metadata = {
  title: "Terms of Service | XMO Messenger",
};

export default function TermsOfServicePage() {
  return <TermsOfServiceContent />;
}
