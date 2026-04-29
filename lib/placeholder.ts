// Detection helper for in-content TODO placeholders so detail pages can
// degrade gracefully (no broken images, no dead links) until the user fills
// in the missing info. Convention: a string that starts with "[TODO" is a
// placeholder.
export function isPlaceholder(value: string | undefined | null): boolean {
  if (!value) return false;
  return value.trimStart().startsWith("[TODO");
}
