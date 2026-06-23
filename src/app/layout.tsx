import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "XMO Messenger | Decentralized Private Messaging App",
  description:
    "XMO is a decentralized messaging app with end-to-end encrypted private chats, secure group messaging, layered channels, voice and video calling, blockchain-verified identity, and a built-in mini-app ecosystem — all powered by Web3.",
  keywords: [
    "XMO",
    "XMO app",
    "XMO messenger",
    "xmoapp",
    "messaging app",
    "decentralized messaging app",
    "private messenger",
    "encrypted chat app",
    "secure messaging",
    "Web3 messenger",
    "blockchain chat",
    "decentralized chat",
    "private calling app",
    "group messaging app",
    "end-to-end encrypted messenger",
    "P2P messaging",
    "layered groups",
    "channels",
    "decentralized communication",
  ],
  authors: [{ name: "XMO" }],
  robots: "index, follow",
  metadataBase: new URL("https://xmo.dpdns.org"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://xmo.dpdns.org/",
    title: "XMO Messenger | Decentralized Private Messaging App",
    description:
      "XMO is a decentralized messaging app with end-to-end encrypted private chats, secure group messaging, layered channels, and blockchain-verified identity — all powered by Web3.",
    images: [
      {
        url: "/img/about.webp",
      },
    ],
    siteName: "XMO Messenger",
  },
  twitter: {
    card: "summary_large_image",
    title: "XMO Messenger | Decentralized Private Messaging App",
    description:
      "XMO is a decentralized messaging app with end-to-end encrypted private chats, secure group messaging, layered channels, and blockchain-verified identity — all powered by Web3.",
    images: ["/img/about.webp"],
  },
  icons: {
    icon: "/favicon.png",
  },
  other: {
    "theme-color": "#000000",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MobileApplication",
              name: "XMO Messenger",
              alternateName: ["XMO", "XMO App", "xmoapp"],
              url: "https://xmo.dpdns.org",
              operatingSystem: "iOS, Android, Web",
              applicationCategory: "CommunicationApplication",
              applicationSubCategory: "Messaging",
              description:
                "XMO Messenger is a decentralized messaging app offering end-to-end encrypted private chats, secure group messaging, layered channels, voice and video calling, blockchain-verified identity, and a built-in mini-app ecosystem.",
              featureList:
                "End-to-end encryption, Decentralized messaging, Private chats, Group messaging, Layered channels, Voice calling, Video calling, Blockchain identity, Mini-apps, Web3 integration",
              offers: {
                "@type": "Offer",
                price: "0.00",
                priceCurrency: "USD",
              },
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
