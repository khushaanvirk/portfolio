import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resume · Khushaan Virk",
  description:
    "Resume for Khushaan Virk — Electrical Engineering student at UBC. Embedded systems, PCB design, and hardware-software integration.",
};

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5]">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors"
          >
            ← Back to khushaanvirk.com
          </Link>
          <a
            href="/resume.pdf"
            download="Khushaan_Virk_Resume.pdf"
            className="rounded-md border border-[#262626] bg-[#171717] px-4 py-2 text-sm text-[#F5F5F5] hover:bg-[#262626] transition-colors"
          >
            Download PDF
          </a>
        </div>

        <h1 className="mb-2 text-2xl font-semibold">Khushaan Virk — Resume</h1>
        <p className="mb-6 text-sm text-[#A3A3A3]">
          Electrical Engineering student at UBC. Embedded systems, PCB design,
          and hardware-software integration.
        </p>

        <div className="h-[85vh] w-full overflow-hidden rounded-md border border-[#262626] bg-[#171717]">
          <object
            data="/resume.pdf"
            type="application/pdf"
            className="h-full w-full"
            aria-label="Khushaan Virk resume PDF"
          >
            <div className="flex h-full w-full items-center justify-center p-8 text-center">
              <p className="text-sm text-[#A3A3A3]">
                Your browser cannot display the PDF inline.{" "}
                <a
                  href="/resume.pdf"
                  className="text-[#F5F5F5] underline hover:no-underline"
                >
                  Download it here
                </a>
                .
              </p>
            </div>
          </object>
        </div>
      </div>
    </main>
  );
}
