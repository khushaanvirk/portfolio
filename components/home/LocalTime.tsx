"use client";

import { useSyncExternalStore } from "react";

function subscribe(onTick: () => void) {
  const id = setInterval(onTick, 15_000);
  return () => clearInterval(id);
}

/**
 * The current time in `timeZone`, e.g. " · 10:42 PM". Renders nothing on the
 * server, because the time is only right in the visitor's browser.
 */
export default function LocalTime({ timeZone }: { timeZone: string }) {
  const time = useSyncExternalStore(
    subscribe,
    () =>
      new Intl.DateTimeFormat("en-US", {
        timeZone,
        hour: "numeric",
        minute: "2-digit",
      }).format(new Date()),
    () => ""
  );
  return time ? <span> · {time}</span> : null;
}
