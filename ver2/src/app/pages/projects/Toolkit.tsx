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
          <p className="text-[0.58rem] tracking-widest uppercase mb-1.5" style={{ fontFamily: MONO, color: AC }}>What we changed</p>
          <p className="text-xs uppercase leading-relaxed" style={{ fontFamily: MONO, color: FG }}>{fix}</p>
        </div>
      </div>
    </div>
  )
}

export default function Toolkit() {
  return (
    <div style={{ paddingBottom: "60px" }}>
      <ProjectHero
        eyebrow="Case Study — Senior Capstone"
        title="TOOLKIT FOR DISABILITY WELLBEING"
        tagline="A digital platform pairing an existing physical resource toolkit to help disabled residents of Bethlehem, PA find resources, report barriers, and connect with their community — all in one place."
      />

      {/* Metadata grid */}
      <div className="px-4 md:px-8 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-b py-8" style={{ borderColor: BDRC }}>
          {[
            { label: "Role", value: "Full-Stack Developer" },
            { label: "Stack", value: "React · Sanity CMS · ArcGIS" },
            { label: "Timeline", value: "Jan 2026 — Present" },
            { label: "Team", value: "2 Developers + Prof. Kowalski" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-[0.55rem] tracking-[0.18em] uppercase mb-1.5" style={{ fontFamily: MONO, color: AC }}>{label}</p>
              <p className="text-xs uppercase font-bold" style={{ fontFamily: MONO, color: FG }}>{value}</p>
            </div>
          ))}
        </div>
        <div className="pt-6">
          <a href="https://www.inclusivebethlehem.org/" target="_blank" rel="noopener noreferrer" data-noblue="1"
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
          <img src="/photos/toolkit.webp" alt="Toolkit for Disability Wellbeing" className="w-full h-auto" />
        </div>
      </div>

      <Section id="overview" label="Overview">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
          <div>
            <SectionHeading>The problem</SectionHeading>
            <Body>
              Professor Jenny Kowalski of Lehigh&apos;s Design Department spent years talking to disabled residents of Bethlehem, PA — understanding what daily life really looks like with a disability in a mid-sized city. Her work produced a series of physical toolkit booklets. But physical booklets don&apos;t search. They don&apos;t update. They don&apos;t translate.
            </Body>
            <div className="mt-6 p-5 border-l-2" style={{ borderColor: AC, background: `${AC}06` }}>
              <p className="text-xs font-bold uppercase mb-1.5" style={{ fontFamily: MONO, color: AC }}>How might we...</p>
              <p className="text-sm uppercase" style={{ fontFamily: MONO, color: FG }}>Make disability resources as easy to find as googling a restaurant — and keep them accurate without a dev team?</p>
            </div>
          </div>
          <div>
            <SectionHeading>The goal</SectionHeading>
            <Body>
              Build a living digital companion to those booklets: searchable, filterable, accessible to everyone, bilingual (English + Spanish), and maintainable by non-technical stakeholders via a headless CMS.
            </Body>
            <div className="flex flex-wrap gap-2 mt-6">
              {["Accessibility", "Bilingual UX", "Community-Centered", "WCAG 2.1 AA", "Open-Source"].map(t => <Tag key={t}>{t}</Tag>)}
            </div>
          </div>
        </div>
      </Section>

      <Section id="research" label="Research & Discovery">
        <SectionHeading>Listening before building</SectionHeading>
        <Body>
          Before a single wireframe was drawn, the team ran community mapping workshops and one-on-one interviews with Bethlehem residents. People shared what it actually felt like to navigate daily life with a disability in the city — and where the gaps were.
        </Body>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <Quote text="When I went blind, I had to worry about crossing the street. I had to write a request to the city so you can hear the beeping on the lights." attr="Bethlehem resident" />
          <Quote text="We don't know where to park, how to get him in, if he's going to be able to get around in the wheelchair. There's not enough information." attr="Caregiver of a disabled resident" />
          <Quote text="How am I going to pay a copayment of $28 when I can hardly pay my bills?" attr="Bethlehem resident" />
        </div>
        <div className="mt-10">
          <div className="w-full overflow-hidden" style={{ background: "#ddd8d0" }}>
            <img src="/photos/mapping.png" alt="Community mapping workshop output" className="w-full h-auto" />
          </div>
          <p className="text-[0.6rem] tracking-widest uppercase mt-2" style={{ fontFamily: MONO, color: MUTED }}>Community mapping workshop — Bethlehem, PA</p>
        </div>

        <div className="mt-14">
          <h3 className="text-sm font-bold uppercase mb-6" style={{ fontFamily: MONO, color: FG }}>Key insights from research</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { n: "01", t: "Resource fragmentation", d: "Resources existed, but were scattered across dozens of different websites, PDFs, and physical handouts. Nobody knew where to start." },
              { n: "02", t: "Language barrier", d: "~25% of Bethlehem residents are Spanish speakers. Almost no existing disability resources were available in Spanish." },
              { n: "03", t: "No feedback loop", d: "There was no way for residents to report inaccessible barriers or share experiences with one another." },
            ].map(({ n, t, d }) => (
              <div key={n} className="p-5 border" style={{ borderColor: BDRC }}>
                <p className="text-[0.55rem] tracking-widest uppercase mb-2" style={{ fontFamily: MONO, color: AC }}>{n}</p>
                <p className="text-xs font-bold uppercase mb-2" style={{ fontFamily: MONO, color: FG }}>{t}</p>
                <p className="text-xs uppercase leading-relaxed" style={{ fontFamily: MONO, color: MUTED }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="process" label="Design Process & Iterations">
        <SectionHeading>Three rounds of iteration</SectionHeading>
        <Body>
          Each round of user testing revealed something we hadn&apos;t anticipated. We ran three major design cycles before landing on the final architecture.
        </Body>
        <div className="flex flex-col gap-4 mt-10">
          <IterationCard
            num="Iteration 01"
            label="Flat Resource Directory"
            problem="Users spent 3+ minutes searching for resources. Navigation was overwhelming — no filtering, no search, just a long list."
            fix="Added semantic search with NLP-powered query matching and multi-select category filters. Reduced average search time to under 45 seconds."
          />
          <IterationCard
            num="Iteration 02"
            label="Map + Filtering Added"
            problem="The interactive map was popular but confusing. Users didn't understand how to pin barriers or differentiate resource types. Map and list felt disconnected."
            fix="Redesigned the map with a slide-in side panel showing resource details. Added clear visual distinction between resource pins and user-reported barriers."
          />
          <IterationCard
            num="Iteration 03"
            label="Accessibility Audit"
            problem="Screen reader testing revealed a keyboard trap inside the resource modal — once opened, keyboard users couldn't close it without a mouse. WCAG contrast ratio failures on 6 components."
            fix="Fixed focus management, added proper ARIA roles and labels, corrected all contrast ratios. Added an on-site accessibility toolbar for font size, contrast, and link underlining."
          />
        </div>
        <div className="mt-14 p-8 border-l-2" style={{ borderColor: AC, background: `${AC}04` }}>
          <p className="text-[0.6rem] tracking-widest uppercase mb-3" style={{ fontFamily: MONO, color: AC }}>Key learning from iteration</p>
          <p className="text-sm uppercase leading-relaxed max-w-xl" style={{ fontFamily: MONO, color: FG }}>
            We initially assumed accessibility was a feature to add at the end. User testing proved it&apos;s a constraint that shapes every decision from the beginning — it improved the experience for everyone, not just users with disabilities.
          </p>
        </div>
      </Section>

      <Section id="features" label="Key Features">
        <SectionHeading>What we built</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2">
          {[
            { img: "/photos/accessibility-toolbar.png", title: "Accessibility Toolbar", desc: "On-site controls for font size, contrast, and link underlines. Built on top of full keyboard navigation and WCAG 2.1 AA compliance throughout." },
            { img: "/photos/bilingual.png", title: "Bilingual — English & Spanish", desc: "Full Spanish translation verified by native speakers, not AI. With ~25% of Bethlehem residents being Spanish speakers, this was non-negotiable from day one." },
            { img: "/photos/interactive-map.gif", title: "Interactive Resource Map", desc: "Built with ArcGIS API. Side panel + search lets users explore nearby resources, filter by type, and report accessibility barriers directly on the map." },
            { img: "/photos/resource-library.gif", title: "Resource Library", desc: "Semantic search with NLP query matching across all resources. Users can filter by category, leave feedback, and get direct links to services and contacts." },
            { img: "/photos/community-forum.png", title: "Community Forum", desc: "A space for residents to share stories, lived experiences, and local knowledge with one another." },
            { img: "/photos/barrier-reporting.png", title: "Barrier Reporting", desc: "Multiple pathways to report barriers — pin a specific location on the map, or submit a general report for inaccessible websites or policy gaps." },
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
        <SectionHeading>What I learned</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
          <div>
            <Body>
              Building an accessible website taught me that accessibility shapes every layer of development — contrast ratios, focus states, semantic HTML, ARIA labels, reading order. It isn&apos;t a checklist; it&apos;s a design constraint that fundamentally changes how you think about every component.
            </Body>
            <Body>
              <br />Working with a real community stakeholder (Prof. Kowalski and the residents she interviewed) also taught me that the most important research is the kind you can&apos;t fake: showing up, listening, and building for people whose lives look nothing like yours.
            </Body>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase mb-2" style={{ fontFamily: MONO, color: FG }}>Skills built</h3>
            <div className="flex flex-wrap gap-2">
              {["WCAG Compliance", "Keyboard Navigation", "ARIA", "CMS Integration", "Bilingual UX", "Community-Centered Design", "ArcGIS API", "Semantic Search", "NLP"].map(t => <Tag key={t}>{t}</Tag>)}
            </div>
            <div className="mt-6 p-5 border" style={{ borderColor: BDRC }}>
              <p className="text-[0.58rem] tracking-widest uppercase mb-2" style={{ fontFamily: MONO, color: AC }}>What&apos;s next</p>
              <p className="text-xs uppercase leading-relaxed" style={{ fontFamily: MONO, color: MUTED }}>
                This summer: user testing with real community members, followed by targeted improvements to the mobile experience and overall navigation usability.
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
