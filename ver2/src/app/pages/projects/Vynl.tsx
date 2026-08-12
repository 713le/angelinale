import { motion } from "motion/react"
import { useInView } from "../../hooks"
import { FG, AC, BDRC, MUTED, MONO, BG } from "../../constants"
import ProjectHero from "../../components/ProjectHero"
import CaseStudyNav from "../../components/CaseStudyNav"
import Footer from "../../components/Footer"

const NAV_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "discovery", label: "Discovery" },
  { id: "process", label: "Process" },
  { id: "features", label: "Features" },
  { id: "reflection", label: "Reflection" },
]

function Section({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  const { ref, vis } = useInView("-40px")
  return (
    <motion.section id={id} ref={ref as React.RefObject<HTMLElement>}
      className="px-4 md:px-8 py-20 border-t" style={{ borderColor: BDRC }}
      initial={{ opacity: 0, y: 24 }} animate={vis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55 }}>
      <p className="text-[0.58rem] tracking-[0.2em] uppercase mb-8" style={{ fontFamily: MONO, color: AC }}>{label}</p>
      {children}
    </motion.section>
  )
}

function SectionHeading({ children }: { children: string }) {
  return <h2 style={{ fontFamily: MONO, fontSize: "clamp(1.4rem,3.5vw,2.4rem)", fontWeight: 500, color: FG, textTransform: "uppercase", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "1.5rem" }}>{children}</h2>
}

function Body({ children }: { children: React.ReactNode }) {
  return <p className="text-sm uppercase leading-[1.9] max-w-2xl" style={{ fontFamily: MONO, color: MUTED }}>{children}</p>
}

function Tag({ children }: { children: string }) {
  return <span className="text-[0.58rem] px-3 py-1.5 uppercase tracking-widest" style={{ fontFamily: MONO, border: `1px solid ${AC}40`, color: AC }}>{children}</span>
}

function IterationCard({ num, label, problem, fix }: { num: string; label: string; problem: string; fix: string }) {
  return (
    <div className="p-6 border" style={{ borderColor: BDRC }}>
      <p className="text-[0.55rem] tracking-widest uppercase mb-2" style={{ fontFamily: MONO, color: AC }}>{num}</p>
      <h4 className="text-xs font-bold uppercase mb-4" style={{ fontFamily: MONO, color: FG }}>{label}</h4>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-[0.58rem] tracking-widest uppercase mb-1.5" style={{ fontFamily: MONO, color: MUTED }}>Problem discovered</p>
          <p className="text-xs uppercase leading-relaxed" style={{ fontFamily: MONO, color: FG }}>{problem}</p>
        </div>
        <div>
          <p className="text-[0.58rem] tracking-widest uppercase mb-1.5" style={{ fontFamily: MONO, color: AC }}>What changed</p>
          <p className="text-xs uppercase leading-relaxed" style={{ fontFamily: MONO, color: FG }}>{fix}</p>
        </div>
      </div>
    </div>
  )
}

export default function Vynl() {
  return (
    <div style={{ paddingBottom: "60px" }}>
      <ProjectHero
        eyebrow="Case Study — Personal Project"
        title="VYNL"
        tagline="A music rating platform using binary search algorithms to rank albums efficiently. Users compare albums across sentiment tiers, with dynamic score redistribution and social features powered by the iTunes API."
      />

      {/* Metadata grid */}
      <div className="px-4 md:px-8 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-b py-8" style={{ borderColor: BDRC }}>
          {[
            { label: "Role", value: "Full-Stack Developer" },
            { label: "Stack", value: "React · PostgreSQL · Supabase" },
            { label: "Timeline", value: "March 2026 — June 2026" },
            { label: "Status", value: "Shipped ✓" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-[0.55rem] tracking-[0.18em] uppercase mb-1.5" style={{ fontFamily: MONO, color: AC }}>{label}</p>
              <p className="text-xs uppercase font-bold" style={{ fontFamily: MONO, color: FG }}>{value}</p>
            </div>
          ))}
        </div>
        <div className="pt-6">
          <a href="https://vynl-music.vercel.app/" target="_blank" rel="noopener noreferrer" data-noblue="1"
            className="inline-flex items-center gap-3 px-5 py-3 text-xs tracking-widest uppercase no-underline font-bold transition-opacity"
            style={{ fontFamily: MONO, background: AC, color: BG, cursor: "none" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.8" }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1" }}>
            view live site ↗
          </a>
        </div>
      </div>

      {/* Hero image */}
      <div className="px-4 md:px-8 mb-4">
        <div className="w-full overflow-hidden" style={{ background: "#ddd8d0" }}>
          <img src="/photos/vynl.webp" alt="VYNL music platform" className="w-full h-auto" />
        </div>
      </div>

      <Section id="overview" label="Overview">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
          <div>
            <SectionHeading>The problem</SectionHeading>
            <Body>
              I use Letterboxd obsessively for films. It gives you a clean, permanent record of everything you&apos;ve watched and how you feel about it. Music has nothing like that. Spotify has listening history; Rate Your Music has a community — but neither solves the core problem: how do you actually figure out where an album ranks in your all-time list without spending an hour second-guessing yourself?
            </Body>
            <div className="mt-6 p-5 border-l-2" style={{ borderColor: AC, background: `${AC}06` }}>
              <p className="text-xs font-bold uppercase mb-1.5" style={{ fontFamily: MONO, color: AC }}>How might we...</p>
              <p className="text-sm uppercase" style={{ fontFamily: MONO, color: FG }}>Rank something as subjective as music with minimal comparisons and without decision fatigue?</p>
            </div>
          </div>
          <div>
            <SectionHeading>The insight</SectionHeading>
            <Body>
              Ranking <em>n</em> items by star rating requires <em>n</em> individual decisions — and stars don&apos;t tell you relative order. Binary search can rank a new item in just O(log n) comparisons. Instead of &ldquo;how many stars is this?&rdquo;, the question becomes &ldquo;is this better or worse than this one album?&rdquo; — much easier to answer, much more reliable.
            </Body>
            <div className="flex flex-wrap gap-2 mt-6">
              {["Algorithm Design", "Full-Stack", "Music UX", "Social Features", "Binary Search"].map(t => <Tag key={t}>{t}</Tag>)}
            </div>
          </div>
        </div>
      </Section>

      <Section id="discovery" label="Research & Discovery">
        <SectionHeading>Studying the space</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
          {[
            { n: "Letterboxd", note: "Gold standard for taste-tracking — but film-only, no music equivalent." },
            { n: "Rate Your Music", note: "Huge community, but star ratings suffer from grade inflation and lack of personal ranking logic." },
            { n: "Beli (restaurants)", note: "Closest inspiration — uses a head-to-head comparison system. But still limited to sequential comparisons, not binary search." },
          ].map(({ n, note }) => (
            <div key={n} className="p-5 border" style={{ borderColor: BDRC }}>
              <p className="text-xs font-bold uppercase mb-2" style={{ fontFamily: MONO, color: FG }}>{n}</p>
              <p className="text-xs uppercase leading-relaxed" style={{ fontFamily: MONO, color: MUTED }}>{note}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 p-8 border-l-2" style={{ borderColor: AC, background: `${AC}04` }}>
          <p className="text-[0.6rem] tracking-widest uppercase mb-3" style={{ fontFamily: MONO, color: AC }}>Algorithm decision</p>
          <p className="text-sm uppercase leading-relaxed max-w-2xl" style={{ fontFamily: MONO, color: FG }}>
            I evaluated insertion sort (O(n) comparisons), bubble sort, and binary search. Binary search wins decisively for ranking lists — O(log n) comparisons to place any new item. For 100 albums, that&apos;s at most 7 comparisons per new addition instead of potentially 99.
          </p>
        </div>
      </Section>

      <Section id="process" label="Design Process & Iterations">
        <SectionHeading>Getting the UX right</SectionHeading>
        <Body>
          The algorithm was the easy part. Getting users to actually understand and trust what was happening took three rounds of user testing with friends.
        </Body>
        <div className="flex flex-col gap-4 mt-10">
          <IterationCard
            num="Iteration 01"
            label="Basic comparison screen"
            problem="Test users felt lost — they didn't know where in the ranking process they were, or how many comparisons were left. Two users gave up mid-flow."
            fix="Added a progress indicator showing current position in the binary search ('Placing album 12 — comparison 3 of 4'). Drop-off rate dropped to near zero."
          />
          <IterationCard
            num="Iteration 02"
            label="Tier labels added"
            problem="After rating ~30 albums, users couldn't remember which tier (Loved / Liked / OK / Disliked) an album was in without scrolling through their whole list."
            fix="Added color-coded tier badges throughout the UI. Made tier boundaries explicit during comparisons so users always had context."
          />
          <IterationCard
            num="Iteration 03"
            label="Social feature design"
            problem="First version of the profile page was just a ranked list dump — users felt it looked unpolished and didn't encourage sharing."
            fix="Redesigned profile around album artwork in a masonry-style grid, with the ranked list as a secondary view. Added follow/following with a combined social feed."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-14">
          {[
            { img: "/photos/binary.png", title: "Algorithm flow", desc: "Binary search comparison screen — 'is this better or worse than this album?' drives the entire ranking engine." },
            { img: "/photos/search-results.png", title: "Album search via iTunes API", desc: "Search any album in the iTunes catalog — metadata, artwork, and tracklist pulled automatically." },
          ].map(({ img, title, desc }) => (
            <div key={title}>
              <div className="w-full overflow-hidden mb-3" style={{ background: "#ddd8d0" }}>
                <img src={img} alt={title} className="w-full h-auto" />
              </div>
              <p className="text-[0.6rem] tracking-widest uppercase" style={{ fontFamily: MONO, color: MUTED }}>{title} — {desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="features" label="Key Features">
        <SectionHeading>What VYNL does</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2">
          {[
            { img: "/photos/binary.png", title: "Binary Search Ranking", desc: "O(log n) comparisons to rank any new album. Dynamic score redistribution across Loved / Liked / OK / Disliked tiers maintains relative order as your library grows." },
            { img: "/photos/search-results.png", title: "iTunes API Integration", desc: "Search and add any album from the iTunes catalog. Artwork, metadata, and tracklists populate automatically — zero manual entry." },
            { img: "/photos/vynl-login.png", title: "User Authentication", desc: "Secure auth with bcrypt password hashing. Persistent ratings across sessions — your rankings live in PostgreSQL, not localStorage." },
            { img: "/photos/vynl-profile.png", title: "Social Features", desc: "Follow other users, see their rankings, and compare taste. Combined social feed shows recent ratings from everyone you follow." },
          ].map(({ img, title, desc }) => (
            <div key={title} className="flex flex-col gap-4">
              <div className="w-full overflow-hidden" style={{ background: "#ddd8d0" }}>
                <img src={img} alt={title} className="w-full h-auto" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase mb-1.5" style={{ fontFamily: MONO, color: FG }}>{title}</h4>
                <p className="text-xs uppercase leading-relaxed" style={{ fontFamily: MONO, color: MUTED }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="reflection" label="Reflection">
        <SectionHeading>What I&apos;d do differently</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
          <div>
            <Body>
              VYNL taught me that algorithm elegance and UX elegance are completely separate problems. The binary search logic was implemented in a day. Getting users to understand what it was doing, and trust it, took weeks of iteration.
            </Body>
            <Body>
              <br />If I were starting over: I&apos;d spend more time on the onboarding flow — first-time users currently have to rate ~10 albums before the rankings feel meaningful, and that&apos;s a high initial ask.
            </Body>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase mb-2" style={{ fontFamily: MONO, color: FG }}>Skills built</h3>
            <div className="flex flex-wrap gap-2">
              {["Algorithm Design", "React State", "PostgreSQL", "REST APIs", "Serverless Deploy", "UX Testing", "Social UI Patterns"].map(t => <Tag key={t}>{t}</Tag>)}
            </div>
            <div className="mt-6 p-5 border" style={{ borderColor: BDRC }}>
              <p className="text-[0.58rem] tracking-widest uppercase mb-2" style={{ fontFamily: MONO, color: AC }}>What&apos;s next</p>
              <p className="text-xs uppercase leading-relaxed" style={{ fontFamily: MONO, color: MUTED }}>
                AI-generated playlist creation from your top-ranked albums. Better onboarding — a &ldquo;seed with popular albums&rdquo; flow so new users have a ranked list immediately.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Footer />
      <CaseStudyNav sections={NAV_SECTIONS} />
    </div>
  )
}
