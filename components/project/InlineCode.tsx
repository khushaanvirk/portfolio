import { Fragment } from "react";

interface Props {
  text: string;
}

/**
 * Renders `backtick-wrapped` spans in project prose as inline code. Project
 * copy is plain text, not markdown, so without this the backticks render as
 * literal characters. Odd-indexed segments of the split are the code spans;
 * an unclosed backtick leaves a trailing plain segment, which is correct.
 */
export default function InlineCode({ text }: Props) {
  if (!text.includes("`")) return <>{text}</>;

  return (
    <>
      {text.split("`").map((segment, i) =>
        i % 2 === 1 ? (
          <code
            key={i}
            className="font-mono text-[0.875em] text-[#F5F5F5] bg-[#1F1F1F] border border-[#1F1F1F] rounded px-1.5 py-0.5 print:bg-transparent print:text-black print:border-black/30"
          >
            {segment}
          </code>
        ) : (
          <Fragment key={i}>{segment}</Fragment>
        )
      )}
    </>
  );
}
