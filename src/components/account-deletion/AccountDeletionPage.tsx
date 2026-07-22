"use client";

import { FormEvent, useState } from "react";
import { FiAlertTriangle, FiCheck, FiMail, FiTrash2 } from "react-icons/fi";

const API_BASE =
  "https://xmo-matrix.centralindia.cloudapp.azure.com/account-deletion";

type Stage = "request" | "confirm" | "deleted";
type Notice = { kind: "info" | "error"; text: string } | null;

function normalizeUsername(value: string) {
  return value.trim().replace(/^@/, "");
}

async function post(path: string, body: Record<string, string>) {
  const response = await fetch(`${API_BASE}/${path}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
    credentials: "omit",
    referrerPolicy: "no-referrer",
  });

  const payload = (await response.json().catch(() => null)) as
    | Record<string, unknown>
    | null;
  if (!response.ok || payload?.success === false) {
    const message =
      typeof payload?.error === "string"
        ? payload.error
        : "The request could not be completed. Please try again.";
    throw new Error(message);
  }
  return payload;
}

export default function AccountDeletionPage() {
  const [stage, setStage] = useState<Stage>("request");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);

  const requestCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setNotice(null);
    try {
      const payload = await post("request", {
        username: normalizeUsername(username),
        email: email.trim(),
      });
      setStage("confirm");
      setNotice({
        kind: "info",
        text:
          typeof payload?.message === "string"
            ? payload.message
            : "If the account details match, a deletion code was sent.",
      });
    } catch (error) {
      setNotice({
        kind: "error",
        text: error instanceof Error ? error.message : "Request failed.",
      });
    } finally {
      setBusy(false);
    }
  };

  const deleteAccount = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!window.confirm("Permanently delete this XMO account? This cannot be undone.")) {
      return;
    }
    setBusy(true);
    setNotice(null);
    try {
      await post("confirm", {
        username: normalizeUsername(username),
        email: email.trim(),
        otp: code.trim(),
      });
      setStage("deleted");
      setNotice(null);
    } catch (error) {
      setNotice({
        kind: "error",
        text: error instanceof Error ? error.message : "Deletion failed.",
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="min-h-dvh bg-[#090e12] px-5 py-8 text-white">
      <div className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-[460px] flex-col">
        <a
          href="/"
          className="mx-auto flex items-center gap-3 text-xl font-bold tracking-[0.08em]"
          aria-label="XMO home"
        >
          <img
            src="/img/cropped_circle_image(1)(1).png"
            alt=""
            className="size-10 rounded-full object-cover"
          />
          XMO
        </a>

        <section className="my-auto py-10">
          {stage === "deleted" ? (
            <DeletedState />
          ) : (
            <>
              <div className="text-center">
                <div className="mx-auto grid size-16 place-items-center rounded-full bg-[#2a171a] text-[#ff8585]">
                  <FiTrash2 className="size-7" aria-hidden="true" />
                </div>
                <h1 className="mt-5 text-3xl font-semibold">Delete your XMO account</h1>
                <p className="mx-auto mt-3 max-w-[40ch] text-[15px] leading-6 text-white/55">
                  Use this page if you cannot access the app. Deletion is permanent and cannot be undone.
                </p>
              </div>

              <DeletionSummary />

              {stage === "request" ? (
                <form className="mt-7 space-y-5" onSubmit={requestCode}>
                  <Field
                    id="username"
                    label="XMO username"
                    value={username}
                    onChange={setUsername}
                    placeholder="@username"
                    autoComplete="username"
                    maxLength={64}
                  />
                  <Field
                    id="email"
                    label="Verified email"
                    value={email}
                    onChange={setEmail}
                    placeholder="you@example.com"
                    type="email"
                    autoComplete="email"
                    maxLength={254}
                  />
                  <PrimaryButton busy={busy}>Send deletion code</PrimaryButton>
                </form>
              ) : (
                <form className="mt-7 space-y-5" onSubmit={deleteAccount}>
                  <div className="rounded-lg bg-[#12181d] px-4 py-3 text-sm leading-5 text-white/65">
                    <FiMail className="mr-2 inline size-4" aria-hidden="true" />
                    Enter the 6-digit code sent to your verified email. It expires in 10 minutes.
                  </div>
                  <Field
                    id="code"
                    label="Deletion code"
                    value={code}
                    onChange={(value) => setCode(value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="000000"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                  />
                  <button
                    type="submit"
                    disabled={busy || code.length !== 6}
                    className="flex min-h-[52px] w-full items-center justify-center rounded-full bg-[#df5d65] px-6 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    {busy ? "Deleting..." : "Permanently delete account"}
                  </button>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => {
                      setStage("request");
                      setCode("");
                      setNotice(null);
                    }}
                    className="min-h-11 w-full text-sm font-semibold text-white/65 disabled:opacity-45"
                  >
                    Use different account details
                  </button>
                </form>
              )}

              {notice && (
                <p
                  className={`mt-5 rounded-lg px-4 py-3 text-sm leading-5 ${
                    notice.kind === "error"
                      ? "bg-[#2a171a] text-[#ff9aa0]"
                      : "bg-[#172216] text-[#b7e77d]"
                  }`}
                  role={notice.kind === "error" ? "alert" : "status"}
                >
                  {notice.text}
                </p>
              )}
            </>
          )}
        </section>

        <p className="text-center text-xs leading-5 text-white/40">
          Need help?{" "}
          <a className="text-white/70 underline" href="mailto:support@xmo.dpdns.org">
            support@xmo.dpdns.org
          </a>
        </p>
      </div>
    </main>
  );
}

function DeletionSummary() {
  return (
    <div className="mt-7 rounded-lg bg-[#12181d] p-5">
      <div className="flex gap-3">
        <FiAlertTriangle className="mt-0.5 size-5 shrink-0 text-[#ff8585]" aria-hidden="true" />
        <div className="text-sm leading-6 text-white/65">
          <p className="font-semibold text-white">Deletion removes:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Your XMO login, devices, security keys, notifications, profile, and memberships where deletion is supported.</li>
            <li>Your XMO directory, recovery, report, invite, and channel analytics records.</li>
          </ul>
          <p className="mt-3 text-[#ff9aa0]">
            Messages and media already delivered to other users or connected services may remain. Uploaded media may remain under retention rules.
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  inputMode,
  autoComplete,
  maxLength,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  inputMode?: "text" | "email" | "numeric";
  autoComplete?: string;
  maxLength: number;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-white/80">
        {label}
      </label>
      <input
        id={id}
        required
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        maxLength={maxLength}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="min-h-[52px] w-full rounded-full border border-white/30 bg-[#2b2c30] px-5 text-base text-white outline-none placeholder:text-white/35 focus:border-white"
      />
    </div>
  );
}

function PrimaryButton({ busy, children }: { busy: boolean; children: React.ReactNode }) {
  return (
    <button
      type="submit"
      disabled={busy}
      className="flex min-h-[52px] w-full items-center justify-center rounded-full bg-white px-6 font-semibold text-[#090e12] disabled:cursor-not-allowed disabled:opacity-45"
    >
      {busy ? "Sending..." : children}
    </button>
  );
}

function DeletedState() {
  return (
    <div className="text-center" role="status">
      <div className="mx-auto grid size-20 place-items-center rounded-full bg-[#172216] text-[#98ed2f]">
        <FiCheck className="size-9" aria-hidden="true" />
      </div>
      <h1 className="mt-6 text-3xl font-semibold">Account deleted</h1>
      <p className="mx-auto mt-3 max-w-[38ch] text-[15px] leading-6 text-white/55">
        Your XMO account has been deactivated and associated XMO service records were removed where supported.
      </p>
      <a
        href="/"
        className="mt-8 inline-flex min-h-[52px] items-center justify-center rounded-full bg-white px-8 font-semibold text-[#090e12]"
      >
        Return to XMO
      </a>
    </div>
  );
}
