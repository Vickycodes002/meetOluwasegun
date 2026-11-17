import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { CaseStudyView } from "@/components/CaseStudyView";
import {
  getAdjacentProjects,
  getProject,
  isOnSite,
  projects,
  site,
} from "@/lib/content";

export function generateStaticParams() {
  // Projects that only live on Behance get no page on this site.
  return projects.filter(isOnSite).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  // Social platforms do not all read WebP, so prefer the dedicated share image.
  const image = project.shareImage ?? project.cover;
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} | ${site.name}`,
      description: project.summary,
      type: "article",
      url: `/work/${project.slug}`,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${project.title} case study`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | ${site.name}`,
      description: project.summary,
      images: [image],
    },
  };
}

function Block({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal className="grid gap-4 border-t border-line py-10 md:grid-cols-[1fr_2fr] md:gap-10">
      <h2 className="text-sm text-muted">{label}</h2>
      <div className="max-w-2xl space-y-5 text-lg leading-relaxed">
        {children}
      </div>
    </Reveal>
  );
}

/**
 * The page shell (nav and footer) renders straight away. The part that needs
 * the slug from the URL sits inside Suspense, which is what Next.js asks for
 * so that navigating here stays instant.
 */
export default function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Suspense fallback={<div className="min-h-dvh bg-paper" />}>
          <CaseStudyBody params={params} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

async function CaseStudyBody({
  params,
}: {
  params: PageProps<"/work/[slug]">["params"];
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || !isOnSite(project)) notFound();

  const { next } = getAdjacentProjects(project.slug);

  // Projects with a full `study` get the rich case study layout.
  if (project.study) {
    return (
      <CaseStudyView
        project={project}
        study={project.study}
        index={projects.indexOf(project) + 1}
        next={next.slug === project.slug ? undefined : next}
      />
    );
  }

  return (
    <article>
      <header className="mx-auto max-w-6xl px-5 pt-12 sm:px-8 sm:pt-16">
        <Link
          href="/#work"
          className="text-sm text-muted transition-colors hover:text-ink"
        >
          ← All work
        </Link>
        <h1 className="display mt-6 text-[clamp(3.5rem,11vw,9rem)]">
          {project.title}
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted">
          {project.summary}
        </p>

        <dl className="mt-12 grid grid-cols-2 gap-6 border-y border-line py-6 text-sm md:grid-cols-4">
          <div>
            <dt className="text-muted">Year</dt>
            <dd className="mt-1">{project.year}</dd>
          </div>
          <div>
            <dt className="text-muted">Role</dt>
            <dd className="mt-1">{project.role}</dd>
          </div>
          <div>
            <dt className="text-muted">Scope</dt>
            <dd className="mt-1">{project.tags.join(", ")}</dd>
          </div>
          {project.collaborators && (
            <div>
              <dt className="text-muted">With</dt>
              <dd className="mt-1">{project.collaborators.join(", ")}</dd>
            </div>
          )}
        </dl>
      </header>

      <div className="mx-auto mt-10 max-w-6xl px-5 sm:px-8">
        <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-line">
          <Image
            src={project.cover}
            alt={`${project.title} cover`}
            fill
            priority
            sizes="(min-width: 1152px) 1088px, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-6xl px-5 sm:px-8">
        <Block label="Overview">
          {project.overview.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          {project.liveUrl && (
            <p>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent px-1.5 py-0.5"
              >
                Visit the live project ↗
              </a>
            </p>
          )}
        </Block>
        <Block label="The challenge">
          <p>{project.challenge}</p>
        </Block>
        <Block label="The approach">
          <p>{project.approach}</p>
        </Block>
        <Block label="The outcome">
          <p>{project.outcome}</p>
        </Block>
      </div>

      <div className="mx-auto mt-10 max-w-6xl space-y-6 px-5 sm:px-8">
        {project.gallery.map((g) => (
          <Reveal key={g.src}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-line">
              <Image
                src={g.src}
                alt={g.alt}
                fill
                sizes="(min-width: 1152px) 1088px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        ))}
      </div>

      <nav
        aria-label="Next project"
        className="mx-auto mt-24 max-w-6xl border-t border-line px-5 py-16 sm:px-8"
      >
        <p className="text-sm text-muted">Next project</p>
        <Link
          href={`/work/${next.slug}`}
          className="display group mt-3 inline-block text-[clamp(3rem,9vw,7rem)] transition-colors hover:bg-accent"
        >
          {next.title}
          <span
            aria-hidden
            className="ml-4 inline-block transition-transform group-hover:translate-x-2"
          >
            →
          </span>
        </Link>
      </nav>
    </article>
  );
}
