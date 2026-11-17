// The parts of the homepage that change on their own.

/**
 * The month this build was made, e.g. "Nov 2026", from the stamp set in
 * next.config.ts. Null if the stamp is missing.
 */
export function builtMonth(timeZone: string): string | null {
  const stamp = process.env.NEXT_PUBLIC_BUILT_AT;
  if (!stamp) return null;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    timeZone,
  }).format(new Date(stamp));
}

/**
 * Current chess.com rapid rating, refreshed at most once an hour.
 * Returns null when chess.com can't be reached, so the page can fall back to
 * a plain link instead of showing a stale or made-up number.
 */
export async function getChessRapid(username: string): Promise<number | null> {
  try {
    const res = await fetch(
      `https://api.chess.com/pub/player/${username}/stats`,
      {
        headers: { "User-Agent": "khushaanvirk.com" },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return null;
    const stats = await res.json();
    const rating = stats?.chess_rapid?.last?.rating;
    return typeof rating === "number" ? rating : null;
  } catch {
    return null;
  }
}

/**
 * A streak that was `streak` days long on `date` (YYYY-MM-DD), counted forward
 * to today's calendar date in `timeZone`. It assumes no day was missed since.
 */
export function streakToday(
  date: string,
  streak: number,
  timeZone: string,
  now: Date = new Date()
): number {
  // en-CA formats a date as YYYY-MM-DD.
  const today = new Intl.DateTimeFormat("en-CA", { timeZone }).format(now);
  const days = Math.round((Date.parse(today) - Date.parse(date)) / 86_400_000);
  return streak + Math.max(0, days);
}
