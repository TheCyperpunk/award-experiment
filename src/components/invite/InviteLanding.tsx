"use client";

import { useEffect, useMemo, useState } from "react";
import { FiArrowUpRight, FiDownload, FiHash, FiUsers } from "react-icons/fi";

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
  if (candidate.joinMode !== "join" && candidate.joinMode !== "knock") return null;

  const name = typeof candidate.name === "string" ? candidate.name.trim() : "";
  if (!name) return null;

  const rawMemberCount = Number(candidate.memberCount);
  const memberCount = Number.isFinite(rawMemberCount)
    ? Math.max(0, Math.trunc(rawMemberCount))
    : 0;
  const topic = typeof candidate.topic === "string" ? candidate.topic.trim() : "";

  return {
    type: candidate.type,
    joinMode: candidate.joinMode,
    name,
    memberCount,
    ...(topic ? { topic } : {}),
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
      } catch (error) {
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
    <main className="min-h-dvh bg-[#090e12] px-5 py-8 text-white">
      <div className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-[430px] flex-col">
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
        <div className="flex flex-1 items-center justify-center py-10">{children}</div>
        <p className="text-center text-xs text-white/40">
          Only continue if you trust the person who shared this invite.
        </p>
      </div>
    </main>
  );
}

function InviteStatus({ title, text }: { title?: string; text: string }) {
  return (
    <InviteShell>
      <section className="w-full text-center" aria-live="polite">
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
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-8 font-semibold text-[#090e12]"
          >
            Go to XMO
          </a>
        )}
      </section>
    </InviteShell>
  );
}

function InviteDetails({ invite, token }: { invite: InvitePreview; token: string }) {
  const typeLabel = invite.type === "channel" ? "Channel" : "Group";
  const memberLabel = `${invite.memberCount} ${invite.memberCount === 1 ? "member" : "members"}`;
  const openUrl = useMemo(() => `xmo://join/${encodeURIComponent(token)}`, [token]);
  const TypeIcon = invite.type === "channel" ? FiHash : FiUsers;

  return (
    <InviteShell>
      <section className="w-full text-center">
        <div className="mx-auto grid size-24 place-items-center rounded-full bg-[#20262c] text-[#98ed2f]">
          <TypeIcon className="size-10" aria-hidden="true" />
        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#98ed2f]">
          XMO {typeLabel} invite
        </p>
        <h1 className="mt-2 text-3xl font-semibold leading-tight [overflow-wrap:anywhere]">
          {invite.name}
        </h1>
        <p className="mt-2 text-[15px] text-white/55">{memberLabel}</p>

        {invite.topic && (
          <p className="mx-auto mt-5 max-w-[36ch] text-[15px] leading-6 text-white/75">
            {invite.topic}
          </p>
        )}

        <p className="mx-auto mt-6 max-w-[36ch] rounded-lg bg-[#12181d] px-4 py-3 text-sm leading-5 text-white/60">
          {invite.joinMode === "knock"
            ? `Open XMO to review this ${typeLabel.toLowerCase()} and request to join.`
            : `Open XMO to review and join this ${typeLabel.toLowerCase()}.`}
        </p>

        <div className="mt-7 grid gap-3">
          <a
            href={openUrl}
            rel="noreferrer"
            className="flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-white px-6 font-semibold text-[#090e12]"
          >
            Open XMO
            <FiArrowUpRight className="size-5" aria-hidden="true" />
          </a>
          <a
            href={APK_URL}
            rel="noreferrer"
            referrerPolicy="no-referrer"
            className="flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#252b31] px-6 font-semibold text-white"
          >
            <FiDownload className="size-5" aria-hidden="true" />
            Download XMO
          </a>
        </div>
      </section>
    </InviteShell>
  );
}
