import { useRef, useState } from "react"
import { motion } from "motion/react"
import { useInView } from "../hooks"
import { BG, FG, AC, BDRC, MONO } from "../constants"

const MARQUEE_TEXT = "ANGELINA LE 𖦹₊⊹ "

function FooterMarquee() {
  return (
    <div className="overflow-hidden border-t border-b" style={{ borderColor: BDRC }}>
      <motion.div className="flex whitespace-nowrap"
        animate={{ x: [0, "-50%"] }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }}>
        {[0, 1].map((ki) => (
          <span key={ki} className="flex">
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.span key={i} className="inline-block"
                style={{ fontFamily: MONO, fontSize: "clamp(2.5rem,6vw,5rem)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "-0.02em", paddingRight: "0.5em", color: FG, lineHeight: 1.1 }}
                whileHover={{ color: AC, y: -4, transition: { duration: 0.15 } }}>
                {MARQUEE_TEXT}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function Footer() {
  const { ref, vis } = useInView("-40px")
  const [heartFilled, setHeartFilled] = useState(false)

  return (
    <footer style={{ background: `linear-gradient(to bottom, ${BG} 30%, ${AC} 100%)`}}>
      <FooterMarquee />
      <motion.div ref={ref as React.RefObject<HTMLDivElement>}
        className="px-6 py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-5"
        initial={{ opacity: 0, y: 16 }} animate={vis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
        <div className="flex flex-col gap-1">
          {([
            ["LinkedIn", "https://www.linkedin.com/in/angelinavle/", true],
            ["angelinale13@gmail.com", "mailto:angelinale13@gmail.com", false],
          ] as [string, string, boolean][]).map(([label, href, ext]) => (
            <a key={href} href={href} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-xs tracking-widest uppercase no-underline transition-colors"
              style={{ fontFamily: MONO, color: "rgba(15,14,13,0.72)", cursor: "none" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = AC }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(15,14,13,0.72)" }}>
              {label}
            </a>
          ))}
        </div>
        <p className="text-[0.64rem] sm:text-[0.75rem] tracking-widest uppercase flex items-center gap-1 whitespace-nowrap leading-none"
          style={{ fontFamily: MONO, color: "rgba(15,14,13,0.55)" }}>
          Designed & built with  
          <button type="button"
            aria-pressed={heartFilled}
            onClick={() => setHeartFilled((prev) => !prev)}
            className="inline-flex p-0 border-0 bg-transparent cursor-pointer"
            title={heartFilled ? "Unfill heart" : "Fill heart"}
            style={{ lineHeight: 0, color: "rgba(15,14,13,0.55)" }}>
            <svg width="13" height="13" viewBox="0 0 30 30" fill={heartFilled ? AC : "none"} xmlns="http://www.w3.org/2000/svg" stroke="currentColor"
              strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3 9.24 3 10.91 3.81 12 5.09 13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5 22 12.28 18.6 15.36 13.45 19.99 12 21.35Z" />
            </svg>
          </button>
            by Angelina Le. ©2026
        </p>
      </motion.div>
    </footer>
  )
}
