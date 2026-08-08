"use client";

import { useEffect, useMemo, useState } from "react";
import { MdCampaign, MdGroup } from "react-icons/md";

const API_BASE = "https://xmo-matrix.centralindia.cloudapp.azure.com/auth/otp";
const APK_URL =
  "https://xmoappreleases2026.blob.core.windows.net/app-releases/xmo-latest.apk";
const TOKEN_PATTERN = /^[A-Za-z0-9_-]{40,64}$/;

type InvitePreview = {
  type: "group" | "channel";
  joinMode: "join" | "knock";
  name: string;
  memberCount: number;
  topic?: string;
  avatarUrl?: string;
};

type ViewState =
  | { status: "loading" }
  | { status: "ready"; invite: InvitePreview; token: string }
  | { status: "unavailable" };

function readInviteToken() {
  const segments = window.location.pathname.split("/").filter(Boolean);
  return segments[0] === "join" ? segments[1] ?? "" : "";
}

function parseInvite(value: unknown): InvitePreview | null {
  if (!value || typeof value !== "object") return null;

  const candidate = value as Record<string, unknown>;
  if (candidate.type !== "group" && candidate.type !== "channel") return null;
  if (candidate.joinMode !== "join" && candidate.joinMode !== "knock") {
    return null;
  }

  const name = typeof candidate.name === "string" ? candidate.name.trim() : "";
  if (!name) return null;

  const rawMemberCount = Number(candidate.memberCount);
  const memberCount = Number.isFinite(rawMemberCount)
    ? Math.max(0, Math.trunc(rawMemberCount))
    : 0;
  const topic = typeof candidate.topic === "string" ? candidate.topic.trim() : "";
  const avatarUrl =
    typeof candidate.avatarUrl === "string" ? candidate.avatarUrl.trim() : "";

  return {
    type: candidate.type,
    joinMode: candidate.joinMode,
    name,
    memberCount,
    ...(topic ? { topic } : {}),
    ...(avatarUrl ? { avatarUrl } : {}),
  };
}

export default function InviteLanding() {
  const [view, setView] = useState<ViewState>({ status: "loading" });

  useEffect(() => {
    const token = readInviteToken();
    if (!TOKEN_PATTERN.test(token)) {
      setView({ status: "unavailable" });
      return;
    }

    const controller = new AbortController();

    async function loadInvite() {
      try {
        const response = await fetch(
          `${API_BASE}/invites/${encodeURIComponent(token)}/preview`,
          {
            method: "GET",
            headers: { Accept: "application/json" },
            cache: "no-store",
            credentials: "omit",
            referrerPolicy: "no-referrer",
            signal: controller.signal,
          },
        );
        if (!response.ok) throw new Error("Invite unavailable");

        const payload = (await response.json()) as Record<string, unknown>;
        const invite = payload.success ? parseInvite(payload.invite) : null;
        if (!invite) throw new Error("Invalid invite preview");

        document.title = `${invite.name} | XMO`;
        setView({ status: "ready", invite, token });
      } catch {
        if (!controller.signal.aborted) setView({ status: "unavailable" });
      }
    }

    void loadInvite();
    return () => controller.abort();
  }, []);

  if (view.status === "loading") return <InviteStatus text="Checking invite..." />;
  if (view.status === "unavailable") {
    return (
      <InviteStatus
        title="Invite unavailable"
        text="This invite is invalid, expired, or has been disabled."
      />
    );
  }

  return <InviteDetails invite={view.invite} token={view.token} />;
}

function InviteShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-[#080c0f] text-white">
      <img
        src="/img/xmo-chat-pattern.svg"
        alt=""
        className="pointer-events-none fixed inset-0 h-full w-full object-cover opacity-[0.065] invert"
        aria-hidden="true"
      />
      <div className="relative z-10 min-h-dvh">
        <header className="bg-[#161a1d]/95">
          <div className="mx-auto flex h-16 w-full max-w-[720px] items-center justify-between px-5">
            <a
              href="/"
              className="flex items-center gap-2.5 text-xl font-bold"
              aria-label="XMO home"
            >
              <img
                src="/img/cropped_circle_image(1)(1).png"
                alt=""
                className="size-10 rounded-full object-cover"
              />
              XMO
            </a>
            <a
              href={APK_URL}
              rel="noreferrer"
              referrerPolicy="no-referrer"
              className="inline-flex min-h-9 items-center rounded-full bg-[#98ed2f] px-5 text-sm font-bold text-[#0a0e10]"
            >
              Download
            </a>
          </div>
        </header>
        <div className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-[720px] items-start px-4 py-5 sm:px-6 sm:py-6">
          {children}
        </div>
      </div>
    </main>
  );
}

function InviteStatus({ title, text }: { title?: string; text: string }) {
  return (
    <InviteShell>
      <section className="my-auto w-full text-center" aria-live="polite">
        {title ? (
          <h1 className="text-2xl font-semibold">{title}</h1>
        ) : (
          <div
            className="mx-auto mb-6 size-8 animate-spin rounded-full border-2 border-white/20 border-t-[#98ed2f]"
            aria-hidden="true"
          />
        )}
        <p className={`${title ? "mt-3" : ""} text-[15px] leading-6 text-white/55`}>
          {text}
        </p>
        {title && (
          <a
            href="/"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-lg bg-white px-8 font-semibold text-[#090e12]"
          >
            Go to XMO
          </a>
        )}
      </section>
    </InviteShell>
  );
}

function InviteAvatar({
  invite,
  token,
}: {
  invite: InvitePreview;
  token: string;
}) {
  const [failed, setFailed] = useState(false);
  const TypeIcon = invite.type === "channel" ? MdCampaign : MdGroup;
  const canLoadAvatar = Boolean(invite.avatarUrl) && !failed;

  return (
    <div className="relative mx-auto grid size-28 shrink-0 place-items-center overflow-hidden rounded-full bg-[#242a2f] text-[#98ed2f] sm:size-32">
      {canLoadAvatar ? (
        <img
          src={`${API_BASE}/invites/${encodeURIComponent(token)}/avatar`}
          alt={`${invite.name} profile`}
          className="size-full object-cover"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
        />
      ) : (
        <TypeIcon className="size-12" aria-hidden="true" />
      )}
    </div>
  );
}

function InviteDetails({ invite, token }: { invite: InvitePreview; token: string }) {
  const typeLabel = invite.type === "channel" ? "Channel" : "Group";
  const memberLabel = `${invite.memberCount} ${
    invite.type === "channel"
      ? invite.memberCount === 1
        ? "subscriber"
        : "subscribers"
      : invite.memberCount === 1
        ? "member"
        : "members"
  }`;
  const openUrl = useMemo(() => `xmo://join/${encodeURIComponent(token)}`, [token]);

  return (
    <InviteShell>
      <section className="mx-auto w-full max-w-[530px] rounded-3xl bg-[#242a2f] px-6 py-9 text-center shadow-2xl shadow-black/35 sm:px-10 sm:py-11">
        <div>
          <InviteAvatar invite={invite} token={token} />
          <h1 className="mt-6 text-3xl font-bold leading-tight [overflow-wrap:anywhere] sm:text-4xl">
            {invite.name}
          </h1>
          <p className="mt-2 text-base text-white/50">
            {typeLabel} <span className="px-1 text-white/25">·</span>{" "}
            {memberLabel}
          </p>
        </div>

        {invite.topic && (
          <p className="mx-auto mt-6 max-w-[410px] whitespace-pre-line text-base leading-7 text-white/85">
            {invite.topic}
          </p>
        )}

        <a
          href={openUrl}
          rel="noreferrer"
          className="mx-auto mt-8 flex min-h-11 w-full max-w-[220px] items-center justify-center rounded-full bg-[#98ed2f] px-6 text-base font-bold text-[#090e12]"
        >
          View in XMO
        </a>

        <p className="mx-auto mt-6 max-w-[390px] text-sm leading-6 text-white/45">
          {invite.joinMode === "knock"
            ? `An admin will review your request before you can join this ${typeLabel.toLowerCase()}.`
            : `If you have XMO, you can open and join ${invite.name} right away.`}
        </p>
      </section>
    </InviteShell>
  );
}
