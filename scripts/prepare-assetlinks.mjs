import { mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const packageName = "com.xmo.xmo";
const primaryFingerprint = (process.env.XMO_ANDROID_APP_SIGNING_SHA256 ?? "")
  .trim()
  .toUpperCase();
const debugFingerprint =
  "07:5E:98:55:4B:3F:80:A0:CA:AC:1D:FE:A1:85:43:2E:62:6C:B7:08:7E:44:01:50:B5:9D:50:AB:CF:61:15:47";
const localReleaseFingerprint =
  "3B:58:20:A0:35:70:7F:9F:B9:F0:DA:C4:A9:E7:D6:35:73:60:C7:F3:6E:44:25:48:9F:7F:5E:12:88:0F:62:D0";
const outputPath = resolve("public/.well-known/assetlinks.json");
const fingerprintPattern = /^(?:[0-9A-F]{2}:){31}[0-9A-F]{2}$/;
const isNetlifyBuild = process.env.NETLIFY === "true";

if (!primaryFingerprint) {
  await rm(outputPath, { force: true });
  if (isNetlifyBuild) {
    throw new Error(
      "XMO_ANDROID_APP_SIGNING_SHA256 is required for verified Android App Links.",
    );
  }
  console.warn(
    "Skipping assetlinks.json locally: XMO_ANDROID_APP_SIGNING_SHA256 is not set.",
  );
  process.exit(0);
}

const fingerprints = Array.from(
  new Set([primaryFingerprint, debugFingerprint, localReleaseFingerprint]),
);
const invalidFingerprint = fingerprints.find(
  (candidate) => !fingerprintPattern.test(candidate),
);
if (invalidFingerprint != null) {
  throw new Error(
    "XMO_ANDROID_APP_SIGNING_SHA256 must be a colon-separated SHA-256 fingerprint.",
  );
}

const assetLinks = [
  {
    relation: ["delegate_permission/common.handle_all_urls"],
    target: {
      namespace: "android_app",
      package_name: packageName,
      sha256_cert_fingerprints: fingerprints,
    },
  },
];

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(assetLinks, null, 2)}\n`, "utf8");
console.log(`Generated assetlinks.json for ${packageName}.`);
