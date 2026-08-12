import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Link, useNavigate } from "react-router"
import { useGlitch, useTypewriter, useInView } from "../hooks"
import { BG, FG, AC, BDRC, MUTED, MONO } from "../constants"
import Footer from "../components/Footer"

// ─── ASCII art ────────────────────────────────────────────────────────────────

const ASCII_ART = `....................::::::::::::::...................................................................:::::::::::::::::::
....................:::::::::::::::....................................................................:::::::::::::::::
..............:::::::::::::::::::::............:--====-:...:=+*++=-......................................::::::::::::::.
=+*=-:--..........:::::::::::..:::::.........-=*%#**##%%#*#@@@@@@@@%%*=:..................................:::::::::::::.
:=%#+*=-........:::::::::::::::::::::......:*%%%**#%%@@@%%@@@@@@@@@@%%#**=:...............................::::::::::::::
**%%%##*-:........::::::::::......::::...:*@@@#***#%@@@%@@@@@@@@@@@@%%*++###=............................:::::::::::::::
%###%%%***=:......::::::::::::::::::::..-%@@@%#***#%@%%@@@@@@@@@@@@%###***#%%%+..................:::::::::::::::::::::::
###%%%%%##+-:::::::::::::::::::::::....+@@@@@%##**#####@@@%%@@@@@@%@##+++###%@@#=.............::::::::::::::::::::::::::
%%@%#%%@%*==+==--=-::::::::..........:*@@@@@@%#*****#*#@%%##%@%##%%#***#*##@%%@@@#:............::::::..:::.......::::::-
@%%%%#%#**==++==---::::.............-%@@@@@@@@%%%#%@%%%#%@%%#*+*****#%%#%#%%@@@@@%@+...............::::..............:=#
@@@@%@@@%#+****#*=.................=@@@@@@@@@@@@@@@@@%%%%%##**###**#%%@@@@@@@@@@@@@@%:..........::::::.............:+%##
@@@@@@%%%######+=:................=@@@@@@@@@@@@@@@@@@@@####%%%@@@%%%@@@@@@@@@@@@@@@@@@=.........::::..............-+#@@@
@@@@@@%%%%%%#*#**+:....:::::=++=-+@@@@@@@@@@@@@@@@@@@@#****%%@@@@@@@@@@@@@@@@@@@@@@@@@@*.........::..............*%@@@@%
@@@@@@@@@%%@%@@@@@@%***#*-=*#%%**@@@@@@@@@@@@@@@@@@@%%**++*#%@@@@@@@@@@@@@@@@@@@@@@@@@@@*:......................+#%@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@%#%@@@@@@@@@@@@@@@@@@@@@@@%%#*+++**#%@@@@@@@@@@@@@@@@@@@@@@@@@@@#......................+*%*##%@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%#*+++++**#%@@@@@@@@@@@@@@@@@@@@@@@@@@@*.....................=%%*#%@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%#*++=++++++#%@@@@@@@@@@@@@@@@@@@@@@@@@@@#-:....+*+-..........+*****#@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%##*+====+++++#%@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%*+*%#*%%*=:::...:=%###%+=
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@###++======++==*#%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@%#%%%@@@@##**%@#=#@@@@@#+
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%##*++===========*%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@##*+++============*%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%#*++=====-=======+*%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%##***+++=======+**###%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
%%%%@%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%%%##*++======+++++++*#%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
%%%%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#**++++++++++======+++++**#%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
%%#%@@@@%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@##****+++++++++++=====++++#%@@%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
%%@@@%@@@%%@%#%%%%%@@@@@@@@@@@@@@@@@@@@###*%@@@@@@@#*++++====+++=*###@@@@%#%%%#%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
%@@@%%#%%%%%%@@@%%@@@@@@@@@@@@@@@@@@@@####@@@#@@@@%##*+*++===++++++++++==++++****##@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
%%%@%%%%%@%%@@@@@@@@%@@@@@@@@@@@@@@@@%######***+++++++*+++====+++++++++=====++++**#%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@%%%%%%%@@@@@%%@@@@@@@@@@@@@@@@@@%##**++++++++++++++++====++=++=============+**#%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@%@@@@@%%%@@@@@@@%@@@@@@@@@@@@@@@@@@@%#**++++====+++++++++==-=+++==============+++*#%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@%%%%%@@@@@@@%%%@@@@@@@@@@@@@@@@@%#*+++======+==++**+==-:::=++===============+**#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@%%%%%###%%%###%@@@@@@@@@@@@@@@@@@%#*+++==========**+===------+*+===----=====+=+*#%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
%%@@@%%%%%%%%##%%%@@@@@@@@@@@@@@@@@@@%#**+++====--==+*++++====++==+*+===---=====+=+*#%@%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
%%#@@@@%%#%%%%#%%@@@@@@@@@@@@@@@@@@@@@#**+++====-===+*+*%%*++*%%#***+==========++++*#%@%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
%%%%%@@@@@@@%%%@@@@@@@@@@@@@@@@@@@@@%@%#*++++=======+****#*********+==========+++++*#%@%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
%#%@%@@@@@@%%%@@@@@@@@@@@@@@@@@@@@@@@@%#**+++=======++****++++++++++++======+++++++*#%@%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
%#%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%#**+++====+++***++++++++++++++++++++++++++**%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
##***#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%#**++++++++++******************#**++++++***#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%***++++++++**##############%%@%**++++++***%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@%%%@@%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%**++++++*#%@%%%%%%%%%%%####%#*+++++++**#%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
%@%%%%#%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#**+++++++**#%%%####***###***+++++++**##@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@%##%%%%#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%#**++++++***#####*******+++++++++***#@@@@@@%@%%%@@@@@@@@@@@@@@%%@@@@@@@@@@@@
%@@@@@@@%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#***+++++********+++++++++++++***#%@@@@@@@@@%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
%%%@@@@@@@@@@@@@%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@#****+++**+++++++++++++++++***#@@@@@@@@@@@@@@@@@@@@@@@@@@%%%%%%%@@@@@@@@@
%@@%##*##*#%%%@@@@%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%#***+++*++++++++++++++++**#%@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%%@@@@%%%%%%%%
%%#%@##%#####%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%###***++++++++++++++**#%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%%%@@@@@%%@%@
@@@@@@@@%@@@%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%%##**++++++++++**##%@@%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%%%%%@@@@@@@@
@@@@@@@@@@@%####%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%%%%%%##********##%%%%%%%%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%%%%@@@@@@@@@
%@@@@@@@%%#%%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%###########**#***######%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%@@@@%%@@@@@@
%%@@@@@@@%%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@##*********+++++****#####%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%#****+++++++++++****###%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@###**++++++++++++****##%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@%%%%%@%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%##****+++++++++++*****##%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
%%##%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@##*****++++++++++*****###%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
##%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@###*++**+*++++++++****###%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
%@@@@@@@@%#%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%#***+++++++++++++******##%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@%@@@@@#%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%#***+++++++++++++++++**##%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%@@@@@@@@@
@%%@%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%%***++++++++====+++++***#%%%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%#%%#***+++++++=======++***#%%%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@##%#****+++++++======+++**##%#%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%%%%@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%@*##*#**+**++++++=====+***###%##%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%%%%%%%@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%**#**++**++++++++++++++****##%%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%%%%%%%@%
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%%+**+++++++**++++++++++****#####%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%@@@%@%
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%#%#*+++=+++++++++++++++++****#*##%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%@@@#
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%*#++===+++++++++++++++++*****##%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%`

const ASCII_RC = "!@#$%^&*()[]{}+-=/<>~|;:?'."

// ─── ASCII art ────────────────────────────────────────────────────────────────

function AsciiArt() {
  const preRef = useRef<HTMLPreElement>(null)
  const charsRef = useRef<{ el: HTMLSpanElement; ch: string }[]>([])
  const activeRef = useRef<Set<number>>(new Set())

  useEffect(() => {
    const pre = preRef.current; if (!pre) return
    const original = pre.textContent || ""
    pre.innerHTML = ""
    const items: { el: HTMLSpanElement; ch: string }[] = []
    for (let i = 0; i < original.length; i++) {
      const ch = original[i]
      if (ch === "\n") { pre.appendChild(document.createTextNode("\n")) }
      else {
        const span = document.createElement("span")
        span.textContent = ch
        pre.appendChild(span)
        items.push({ el: span, ch })
      }
    }
    charsRef.current = items
  }, [])

  const onMouseMove = () => {
    const items = charsRef.current; if (!items.length) return
    const count = Math.floor(Math.random() * 10) + 6
    for (let i = 0; i < count; i++) {
      const idx = Math.floor(Math.random() * items.length)
      if (activeRef.current.has(idx)) continue
      const { el, ch } = items[idx]
      activeRef.current.add(idx)
      el.textContent = ASCII_RC[Math.floor(Math.random() * ASCII_RC.length)]
      el.style.color = AC
      setTimeout(() => { el.textContent = ch; el.style.color = ""; activeRef.current.delete(idx) }, 160 + Math.random() * 280)
    }
  }

  return (
    <pre ref={preRef} onMouseMove={onMouseMove} style={{
      fontFamily: MONO, fontSize: "clamp(0.14rem, 1vw, 0.4rem)", lineHeight: 1.15, letterSpacing: "0.48px",
      color: FG, opacity: 0.9, whiteSpace: "pre", overflow: "visible",
      userSelect: "none", margin: 0, padding: 0, maxWidth: "100%", width: "100%", display: "block",
    }}>
      {ASCII_ART}
    </pre>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const FEATURED = [
  {
    title: "MENULENS",
    description: "Menu visualizer app",
    date: "Aug 2026",
    tech: ["FIGMA", "ILLUSTRATOR"],
    image: "/photos/menulens-mockup-2.webp",
    href: "/projects/menulens",
  },
  {
    title: "TOOLKIT FOR DISABILITY WELLBEING IN BETHLEHM",
    description: "Senior Capstone — Accessibility-first web hub with disability resources and community stories in Bethlehem, PA.",
    date: "Jan 2026 — present",
    tech: ["REACT", "NODE.JS", "SANITY"],
    image: "/photos/toolkit.webp",
    href: "/projects/toolkit",
  },
  {
    title: "VYNL",
    description: "Music rating platform using a binary search algorithm to rank albums by personal preference.",
    date: null,
    tech: ["REACT", "POSTGRESQL", "REST API"],
    image: "/photos/vynl.webp",
    href: "/projects/vynl",
  },
]

const GALLERY = [
  { title: "INTERPLAY", sub: "GRAPHIC CHAPBOOK DESIGN", img: "photos/Chapbook Mockup Inside Pages.jpg", href: "/projects/interplay" },
  { title: "LIFE OF PI", sub: "COVER AND SPINE REDESIGN", img: "photos/lifeofpicovermockup.png", href: "/projects/life-of-pi" },
  { title: "PARASITE", sub: "SYMBOL DESIGNS", img: "photos/parasite.png", href: "/projects/parasite" },
  { title: "NOSTALGIA", sub: "P5.JS POSTER", img: "photos/final-print.png", href: "/projects/nostalgia" },
  { title: "LAZY LAKE", sub: "P5.JS POSTER", img: "photos/boat-scene.gif", href: "/projects/lazy-lake" },
  { title: "CATS", sub: "P5.JS POSTER", img: "photos/cats.gif", href: "/projects/cats" },
  { title: "RECORD PLAYER", sub: "BLENDER & UNITY", img: "photos/recordplayerred.png", href: "/projects/record-player" },
]

const TECH_COLS = [
  ["Figma", "React", "JavaScript/TypeScript", "CSS/Responsive Design"],
  ["Adobe Creative Suite", "Blender", "Unity", "Node.js"],
]

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const navigate = useNavigate()
  const { txt: heroTxt, go: heroGlitch } = useGlitch("ANGELINA LE")
  const sub1 = useTypewriter("is design-minded & code-fluent.", 46, 600)
  // const sub2 = useTypewriter("design-minded. code-fluent.", 52, 3800)
  const [spot, setSpot] = useState({ x: 50, y: 50 })
  const [parallax, setParallax] = useState({ x: 0, y: 0 })
  const [inHero, setInHero] = useState(false)
  const [overLink, setOverLink] = useState(false)
  const labelRef = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    setSpot({ x: px * 100, y: py * 100 })
    setParallax({ x: (px - 0.5) * -18, y: (py - 0.5) * -12 })
    const isLink = !!(e.target as HTMLElement).closest("a,button")
    setOverLink(isLink)
    if (labelRef.current) labelRef.current.style.transform = `translate3d(${e.clientX + 14}px,${e.clientY + 14}px,0)`
  }

  const onClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a,button")) return
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-start justify-between gap-6 px-4 pt-20 pb-10 overflow-hidden sm:px-6 md:flex-row md:items-center md:gap-8 md:pt-24 md:pb-12"
      style={{ cursor: "none" }}
      onMouseMove={onMouseMove} onMouseEnter={() => setInHero(true)}
      onMouseLeave={() => { setInHero(false); setOverLink(false) }} onClick={onClick}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(450px circle at ${spot.x}% ${spot.y}%, rgba(0,82,254,0.05) 0%, transparent 70%)`,
      }} />

      <div ref={labelRef} className="fixed z-[9997] pointer-events-none top-0 left-0"
        style={{ opacity: inHero && !overLink ? 1 : 0, transition: "opacity 0.15s",
          fontFamily: MONO, fontSize: "0.65rem", color: AC,
          padding: "0.28rem 0.55rem", letterSpacing: "0.12em",
          textTransform: "uppercase", whiteSpace: "nowrap" }}>
        [ view work ]
      </div>

      <div className="relative z-10 flex w-full flex-1 flex-col items-center justify-center gap-6 md:hidden">
        <motion.div className="w-full max-w-[560px]"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>
          <img src="/photos/ascii-art.webp" alt="ASCII art" className="w-full h-auto object-contain" />
        </motion.div>

        <motion.div className="w-full max-w-[580px] flex flex-col items-start text-left"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}>
          <div style={{ overflow: "hidden", marginBottom: "0.7rem" }}>
            <motion.h1 onMouseEnter={heroGlitch}
              initial={{ y: "105%" }} animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              style={{ fontFamily: MONO, fontSize: "clamp(1.5rem, 8vw, 4.8rem)", fontWeight: 500, lineHeight: 0.9, letterSpacing: "-0.03em", color: FG, textTransform: "uppercase", cursor: "none", whiteSpace: "normal", maxWidth: "100%" }}>
              {heroTxt}
            </motion.h1>
          </div>
          <motion.p className="text-base sm:text-xl tracking-wide uppercase"
            style={{ fontFamily: MONO, color: FG, lineHeight: 1.2, whiteSpace: "normal", fontSize: "clamp(0.88rem, 3.2vw, 1.5rem)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            {sub1}
            <span style={{ color: AC, opacity: sub1.length < "is design-minded & code-fluent.".length ? 1 : 0 }}>█</span>
          </motion.p>
        </motion.div>
      </div>

      <motion.div className="relative z-10 hidden md:flex md:flex-none max-w-[580px] order-2 md:order-none md:flex-1 flex-col items-start"
        initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}>
        <div style={{ overflow: "hidden", marginBottom: "0.6rem" }}>
          <motion.h1 onMouseEnter={heroGlitch}
            initial={{ y: "105%" }} animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            style={{ fontFamily: MONO, fontSize: "clamp(1.5rem, 8vw, 4.8rem)", fontWeight: 500, lineHeight: 0.95, letterSpacing: "-0.03em", color: FG, textTransform: "uppercase", cursor: "none", whiteSpace: "normal", maxWidth: "100%" }}>
            {heroTxt}
          </motion.h1>
        </div>
        <motion.p className="text-base sm:text-xl md:text-3xl tracking-wide uppercase"
          style={{ fontFamily: MONO, color: FG, lineHeight: 1.2, whiteSpace: "normal", fontSize: "clamp(0.88rem, 3.2vw, 1.5rem)", marginTop: 0, display: "block" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          {sub1}
          <span style={{ color: AC, opacity: sub1.length < "is design-minded & code-fluent.".length ? 1 : 0 }}>█</span>
        </motion.p>
        {/* <motion.p className="text-sm tracking-wide uppercase"
          style={{ fontFamily: MONO, color: "rgba(15,14,13,0.32)" }} initial={{ opacity: 0 }} animate={{ opacity: sub2.length > 0 ? 1 : 0 }}>
          {sub2}
          <span style={{ color: AC, opacity: sub2.length > 0 && sub2.length < "design-minded. code-fluent.".length ? 1 : 0 }}>█</span>
        </motion.p> */}
        {/* <motion.div className="flex items-center flex-wrap gap-4 mt-8"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
          <span style={{ fontFamily: MONO, fontSize: "1.1rem", color: FG }}>✮ ⋆ ˚｡𖦹 ⋆｡°✩</span>
          <a href="mailto:angelinale13@gmail.com" data-noblue="1"
            className="inline-flex items-center gap-2 px-5 py-3 text-xs tracking-widest uppercase no-underline transition-all duration-300"
            style={{ fontFamily: MONO, border: `1.5px solid ${AC}`, color: AC, background: "transparent", cursor: "none" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = AC; (e.currentTarget as HTMLAnchorElement).style.color = BG }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.color = AC }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
              <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            say hi
          </a>
        </motion.div> */}
      </motion.div>

      <motion.div className="relative z-10 hidden md:flex md:flex-none w-full order-1 md:order-none md:w-auto md:ml-auto md:justify-end"
        style={{ maxWidth: "100%", transform: `translate(${parallax.x}px, ${parallax.y}px)`, transition: "transform 0.35s ease-out" }}
        initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}>
        <div className="w-full max-w-full overflow-visible md:w-auto md:flex md:justify-end">
          <div className="w-full md:w-auto">
            <AsciiArt />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

// ─── Section title ────────────────────────────────────────────────────────────

function Title({ children }: { children: string }) {
  const { txt, go } = useGlitch(children)
  const { ref, vis } = useInView()
  return (
    <motion.h2 ref={ref as React.RefObject<HTMLHeadingElement>} onMouseEnter={go}
      initial={{ opacity: 0, y: 20 }} animate={vis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
      style={{ fontFamily: MONO, fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 500, color: FG, cursor: "none", textTransform: "uppercase", letterSpacing: "-0.02em", marginBottom: "3rem", lineHeight: 1 }}>
      {txt}
    </motion.h2>
  )
}

// ─── Project cards ────────────────────────────────────────────────────────────

function ProjectCard({ p, i }: { p: typeof FEATURED[0]; i: number }) {
  const [hov, setHov] = useState(false)
  const { ref, vis } = useInView("-30px")
  const navigate = useNavigate()
  return (
    <motion.div ref={ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 28 }} animate={vis ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}>
      <div className="block no-underline" data-cursor="project" data-noblue="1"
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        onClick={() => navigate(p.href)}
        style={{ cursor: "none" }}>
        <div className="w-full overflow-hidden mb-4" style={{ aspectRatio: "4/3", background: "#ddd8d0" }}>
          <div className="w-full h-full bg-cover bg-center transition-transform duration-700"
            style={{ backgroundImage: `url('${p.image}')`, transform: hov ? "scale(1.04)" : "scale(1)" }} />
        </div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-bold leading-tight mb-1 transition-colors duration-200"
              style={{ fontFamily: MONO, fontSize: "0.82rem", textTransform: "uppercase", color: hov ? AC : FG }}>
              {p.title}
            </h3>
            <p style={{ fontFamily: MONO, fontSize: "0.62rem", color: MUTED, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {p.tech.join(" · ")}{p.date ? ` — ${p.date}` : ""}
            </p>
          </div>
          <span className="shrink-0 transition-colors duration-200 mt-0.5"
            style={{ fontFamily: MONO, fontSize: "0.65rem", textTransform: "uppercase", color: hov ? AC : MUTED }}>↗</span>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

function GalleryCard({ g }: { g: typeof GALLERY[0] }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hov, setHov] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect(); if (!r) return
    setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * -14, y: ((e.clientX - r.left) / r.width - 0.5) * 14 })
  }
  return (
    <div ref={ref} className="shrink-0 overflow-hidden relative"
      data-cursor="gallery" data-noblue="1"
      style={{
        width: "clamp(190px,20vw,260px)", aspectRatio: "3/4",
        border: `1px solid ${hov ? AC : BDRC}`,
        transform: `perspective(700px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: (tilt.x === 0 && tilt.y === 0) ? "transform 0.5s ease, border-color 0.25s" : "transform 0.07s ease, border-color 0.25s",
        cursor: "none",
      }}
      onMouseMove={onMove} onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHov(false) }}
      onClick={() => navigate(g.href)}>
      <div className="w-full h-full bg-cover bg-center transition-transform duration-500"
        style={{ backgroundImage: `url('${g.img}')`, backgroundColor: "#d8d4cd", transform: hov ? "scale(1.07)" : "scale(1)" }} />
      <div className="absolute inset-0 flex flex-col justify-end p-4 transition-opacity duration-300"
        style={{ background: "linear-gradient(to top, rgba(15,14,13,0.85) 0%, transparent 55%)", opacity: hov ? 1 : 0.5 }}>
        <h4 style={{ fontFamily: MONO, fontSize: "0.68rem", fontWeight: 700, color: BG, textTransform: "uppercase", marginBottom: "0.2rem" }}>{g.title}</h4>
        <p style={{ fontFamily: MONO, fontSize: "0.56rem", color: "rgba(245,243,239,0.55)", textTransform: "uppercase" }}>{g.sub}</p>
      </div>
    </div>
  )
}

function Gallery() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)
  const [isDrag, setIsDrag] = useState(false)
  const onDown = (e: React.MouseEvent) => { dragging.current = true; setIsDrag(true); startX.current = e.pageX; scrollLeft.current = scrollRef.current?.scrollLeft || 0 }
  const onMove = (e: React.MouseEvent) => { if (!dragging.current || !scrollRef.current) return; scrollRef.current.scrollLeft = scrollLeft.current - (e.pageX - startX.current) * 1.4 }
  const onUp = () => { dragging.current = false; setIsDrag(false) }
  return (
    <div className="mt-14 pt-10 border-t" style={{ borderColor: BDRC }}>
      <div className="flex items-center justify-between mb-5">
        <p style={{ fontFamily: MONO, fontSize: "0.8rem", letterSpacing: "0.12em", color: MUTED, textTransform: "uppercase" }}>Fun!</p>
        <div className="flex gap-2">
          {["←", "→"].map((a, ai) => (
            <button key={a} onClick={() => scrollRef.current?.scrollBy({ left: ai === 0 ? -280 : 280, behavior: "smooth" })}
              className="text-xs px-3 py-1.5 uppercase tracking-widest transition-all"
              style={{ fontFamily: MONO, border: `1px solid ${BDRC}`, color: MUTED, background: "transparent", cursor: "none" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = AC; (e.currentTarget as HTMLButtonElement).style.color = AC }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = BDRC; (e.currentTarget as HTMLButtonElement).style.color = MUTED }}>
              {a}
            </button>
          ))}
        </div>
      </div>
      <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4 select-none"
        style={{ scrollbarWidth: "none", cursor: isDrag ? "grabbing" : "grab" }}
        onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}>
        {GALLERY.map(g => <GalleryCard key={g.title} g={g} />)}
      </div>
    </div>
  )
}

function Projects() {
  return (
    <section id="work" className="px-6 py-24 border-t" style={{ borderColor: BDRC }}>
      <Title>/ projects</Title>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14">
        {FEATURED.map((p, i) => <ProjectCard key={p.title} p={p} i={i} />)}
      </div>
      <Gallery />
    </section>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────

function About() {
  const { ref, vis } = useInView()
  return (
    <section id="about" className="px-6 py-24 border-t" style={{ borderColor: BDRC }}>
      <Title>/ about me</Title>
      <div ref={ref as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={vis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55 }}>
          <p className="text-sm uppercase mb-6 leading-[1.9]" style={{ fontFamily: MONO, color: "rgba(15,14,13,0.72)" }}>
            I am currently a senior at Lehigh University, pursuing a Bachelor of Science in Computer Science with a minor in Graphic Design. I&apos;ve interned as a UX Designer and Researcher at{" "}
            <span style={{ color: AC }}>DT House</span> and a UX Designer and Web Developer at{" "}
            <span style={{ color: AC }}>AINA Technologies</span>.{" "}
            I&apos;m a design-minded developer passionate about creating intuitive experiences that blend aesthetics with accessibility.
          </p>
          <p className="text-[0.6rem] tracking-widest uppercase mb-3" style={{ fontFamily: MONO, color: MUTED }}>technologies</p>
          <div className="grid grid-cols-2 gap-x-8 mb-7">
            {TECH_COLS.map((col, ci) => (
              <ul key={ci} className="list-none p-0 m-0">
                {col.map(s => (
                  <li key={s} className="text-xs py-2 uppercase border-b relative pl-3" style={{ fontFamily: MONO, borderColor: BDRC, color: "rgba(15,14,13,0.65)" }}>
                    <span style={{ color: AC, marginRight: "0.4rem" }}>→</span>{s}
                  </li>
                ))}
              </ul>
            ))}
          </div>
          <p className="text-sm uppercase leading-[1.9]" style={{ fontFamily: MONO, color: MUTED }}>
            In my free time, I love exploring new design tools, making my way through all the national parks, and playing way too much Roblox with my friends!
          </p>
        </motion.div>
        <motion.div className="relative" initial={{ opacity: 0, x: 20 }} animate={vis ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.55, delay: 0.12 }}>
          <div className="w-full bg-cover bg-center" style={{ aspectRatio: "16/9", maxHeight: "6000px", backgroundImage: "url('photos/about-me.jpg')", backgroundColor: "#d8d4cd" }} />
          <div className="absolute pointer-events-none" style={{ inset: 0, top: "10px", left: "10px", border: `1px solid ${AC}30`, zIndex: -1 }} />
        </motion.div>
      </div>
    </section>
  )
}

// ─── Experience ───────────────────────────────────────────────────────────────

interface Entry { title: string; period: string; bullets: string[] }

function AccordionItem({ e, idx }: { e: Entry; idx: number }) {
  const [open, setOpen] = useState(false)
  const { ref, vis } = useInView("-30px")
  return (
    <motion.div ref={ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, x: -16 }} animate={vis ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: idx * 0.07 }}
      className="border-b" style={{ borderColor: BDRC }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-start gap-4 py-5 text-left bg-transparent border-none group" style={{ cursor: "none" }}>
        <span className="text-[0.58rem] tracking-widest shrink-0 mt-0.5 w-6" style={{ fontFamily: MONO, color: AC }}>{String(idx + 1).padStart(2, "0")}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold uppercase transition-colors leading-snug" style={{ fontFamily: MONO, color: open ? AC : FG }}>{e.title}</p>
          <p className="text-xs mt-1 uppercase" style={{ fontFamily: MONO, color: MUTED }}>{e.period}</p>
        </div>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }} className="text-xl shrink-0 mt-0.5" style={{ color: AC, fontFamily: MONO }}>+</motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: "easeInOut" }} className="overflow-hidden">
            <ul className="pb-5 pl-10 list-none m-0">
              {e.bullets.map((b, bi) => (
                <li key={bi} className="text-xs leading-relaxed mb-2.5 relative pl-4 uppercase" style={{ fontFamily: MONO, color: MUTED }}>
                  <span className="absolute left-0" style={{ color: AC }}>→</span>{b}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function Experience() {
  const professional: Entry[] = [
    {
      title: "UX/UI Design and Research Intern @ DT House",
      period: "Singapore · June 2025 – August 2025",
      bullets: [
        "Designed interactive MVP mockups using Figma to support foundational AI model workflows, improving early-stage UX for data-intensive users.",
        "Revamped company website HTML/CSS/JavaScript to better communicate product value and align with modern design standards.",
        "Conducted research and prototype interfaces for AI/robotics dataset exploration, enhancing clarity in non-text data presentation.",
      ],
    },
    {
      title: "UX/UI Design and Web Development Intern @ AINA Technologies",
      period: "Lehigh@NASDAQ · January 2025 – May 2025",
      bullets: [
        "Designed intuitive UI/UX features including speech recognition, transcription, and indicator display functionalities for AINA's web interface.",
        "Created wireframes and testable prototypes using Figma to enhance user flow and consistency.",
        "Collaborated with AINA to analyze design components for improving human trafficking training for frontline workers using advanced ML models.",
      ],
    },
  ]
  const leadership: Entry[] = [
    {
      title: "PR & Web Dev Officer @ Lehigh University Women in Computer Science",
      period: "Lehigh University · May 2026 – present",
      bullets: [
        "Design promotional graphics in Canva and contribute to the club website using HTML and CSS.",
        "Manage social media content and outreach to increase club visibility and engagement.",
      ],
    },
    {
      title: "Secretary, Social Media Chair @ Lehigh Vietnamese Student Association",
      period: "Lehigh University · August 2024 – May 2026",
      bullets: [
        "Increased club membership by 15% through effective management and optimization of the club's web page and social media.",
        "Documented meeting notes, completed event forms/requests, and coordinated weekly event planning.",
      ],
    },
  ]
  return (
    <section id="resume" className="px-6 py-24 border-t" style={{ borderColor: BDRC }}>
      <Title>/ experience</Title>
      <div className="max-w-3xl">
        <p className="text-[0.58rem] tracking-widest uppercase mb-4" style={{ fontFamily: MONO, color: `${AC}99` }}>Professional</p>
        {professional.map((e, i) => <AccordionItem key={e.title} e={e} idx={i} />)}
        <p className="text-[0.58rem] tracking-widest uppercase mt-10 mb-4" style={{ fontFamily: MONO, color: `${AC}99` }}>Leadership</p>
        {leadership.map((e, i) => <AccordionItem key={e.title} e={e} idx={i + professional.length} />)}
        <div className="mt-10">
          <a href="resume.pdf" target="_blank" rel="noopener noreferrer" data-noblue="1"
            className="inline-flex items-center gap-3 px-6 py-4 text-xs tracking-widest uppercase no-underline font-bold transition-opacity"
            style={{ fontFamily: MONO, background: AC, color: BG, cursor: "none" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.8" }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1" }}>
            [ view full resume ]
            {/* <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg> */}
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── Home page ────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <About />
      <Experience />
      <Footer />
    </>
  )
}
