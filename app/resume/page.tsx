import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resume · Khushaan Virk",
  description:
    "Resume for Khushaan Virk — Electrical Engineering student at UBC. Embedded systems, PCB design, and hardware-software integration.",
};

export default function ResumePage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-10">
      <div className="mb-6 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center text-secondary transition-colors hover:text-white"
        >
          Back to Khushaan Virk
        </Link>
        <a
          href="/resume.pdf"
          download="Khushaan_Virk_Resume.pdf"
          className="inline-flex min-h-11 items-center underline decoration-[#4A4A4D] underline-offset-4 transition-colors hover:text-white"
        >
          Download PDF
        </a>
      </div>

      <h1 className="mb-6 text-[28px] font-medium leading-tight tracking-[-0.02em]">
        Resume
      </h1>

      <div className="h-[85vh] w-full overflow-hidden rounded-[10px] border border-border bg-surface">
        <object
          data="/resume.pdf"
          type="application/pdf"
          className="h-full w-full"
          aria-label="Khushaan Virk resume PDF"
        >
          <div className="flex h-full w-full items-center justify-center p-8 text-center">
            <p className="text-secondary">
              Your browser cannot display the PDF inline.{" "}
              <a
                href="/resume.pdf"
                className="text-primary underline hover:no-underline"
              >
                Download it here
              </a>
              .
            </p>
          </div>
        </object>
      </div>
    </main>
  );
}
