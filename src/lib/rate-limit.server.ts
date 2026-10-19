import { getRequestHeader } from "@tanstack/react-start/server";

/**
 * Best-effort, in-memory fixed-window rate limiter for server functions.
 *
 * Serverless instances each keep their own counters and are recycled, so this
 * blunts casual abuse (scripted order spam, order-number guessing, burning AI
 * credits) but is not a hard guarantee. For a strict global limit, back this
 * with a shared store (e.g. Upstash Redis) or Vercel WAF rate-limit rules.
 */
const buckets = new Map<string, { count: number; resetAt: number }>();
const MAX_BUCKETS = 10_000;

export function clientIp(): string {
  const forwarded = getRequestHeader("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    getRequestHeader("x-real-ip")?.trim() ||
    getRequestHeader("cf-connecting-ip")?.trim();
  return ip || "unknown";
}

export class RateLimitError extends Error {
  constructor(message = "Too many requests. Please wait a moment and try again.") {
    super(message);
    this.name = "RateLimitError";
  }
}

/** Throws RateLimitError when `key` exceeds `limit` hits within `windowMs`. */
export function enforceRateLimit(scope: string, limit: number, windowMs: number, key = clientIp()) {
  const now = Date.now();
  const id = `${scope}:${key}`;
  const bucket = buckets.get(id);

  if (!bucket || bucket.resetAt <= now) {
    if (buckets.size >= MAX_BUCKETS) {
      for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
      if (buckets.size >= MAX_BUCKETS) buckets.clear();
    }
    buckets.set(id, { count: 1, resetAt: now + windowMs });
    return;
  }

  bucket.count += 1;
  if (bucket.count > limit) throw new RateLimitError();
}
