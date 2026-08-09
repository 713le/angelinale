import { useState, useEffect } from "react"
import { BG, FG, AC, BDRC, MONO } from "../constants"

export default function CaseStudyNav({ sections }: { sections: { id: string; label: string }[] }) {
  const [active, setActive] = useState("")

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) setActive(e.target.id)
      }
    }, { rootMargin: "-40% 0px -55% 0px" })
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [sections])

  const scrollTo = (id: string) => {
    if (id === "top") { window.scrollTo({ top: 0, behavior: "smooth" }); return }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  const mutedColor = `rgba(15,14,13,0.35)`
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[900]" style={{ background: BG, borderTop: `1px solid ${BDRC}` }}>
      <div className="flex items-center justify-center gap-1 overflow-x-auto px-4 py-2.5" style={{ scrollbarWidth: "none" }}>
        <button onClick={() => scrollTo("top")}
          className="text-[0.55rem] tracking-[0.15em] uppercase px-3 py-1.5 bg-transparent border-none whitespace-nowrap transition-colors"
          style={{ fontFamily: MONO, color: mutedColor, cursor: "none" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = AC }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = mutedColor }}>
          ↑ TOP
        </button>
        {sections.map(({ id, label }) => (
          <button key={id} onClick={() => scrollTo(id)}
            className="text-[0.55rem] tracking-[0.15em] uppercase px-3 py-1.5 bg-transparent border-none whitespace-nowrap transition-colors"
            style={{ fontFamily: MONO, color: active === id ? AC : mutedColor, cursor: "none" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = AC }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = active === id ? AC : mutedColor }}>
            {label}
          </button>
        ))}
      </div>
    </nav>
  )
}
