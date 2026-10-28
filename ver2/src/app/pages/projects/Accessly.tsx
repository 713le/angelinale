import ProjectHero from "../../components/ProjectHero"
import NextProject from "../../components/NextProject"
import Footer from "../../components/Footer"
import CaseStudyNav from "../../components/CaseStudyNav"
import { FG, AC, BDRC, MUTED, MONO } from "../../constants"
import { motion } from "motion/react"

const NAV_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "design", label: "Design" },
  { id: "impact", label: "Impact" },
]

function SectionHeading({ children }: { children: string }) {
  return <h2 style={{ fontFamily: MONO, fontSize: "clamp(1.4rem,3.5vw,2.4rem)", fontWeight: 500, color: FG, textTransform: "uppercase", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "1.5rem" }}>{children}</h2>
}

export default function Accessly() {
  return (
    <div style={{ paddingBottom: "60px" }}>
      <ProjectHero
        eyebrow="Case Study — Personal Project"
        title="ACCESSLY"
        tagline="A design toolkit for accessible community resources and disability-inclusive information architecture."
      />

      <div className="px-4 md:px-8 mb-6">
        <div className="w-full overflow-hidden border-2 border-foreground bg-[#efe7db]">
          <img src="/photos/accessly-mockup.webp" alt="Accessly mockup" className="w-full h-auto" />
        </div>
      </div>

      <section className="px-4 md:px-8 py-16">
        <SectionHeading>Overview</SectionHeading>
        <p style={{ fontFamily: MONO, color: MUTED }} className="text-sm uppercase leading-[1.9] max-w-2xl">
          Accessly is a project focused on making local community resources discoverable and usable by people with diverse access needs.
        </p>
      </section>

      <NextProject />
      <Footer />
      <CaseStudyNav sections={NAV_SECTIONS} />
    </div>
  )
}
