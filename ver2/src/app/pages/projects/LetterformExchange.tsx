import { motion } from "motion/react"
import { FG, MUTED, MONO } from "../../constants"
import Footer from "../../components/Footer"
import NextProject from "../../components/NextProject"
import ProjectHero from "../../components/ProjectHero"

const DETAILS = [
  ["Course", "DES 153 · Lehigh University"],
  ["Focus", "Typography · Toolmaking"],
  ["Methods", "Laser-cut template · Ink · Digital lettering"],
  ["Final format", "13 × 19 in. typographic poster"],
]

export default function LetterformExchange() {
  return (
    <div>
      <ProjectHero
        eyebrow="Typography and Poster Design"
        title="LETTERFORM EXCHANGE"
        tagline="A studio project exploring how the tools we use leave their imprint on the letters we make."
      />

      <section className="px-5 pb-16 sm:px-8 md:px-12 md:pb-20">
        <motion.figure
          className="mx-auto m-0 max-w-[1440px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="/photos/letterform-poster-mockup.png"
            alt="Typographic poster mockup featuring oversized orange and blue letterforms on a pale blue wall."
            className="block h-auto w-full"
          />
          <figcaption className="mt-3 border-t pt-2 text-xs uppercase" style={{ borderColor: FG, color: MUTED }}>
            Letterform composition · poster mockup
          </figcaption>
        </motion.figure>
      </section>

      <section className="border-t-2 px-5 py-14 sm:px-8 md:px-12 md:py-20" style={{ borderColor: FG }}>
        <div className="mx-auto grid max-w-[1440px] gap-6 md:grid-cols-[0.7fr_1.3fr] md:gap-12">
          <h2 className="m-0 text-3xl font-extrabold uppercase md:text-5xl" style={{ fontFamily: MONO, color: FG }}>
            Overview
          </h2>
          <p className="m-0 max-w-3xl text-base leading-relaxed md:text-lg">
            Letterform Exchange looks at how the tools behind type shape its character, from a curve drawn by hand to a form cut, inked, and reproduced. Each student developed a drafting template and exchanged a pair of related letters with a studio partner. The final poster brings the class's letterforms together through layered color, highlighting their outlines and forms.
          </p>
        </div>

        <dl className="mx-auto mt-12 grid max-w-[1440px] grid-cols-1 gap-6 border-y py-6 sm:grid-cols-2 lg:grid-cols-4" style={{ borderColor: FG }}>
          {DETAILS.map(([label, value]) => (
            <div key={label}>
              <dt className="mb-1 text-[0.65rem] font-bold uppercase tracking-widest" style={{ color: FG }}>{label}</dt>
              <dd className="m-0 text-sm font-semibold leading-relaxed">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <NextProject />
      <Footer />
    </div>
  )
}