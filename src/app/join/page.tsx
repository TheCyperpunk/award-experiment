import type { Metadata } from "next";
import InviteLanding from "@/components/invite/InviteLanding";

export const metadata: Metadata = {
  title: "Open invite | XMO",
  description: "Review and open an XMO group or channel invite.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
  referrer: "no-referrer",
};

export default function JoinPage() {
  return <InviteLanding />;
}
