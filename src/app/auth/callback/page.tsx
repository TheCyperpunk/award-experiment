import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return to XMO",
  description: "Return to the XMO Android app after secure sign-in.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
  referrer: "no-referrer",
};

export default function AuthCallbackPage() {
  return (
    <main className="min-h-dvh bg-[#080d10] px-6 text-white">
      <section className="mx-auto flex min-h-dvh w-full max-w-md flex-col items-center justify-center text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl font-black text-black">
          X
        </div>
        <h1 className="text-3xl font-semibold tracking-normal">Return to XMO</h1>
        <p className="mt-4 text-base leading-7 text-white/65">
          Open this link on the Android device where XMO is installed. If XMO did
          not open, update the app and try secure sign-in again.
        </p>
      </section>
    </main>
  );
}
