import crypto from "crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "shamanth_admin_session";
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "shamanth-secret-cms-key-2026";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "shamanth2026";

export function getExpectedAdminPassword(): string {
  return ADMIN_PASSWORD;
}

export function verifyPassword(password: string): boolean {
  if (!password) return false;
  return password === ADMIN_PASSWORD;
}

export function createSessionToken(): string {
  const payload = JSON.stringify({
    role: "admin",
    createdAt: Date.now(),
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  const hmac = crypto.createHmac("sha256", SESSION_SECRET).update(payload).digest("hex");
  const token = Buffer.from(payload).toString("base64") + "." + hmac;
  return token;
}

export function verifySessionToken(token: string): boolean {
  try {
    if (!token) return false;
    const parts = token.split(".");
    if (parts.length !== 2) return false;

    const [payloadB64, signature] = parts;
    const payloadStr = Buffer.from(payloadB64, "base64").toString("utf-8");
    const expectedHmac = crypto.createHmac("sha256", SESSION_SECRET).update(payloadStr).digest("hex");

    if (signature !== expectedHmac) return false;

    const payload = JSON.parse(payloadStr);
    if (payload.role !== "admin") return false;
    if (Date.now() > payload.expiresAt) return false;

    return true;
  } catch {
    return false;
  }
}

export function isAuthenticated(): boolean {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return false;
    return verifySessionToken(token);
  } catch {
    return false;
  }
}

export { SESSION_COOKIE_NAME };
