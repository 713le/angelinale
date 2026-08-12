import { motion } from "motion/react"
import { useInView } from "../../hooks"
import { FG, AC, BDRC, MUTED, MONO, BG } from "../../constants"
import ProjectHero from "../../components/ProjectHero"
import CaseStudyNav from "../../components/CaseStudyNav"
import Footer from "../../components/Footer"

const NAV_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "research", label: "Research" },
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

function Quote({ text, attr }: { text: string; attr: string }) {
  return (
    <div className="py-6 pl-6 my-6" style={{ borderLeft: `3px solid ${AC}` }}>
      <p className="text-sm uppercase italic mb-2" style={{ fontFamily: MONO, color: FG }}>&ldquo;{text}&rdquo;</p>
      <p className="text-[0.6rem] tracking-widest uppercase" style={{ fontFamily: MONO, color: `${AC}99` }}>— {attr}</p>
    </div>
  )
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
          <p className="text-[0.58rem] tracking-widest uppercase mb-1.5" style={{ fontFamily: MONO, color: AC }}>What I changed</p>
          <p className="text-xs uppercase leading-relaxed" style={{ fontFamily: MONO, color: FG }}>{fix}</p>
        </div>
      </div>
    </div>
  )
}

function StatCard({ stat, label }: { stat: string; label: string }) {
  return (
    <div className="p-6 border text-center" style={{ borderColor: BDRC }}>
      <p style={{ fontFamily: MONO, fontSize: "clamp(1.7rem,4vw,2.4rem)", fontWeight: 600, color: AC, letterSpacing: "-0.02em" }}>{stat}</p>
      <p className="text-[0.58rem] tracking-widest uppercase mt-2 leading-relaxed" style={{ fontFamily: MONO, color: MUTED }}>{label}</p>
    </div>
  )
}

// Feature comparison vs. existing menu / translation apps on the market.
function ComparisonTable() {
  const rows: { feature: string; menulens: boolean; others: "no" | "partial" }[] = [
    { feature: "A photo for every dish, not just a translated word", menulens: true, others: "partial" },
    { feature: "Save dietary restrictions & auto-flag conflicts", menulens: true, others: "no" },
    { feature: "Favorite individual dishes across restaurants", menulens: true, others: "no" },
    { feature: "Community-contributed menu photos", menulens: true, others: "no" },
    { feature: "In-app bilingual name & description toggle", menulens: true, others: "partial" },
  ]

  return (
    <div>
      <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${BDRC}` }}>
            <th style={{ width: "58%", padding: "1rem", textAlign: "left" }} />
            <th style={{ width: "21%", padding: "1rem", textAlign: "center" }}>
              <p className="text-[0.58rem] tracking-widest uppercase font-bold" style={{ fontFamily: MONO, color: AC }}>MenuLens</p>
            </th>
            <th style={{ width: "21%", padding: "1rem", textAlign: "center" }}>
              <p className="text-[0.58rem] tracking-widest uppercase" style={{ fontFamily: MONO, color: MUTED }}>Existing apps</p>
            </th>
          </tr>
        </thead>

        <tbody>
          {rows.map((r) => (
            <tr key={r.feature} style={{ borderBottom: `1px solid ${BDRC}` }}>
              <td style={{ padding: "1rem", verticalAlign: "middle" }}>
                <p className="text-xs uppercase" style={{ fontFamily: MONO, color: FG }}>{r.feature}</p>
              </td>
              <td style={{ padding: "1rem", textAlign: "center" }}>
                <span style={{ color: AC, fontFamily: MONO, fontSize: "0.85rem" }}>✓</span>
              </td>
              <td style={{ padding: "1rem", textAlign: "center" }}>
                <span style={{ color: MUTED, fontFamily: MONO, fontSize: "0.65rem" }} className="uppercase tracking-widest">
                  {r.others === "partial" ? "Partial" : "✕"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-[0.55rem] tracking-widest uppercase p-4" style={{ fontFamily: MONO, color: MUTED }}>
        Based on a review of Google Translate&apos;s camera mode, Yelp, and TripAdvisor menu features, June 2026.
      </p>
    </div>
  )
}

// Drop-in placeholder for a screenshot / mockup / flow-chart image with a caption.
// Replace `src` with the real asset path and edit the caption text.
function MediaBlock({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <div className="mt-8">
      <div className="w-full overflow-hidden" style={{ background: "#ddd8d0" }}>
        <img src={src} alt={alt} className="w-full h-auto" />
      </div>
      <p className="text-[0.6rem] tracking-widest uppercase mt-2" style={{ fontFamily: MONO, color: MUTED }}>{caption}</p>
    </div>
  )
}

export default function MenuLens() {
  return (
    <div style={{ paddingBottom: "60px" }}>
      <ProjectHero
        eyebrow="Case Study — Personal Project"
        title="MENULENS"
        tagline="A menu visualization app that turns dense, text-only menus into photos and translated, filterable dishes."
      />

      {/* Metadata grid */}
      <div className="px-4 md:px-8 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-b py-8" style={{ borderColor: BDRC }}>
          {[
            { label: "Role", value: "UX Design & Research" },
            { label: "Stack", value: "Figma · FigJam · Illustrator" },
            { label: "Timeline", value: "August 2026" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-[0.55rem] tracking-[0.18em] uppercase mb-1.5" style={{ fontFamily: MONO, color: AC }}>{label}</p>
              <p className="text-xs uppercase font-bold" style={{ fontFamily: MONO, color: FG }}>{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hero image — replace with your key mockup/hero shot */}
      <div className="px-4 md:px-8 mb-4">
        <div className="w-full overflow-hidden" style={{ background: "#ddd8d0" }}>
          <img src="photos/menulens-mockup-2.webp" alt="MenuLens app" className="w-full h-auto" />
        </div>
      </div>

      <Section id="overview" label="Overview">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
          <div>
            <SectionHeading>The problem</SectionHeading>
            <Body>
              At a restaurant with my parents, who speak Vietnamese, I watched them stall over a menu that was nothing but dense blocks of text. They could read the words, but the words didn&apos;t tell them what a dish actually looked like — how big it was, what it came with, whether it was the safe order or the adventurous one. They ended up ordering the same two dishes they always order, not because they wanted to, but because everything else was a gamble.
            </Body>
            <Body>
              <br />But this isn&apos;t only a language problem. I&apos;m a fluent English speaker, and I still find myself googling dishes mid-meal, searching one unfamiliar name at a time on a menu of thirty items.
            </Body>
            <div className="mt-6 p-5 border-l-2" style={{ borderColor: AC, background: `${AC}06` }}>
              <p className="text-xs font-bold uppercase mb-1.5" style={{ fontFamily: MONO, color: AC }}>How might we...</p>
              <p className="text-sm uppercase" style={{ fontFamily: MONO, color: FG }}>Turn any menu into something you can actually picture, without pulling out a second app for every dish?</p>
            </div>
          </div>
          <div>
            <SectionHeading>The goal</SectionHeading>
            <Body>
              Design an app where scanning a menu produces a visual, translated, filterable version of it in seconds — and where the work one diner does translating a menu benefits the next diner who visits that same restaurant, instead of starting from zero every time.
            </Body>
            <div className="flex flex-wrap gap-2 mt-6">
              {["Menu Literacy", "Visual Search", "Bilingual UX", "Community-Sourced", "Figma Prototype"].map(t => <Tag key={t}>{t}</Tag>)}
            </div>
          </div>
        </div>
      </Section>

      <Section id="research" label="Research">
        <SectionHeading>It wasn&apos;t just my family</SectionHeading>
        <Body>
          To check whether this was a personal gripe or a real pattern, I ran a short survey and a handful of informal interviews with a mix of bilingual and English-only speakers who just eat outside their comfort zone often.
        </Body>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <Quote text="I just order the same thing every time. I don't want to risk ordering something I don't know and not like it." attr="Interview participant" />
          <Quote text="Sometimes, seeing just a huge wall of text on a menu is overwhelming." attr="Interview participant" />
          <Quote text="I always have 30 Safari tabs open of different dishes almost every time I go to a new restaurant." attr="Interview participant" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <StatCard stat="12" label="Diners surveyed" />
          <StatCard stat="83%" label="Said a dish photo could change what they order" />
          <StatCard stat="92%" label="Have googled an unfamiliar dish they saw on a menu before ordering at a restaurant" />
        </div>

        <div className="mt-14">
          <h3 className="text-sm font-bold uppercase mb-6" style={{ fontFamily: MONO, color: FG }}>Key insights from research</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { n: "01", t: "Menu literacy isn't language literacy", d: "Even fluent English speakers were googling individual dishes at the table. Understanding the language doesn't mean recognizing the food." },
              { n: "02", t: "Every diner starts from zero", d: "The same menu gets photographed and mentally translated over and over by different people, with no way to benefit from anyone else's work." },
              { n: "03", t: "Dietary needs reset every visit", d: "People with allergies or restrictions re-scan and re-check the same information on every single visit, with no memory carried over." },
            ].map(({ n, t, d }) => (
              <div key={n} className="p-5 border" style={{ borderColor: BDRC }}>
                <p className="text-[0.55rem] tracking-widest uppercase mb-2" style={{ fontFamily: MONO, color: AC }}>{n}</p>
                <p className="text-xs font-bold uppercase mb-2" style={{ fontFamily: MONO, color: FG }}>{t}</p>
                <p className="text-xs uppercase leading-relaxed" style={{ fontFamily: MONO, color: MUTED }}>{d}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <h3 className="text-sm font-bold uppercase mb-2" style={{ fontFamily: MONO, color: FG }}>Where MenuLens fits in the market</h3>
          <Body>
            Camera-translation tools like Google Translate get you the words, but words were never the whole gap — they don't help a fluent English speaker who's never seen a dish before either. Review apps like Yelp and TripAdvisor sometimes have user-uploaded photos, but they're scattered, unlabeled, and tied to reviews rather than the menu itself. None of them let you save a dietary restriction once and have it apply everywhere, and none of them treat a translated, visualized menu as something worth sharing with the next person who walks in.
          </Body>
          <ComparisonTable />
        </div>
      </Section>

      <Section id="process" label="Design Process & Iterations">
        <SectionHeading>Three rounds of iteration</SectionHeading>
        <Body>
          I sketched early flows digitally, moved into FigJam to map the full user flow, then built and tested a high-fidelity Figma prototype with five participants across two rounds. Each round surfaced a gap between what I&apos;d designed and what people actually needed mid-meal.
        </Body>

        {/* Replace with your early paper sketches and the FigJam user-flow export */}
        <MediaBlock
          src="photos/menulens-sketches.webp"
          alt="Early digital sketches for MenuLens"
          caption="Early digital sketches — first pass at the scan-to-results flow"
        />
        <MediaBlock
          src="photos/menulens-user-flow.webp"
          alt="MenuLens user flow chart"
          caption="Full user flow — camera capture, community menu search, results, and settings"
        />

        <div className="flex flex-col gap-4 mt-10">
          <IterationCard
            num="Iteration 01"
            label="Built an in-app camera"
            problem="The first prototype handed users off to their phone's system camera to snap the menu. In testing, that hand-off broke the continuous flow of the app."
            fix="Designed a dedicated in-app camera with a repeatable shutter for multi-page menus, so scanning happens without ever leaving the app."
          />
          <IterationCard
            num="Iteration 02"
            label="Added community menus"
            problem="When two testers visited the same restaurant, the second one still had to scan and translate the whole menu from scratch, even though someone had already done that work."
            fix="Added a searchable library of community-contributed menus, so a restaurant only needs to be translated once and every diner after that gets instant results."
          />
          <IterationCard
            num="Iteration 03"
            label="Persistent dietary restriction settings"
            problem="Testers with dietary restrictions were re-checking every dish on every visit, even ones they'd already ruled out before. It felt exactly like the manual process the app was supposed to replace."
            fix="Moved dietary restrictions into Settings as a one-time toggle that applies across every menu, with conflicting dishes automatically flagged in the results."
          />
        </div>
      </Section>

      <Section id="features" label="Features">
        <SectionHeading>What MenuLens does</SectionHeading>
        <div className="grid grid-cols-1 gap-30 mt-2">
          {[
            { img: "/photos/menulens-diagram1.webp", title: "Community Menus", desc: "Search for a restaurant before you even open the camera. If someone's already scanned that menu, you get instant photos and translations" },
            { img: "/photos/menulens-diagram2.webp", title: "In-App Camera & Translation", desc: "Scan a menu directly in-app, or pull photos from your library. Multi-page capture and on-device translation turn a photographed menu into a structured, visual list of dishes." },
            { img: "/photos/menulens-diagram3.webp", title: "Visual Menu Results", desc: "Every dish gets a photo, a bilingual name and description, and a category tag. Tap to expand, favorite, or filter the whole menu down to just what you're craving." },
            { img: "/photos/menulens-diagram4.webp", title: "Dietary Restriction Settings", desc: "Set restrictions once in Settings. MenuLens applies them across every menu you view from then on, and flags conflicting dishes automatically instead of making you re-check by hand." },
          ].map(({ img, title, desc }) => (
            <div key={title} className="flex flex-col gap-6">
              <div>
                <h4 className="text-sm md:text-base font-bold uppercase mb-1.5" style={{ fontFamily: MONO, color: FG }}>{title}</h4>
              </div>
              <div>
                <p className="text-xs uppercase leading-relaxed" style={{ fontFamily: MONO, color: MUTED }}>{desc}</p>
              </div>
              <div className="w-full overflow-hidden" style={{ background: "#ddd8d0" }}>
                <img src={img} alt={title} className="w-full h-auto" />
              </div>
              
            </div>
          ))}
        </div>

        {/* Optional: drop in a few labeled mockup/screenshot close-ups here */}
        <MediaBlock
          src="photos/menulens-mockup.webp"
          alt="MenuLens mockup screens"
          caption=""
        />
        <MediaBlock
          src="photos/menulens-app-mockup.webp"
          alt="MenuLens mockup screens"
          caption=""
        />
      </Section>

      <Section id="reflection" label="Reflection">
        <SectionHeading>What I learned</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
          <div>
            <Body>
            A personal experience can be a strong starting point, but research is what turns an assumption into a meaningful design opportunity. I learned to look beyond my own perspective and use user feedback to understand what people actually need.
            </Body>
            <Body>
              <br />I also learned to stay flexible throughout my design process. Testing challenged several of my initial ideas, and being willing to rethink the solution led to a stronger UX. Going forward, I want to keep designing with curiosity, validating early, and letting research guide my decisions.
            </Body>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase mb-2" style={{ fontFamily: MONO, color: FG }}>Skills built</h3>
            <div className="flex flex-wrap gap-2">
              {["User Research", "Survey Design", "Figma Prototyping", "Information Architecture", "Bilingual UX", "Usability Testing", "Competitive Analysis"].map(t => <Tag key={t}>{t}</Tag>)}
            </div>
          </div>
        </div>
      </Section>

      <Footer />
      <CaseStudyNav sections={NAV_SECTIONS} />
    </div>
  )
}