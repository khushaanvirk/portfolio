import Image from "next/image";
import ProjectList from "@/components/home/ProjectList";
import LocalTime from "@/components/home/LocalTime";
import { LabelRow, Row, Section } from "@/components/home/Rows";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { builtMonth, getChessRapid, streakToday } from "@/lib/live";

// Re-render at most once an hour so the chess rating and the streak stay current.
export const revalidate = 3600;

const linkClass =
  "underline decoration-[#4A4A4D] underline-offset-4 transition-colors hover:text-white";

export default async function Home() {
  const rapid = await getChessRapid(site.chess.username);
  const streak = streakToday(
    site.duolingo.date,
    site.duolingo.streak,
    site.timeZone
  );
  const updated = builtMonth(site.timeZone);

  return (
    // 560px of text. On a wide window the container grows so the project
    // preview (380px, 72px to the right) sits inside the centred block.
    <div className="mx-auto w-full max-w-[608px] px-6 pb-24 pt-24 min-[1100px]:max-w-[1060px]">
      <main className="max-w-[560px]">
        <header className="flex items-center gap-3.5">
          <Image
            src="/avatar.png"
            alt=""
            width={48}
            height={48}
            priority
            className="h-12 w-12 shrink-0 rounded-full object-cover"
          />
          <div>
            <h1 className="font-medium">{site.name}</h1>
            <p className="text-secondary">{site.headline}</p>
          </div>
        </header>

        <nav aria-label="Links" className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
          {site.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              download={"download" in link ? link.download : undefined}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`inline-flex min-h-11 items-center ${linkClass}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Section title="Work">
          {site.work.map((job) => (
            <Row key={job.name} name={job.name} detail={job.role} note={job.when} />
          ))}
        </Section>

        <ProjectList projects={projects} />

        <Section title="Off the clock">
          <LabelRow label="Reading">{site.reading}</LabelRow>
          <LabelRow label="Finished">{site.finished}</LabelRow>
          <LabelRow label="Chess">
            <a
              href={site.chess.profile}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              {rapid === null ? "chess.com" : `${rapid} rapid on chess.com`}
            </a>
          </LabelRow>
          <LabelRow label="German">{streak}-day streak on Duolingo</LabelRow>
          <LabelRow label="Also">{site.also}</LabelRow>
        </Section>

        <footer className="mt-16 flex flex-wrap justify-between gap-x-4 gap-y-2 text-[13px] text-muted">
          <span>
            {site.location}
            <LocalTime timeZone={site.timeZone} />
          </span>
          {updated && <span>Updated {updated}</span>}
        </footer>
      </main>
    </div>
  );
}
