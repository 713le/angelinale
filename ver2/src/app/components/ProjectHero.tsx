import { motion } from "motion/react"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router"
import { FG, MUTED, MONO } from "../constants"

interface ProjectHeroProps {
  eyebrow: string
  title: string
  tagline: string
}

export default function ProjectHero({ title, tagline }: ProjectHeroProps) {
  const navigate = useNavigate()
  const goBack = () => {
    navigate("/")
    setTimeout(() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }), 80)
  }
  return (
    <section className="px-5 pb-12 pt-28 sm:px-8 md:px-12 md:pb-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
        <button onClick={goBack} className="mb-10 inline-flex items-center gap-2 bg-transparent px-0 py-2 text-xs font-bold uppercase tracking-widest text-foreground transition-colors hover:text-foreground"
          data-noblue="1"
          style={{ fontFamily: MONO, color: FG, cursor: "pointer" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = FG }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = FG }}>
          <ArrowLeft aria-hidden="true" size={14} strokeWidth={2.5} /> back
        </button>
        <h1 style={{ fontFamily: MONO, fontSize: "clamp(2rem,6vw,5rem)", fontWeight: 800, color: FG, textTransform: "uppercase", letterSpacing: "0", lineHeight: 0.92, marginBottom: "1.5rem", maxWidth: "18ch" }}>
          {title}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed md:text-xl" style={{ fontFamily: MONO, color: MUTED }}>
          {tagline}
        </p>
      </motion.div>
    </section>
  )
}
