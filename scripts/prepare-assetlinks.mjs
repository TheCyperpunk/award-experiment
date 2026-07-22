import { mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const packageName = "com.xmo.xmo";
const fingerprint = (process.env.XMO_ANDROID_APP_SIGNING_SHA256 ?? "")
  .trim()
  .toUpperCase();
const outputPath = resolve("public/.well-known/assetlinks.json");
const fingerprintPattern = /^(?:[0-9A-F]{2}:){31}[0-9A-F]{2}$/;
const isNetlifyBuild = process.env.NETLIFY === "true";

if (!fingerprint) {
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

if (!fingerprintPattern.test(fingerprint)) {
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
      sha256_cert_fingerprints: [fingerprint],
    },
  },
];

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(assetLinks, null, 2)}\n`, "utf8");
console.log(`Generated assetlinks.json for ${packageName}.`);
