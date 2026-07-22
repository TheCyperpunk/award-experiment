import type { Metadata } from "next";
import AccountDeletionPage from "@/components/account-deletion/AccountDeletionPage";

export const metadata: Metadata = {
  title: "Delete your XMO account | XMO",
  description: "Request permanent deletion of your XMO account and associated data.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
  referrer: "no-referrer",
};

export default function AccountDeletionRoute() {
  return <AccountDeletionPage />;
}
