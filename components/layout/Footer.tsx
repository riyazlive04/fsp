import Link from "next/link";
import { footerNav, joinHref, site } from "@/data/site";
import { Logo } from "@/components/ui/Logo";
import { Arrow } from "@/components/ui/Arrow";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="tone-navy relative overflow-hidden">
      <div className="container-fsp pt-20 md:pt-28">
        <div className="grid-fsp gap-y-14">
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <Link href="/" className="block w-[150px] md:w-[180px]" aria-label="FSP home">
              <Logo tone="dark" sizes="180px" />
            </Link>
            <p className="mt-8 max-w-sm text-on-dark-muted">
              FSP is not just a course for trainers. It is a growth ecosystem for facilitators.
            </p>
            <Link
              href={joinHref}
              className="group/f mt-10 inline-flex min-h-14 items-center gap-3 bg-orange px-7 text-xs font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-white"
            >
              Join FSP
              <Arrow className="transition-transform duration-300 group-hover/f:-translate-y-0.5 group-hover/f:translate-x-0.5" />
            </Link>
          </div>

          {footerNav.map((group) => (
            <nav key={group.heading} aria-label={group.heading} className="col-span-2 md:col-span-2 lg:col-span-2">
              <h2 className="eyebrow text-on-dark-muted">{group.heading}</h2>
              <ul className="mt-5 space-y-1">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="inline-flex min-h-10 items-center text-[0.95rem] transition-colors hover:text-orange">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div
        aria-hidden="true"
        data-text="Learn. Lead. Impact."
        className="font-display mt-20 select-none whitespace-nowrap text-center text-[11.4vw] leading-[0.8] text-white/[0.07] before:content-[attr(data-text)] md:mt-28"
      />

      <div className="container-fsp flex flex-col gap-2 border-t border-line-dark py-6 text-xs text-on-dark-muted md:flex-row md:items-center md:justify-between">
        <p>
          © {year} {site.name}. Founded by {site.founder}.
        </p>
        <p className="eyebrow">{site.tagline}</p>
      </div>
    </footer>
  );
}
