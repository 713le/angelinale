import { motion } from "motion/react"
import { useNavigate } from "react-router"
import { FG, AC, MUTED, MONO } from "../constants"

interface ProjectHeroProps {
  eyebrow: string
  title: string
  tagline: string
}

export default function ProjectHero({ eyebrow, title, tagline }: ProjectHeroProps) {
  const navigate = useNavigate()
  const goBack = () => {
    navigate("/")
    setTimeout(() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }), 80)
  }
  return (
    <section className="pt-28 pb-16 px-4 md:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
        <button onClick={goBack} className="inline-flex items-center gap-2 text-xs tracking-widest uppercase border-none bg-transparent mb-8 transition-colors p-0"
          data-noblue="1"
          style={{ fontFamily: MONO, color: MUTED, cursor: "none" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = AC }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = MUTED }}>
          ← back
        </button>
        <p className="text-[0.6rem] tracking-[0.2em] uppercase mb-4" style={{ fontFamily: MONO, color: AC }}>{eyebrow}</p>
        <h1 style={{ fontFamily: MONO, fontSize: "clamp(2.2rem,7vw,5.5rem)", fontWeight: 500, color: FG, textTransform: "uppercase", letterSpacing: "-0.02em", lineHeight: 0.95, marginBottom: "1.5rem" }}>
          {title}
        </h1>
        <p className="max-w-2xl text-sm uppercase leading-relaxed" style={{ fontFamily: MONO, color: MUTED }}>
          {tagline}
        </p>
      </motion.div>
    </section>
  )
}
