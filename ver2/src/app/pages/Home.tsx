import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Star } from "lucide-react"
import { Link } from "react-router"
import { useInView } from "../hooks"
import { BG, FG, AC, BDRC, MUTED, MONO } from "../constants"
import Footer from "../components/Footer"

// // Use root `/photos/` thumbnail for MenuLens to match other pages
// const MENULENS_THUMB = '/photos/menulens-mockup-2.webp'

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

interface FeaturedProject {
  title: string
  description: string
  tags: string[]
  image: string
  href: string
  external?: boolean
  cursorLabel?: string
}

const FEATURED: FeaturedProject[] = [
  {
    title: "ACCESSLY",
    description: "A shared accessibility audit workspace that helps design and engineering teams find barriers before they reach users.",
    tags: ["Oct 2026", "Product design", "Accessibility"],
    image: "/photos/accessly-mockup.webp",
    href: "/projects/accessly",
    cursorLabel: "coming soon",
  },
  {
    title: "MATCHA CLOUD",
    description: "A first-time-friendly shop that makes matcha easier to choose.",
    tags: ["Sep 2026", "Mobile e-commerce", "Product design"],
    image: "/photos/matcha-cloud-mockups.png",
    href: "https://medium.com/@avl227/matcha-cloud-mobile-e-commerce-0b6b6a21fdd7?postPublishedType=repub",
    external: true,
    cursorLabel: "read article",
  },
  {
    title: "MENULENS",
    description: "Turn unfamiliar menus into dishes you can picture before ordering.",
    tags: ["Aug 2026", "Product design", "Figma"],
    image: "/photos/menulens-mockup-2.webp",
    href: "/projects/menulens",
  },
  {
    title: "TOOLKIT FOR DISABILITY WELLBEING IN BETHLEHEM",
    description: "A Bethlehem resource hub connecting disabled residents with support and community.",
    tags: ["2026", "Full-stack dev", "Accessibility"],
    image: "/photos/toolkit.webp",
    href: "/projects/toolkit",
  },
  {
    title: "VYNL",
    description: "Build your personal album ranking through head-to-head picks.",
    tags: ["2026", "Full-stack dev", "React", "PostgreSQL"],
    image: "/photos/vynl.webp",
    href: "/projects/vynl",
  },
]

interface GalleryProject {
  title: string
  sub: string
  img?: string
  href?: string
  external?: boolean
  cursorLabel?: string
}

const GALLERY: GalleryProject[] = [
  { title: "INTERPLAY", sub: "Graphic chapbook design", img: "photos/Chapbook Mockup Inside Pages.jpg", href: "/projects/interplay" },
  { title: "LETTERFORM EXCHANGE", sub: "Typography and poster design", img: "photos/letterform-poster-mockup.png", href: "/projects/letterform-exchange" },
    { title: "WICS WEBSITE", sub: "Website redesign for Lehigh WiCS", img: "photos/wics-site-mockup.jpg", href: "https://wics.cse.lehigh.edu/", external: true, cursorLabel: "view website" },
  { title: "LAZY LAKE", sub: "P5.js poster", img: "photos/boat-scene.gif", href: "/projects/lazy-lake" },

    { title: "INTERACTIVE RECORD PLAYER", sub: "Blender and Unity", img: "photos/recordplayerred.png", href: "/projects/record-player" },

  { title: "LIFE OF PI", sub: "Cover and spine redesign", img: "photos/lifeofpicovermockup.png", href: "/projects/life-of-pi" },
  { title: "PARASITE", sub: "Symbol designs", img: "photos/parasite.png", href: "/projects/parasite" },
  { title: "NOSTALGIA", sub: "P5.js poster", img: "photos/final-print.png", href: "/projects/nostalgia" },
  { title: "CATS", sub: "P5.js poster", img: "photos/cats.gif", href: "/projects/cats" },
]

const TECH_COLS = [
  ["Figma", "React", "JavaScript/TypeScript", "CSS/Responsive Design"],
  ["Adobe Creative Suite", "Blender", "Unity", "Node.js"],
]

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section id="home" className="relative flex min-h-[86svh] flex-col justify-end gap-8 overflow-hidden px-5 pb-7 pt-24 sm:px-8 md:px-12 md:pb-10">
      <div className="grid items-end gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <motion.div className="relative z-10 order-2 lg:order-1"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <h1 className="mb-4 whitespace-nowrap text-[2.3rem] font-extrabold uppercase leading-[0.84] min-[360px]:text-[2.55rem] sm:text-[4rem] lg:text-[4.5rem] xl:text-[5.7rem] 2xl:text-[7rem]"
            style={{ fontFamily: MONO, color: FG }}>
            Angelina Le
          </h1>
          <p className="max-w-xl text-lg leading-relaxed md:text-xl">
            Design-minded and code-fluent. I turn complex ideas into clear, accessible digital experiences.
          </p>
          <button onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
            className="mt-7 inline-flex min-h-12 min-w-0 items-center gap-4 border-2 border-foreground bg-accent px-5 text-sm font-bold uppercase tracking-wide text-foreground transition-transform hover:-translate-y-1 hover:text-foreground"
            style={{ cursor: "pointer" }}>
            Selected work <ArrowDown aria-hidden="true" size={17} />
          </button>
        </motion.div>

        <motion.figure className="relative order-1 m-0 lg:order-2"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.18 }}>
          <div className="overflow-hidden border-2 border-foreground bg-[#efe7db]">
            <img src="/photos/hero-bunnies.png" alt="3 green hand-drawn bunny doodles"
              className="aspect-[16/10] w-full object-cover object-center transition-transform duration-700 hover:scale-[1.02]" />
          </div>
          <figcaption className="mt-3 flex items-start justify-between gap-4 border-t border-foreground pt-2 text-xs uppercase">
            {/* <span>Design at the intersection of people and technology</span> */}
            {/* <span className="shrink-0 font-bold">01 / 04</span> */}
          </figcaption>
          <span className="absolute -right-2 -top-3 bg-accent px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest md:-right-4 md:top-5">
            Portfolio 2026
          </span>
        </motion.figure>
      </div>
      <div className="flex items-center justify-between border-t-2 border-foreground pt-3 text-xs font-bold uppercase tracking-[0.12em]">
        <span>Lehigh University · PA</span>
        <span className="hidden sm:inline">Scroll for selected work ↓</span>
      </div>
    </section>
  )
}

// ─── Section title ────────────────────────────────────────────────────────────

function Title({ children, color = FG }: { children: string; color?: string }) {
  const { ref, vis } = useInView()
  return (
    <motion.h2 ref={ref as React.RefObject<HTMLHeadingElement>}
      initial={{ opacity: 0, y: 20 }} animate={vis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
      style={{ fontFamily: MONO, fontSize: "clamp(3rem,8vw,7rem)", fontWeight: 800, color, cursor: "none", textTransform: "uppercase", letterSpacing: "0", marginBottom: "0", lineHeight: 0.88 }}>
      {children}
    </motion.h2>
  )
}

// ─── Project cards ────────────────────────────────────────────────────────────

function ProjectCard({ p, i }: { p: FeaturedProject; i: number }) {
  const [hov, setHov] = useState(false)
  const { ref, vis } = useInView("-30px")
  return (
    <motion.article ref={ref as React.RefObject<HTMLElement>}
      className="min-w-0"
      initial={{ opacity: 0, y: 28 }} animate={vis ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}>
      {p.external ? (
        <a href={p.href} target="_blank" rel="noopener noreferrer" className="group block no-underline" data-cursor="project" data-cursor-label={p.cursorLabel} data-noblue="1"
          onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ cursor: "pointer" }}>
          {projectCardContent(p, i, hov)}
        </a>
      ) : (
        <Link to={p.href} className="group block no-underline" data-cursor="project" data-cursor-label={p.cursorLabel} data-noblue="1"
          onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ cursor: "pointer" }}>
          {projectCardContent(p, i, hov)}
        </Link>
      )}
    </motion.article>
  )
}

function projectCardContent(p: FeaturedProject, i: number, hov: boolean) {
  return (
    <>
        <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden bg-[#efe7db]">
          <img src={p.image} alt={`${p.title} project`} loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
          <span className="absolute left-0 top-0 bg-accent px-3 py-2 text-xs font-bold">
            {String(i + 1).padStart(2, "0")} / {String(FEATURED.length).padStart(2, "0")}
          </span>
          <span className="absolute bottom-3 right-3 inline-flex size-10 items-center justify-center bg-accent text-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
            <ArrowUpRight aria-hidden="true" size={19} strokeWidth={2.5} />
          </span>
        </div>
        <h3 className="mb-2 line-clamp-2 text-lg font-extrabold uppercase leading-tight transition-colors duration-200 md:text-xl"
          style={{ fontFamily: MONO, color: hov ? AC : FG }}>
          {p.title}
        </h3>
        <div className="mb-2 flex flex-wrap gap-1.5">
          {p.tags.map(tag => (
            <span key={tag} className="project-meta-tag inline-flex items-center bg-transparent px-2.5 py-1 text-[0.62rem] font-bold uppercase leading-tight text-foreground">
              {tag}
            </span>
          ))}
        </div>
        <p className="line-clamp-2 text-sm leading-snug text-foreground/80">
          {p.description}
        </p>
    </>
  )
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

function GalleryCard({ g }: { g: GalleryProject }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hov, setHov] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect(); if (!r) return
    setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * -14, y: ((e.clientX - r.left) / r.width - 0.5) * 14 })
  }
  const card = (
    <div ref={ref} className="relative shrink-0 overflow-hidden border-2 border-foreground"
      data-cursor={g.href ? "gallery" : undefined} data-cursor-label={g.cursorLabel} data-noblue="1"
      style={{
        width: "clamp(220px,24vw,320px)", aspectRatio: "4/5",
        borderColor: hov ? AC : FG,
        transform: `perspective(700px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: (tilt.x === 0 && tilt.y === 0) ? "transform 0.5s ease, border-color 0.25s" : "transform 0.07s ease, border-color 0.25s",
        cursor: g.href ? "none" : "default",
      }}
      onMouseMove={onMove} onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHov(false) }}>
      {g.img ? (
        <img src={`/${g.img}`} alt={g.title} loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500"
          style={{ transform: hov ? "scale(1.04)" : "scale(1)" }} />
      ) : (
        <div className="absolute inset-0 flex flex-col justify-between bg-[#dce9cf] p-5 text-foreground">
          <span className="text-[0.6rem] font-bold uppercase tracking-[0.14em]">Lehigh University</span>
          <div>
            <p className="mb-1 text-[3.5rem] font-extrabold leading-none">WiCS</p>
            <div className="mb-2 h-px w-full bg-foreground" />
            <p className="text-xs font-semibold">Women in Computer Science</p>
          </div>
        </div>
      )}
      <div className="absolute inset-0 transition-opacity duration-300"
        style={{ background: "linear-gradient(to top, color-mix(in srgb, var(--foreground) 92%, transparent) 0%, transparent 65%)", opacity: hov ? 1 : 0.9 }} />
      <div className="absolute inset-0 flex flex-col justify-end p-4">
        <h4 className="mb-1 text-xl font-extrabold uppercase text-accent">{g.title}</h4>
        <p className="text-xs font-bold text-[#fffdf8]">{g.sub}</p>
      </div>
    </div>
  )
    return g.href ? g.external ? (
      <a href={g.href} target="_blank" rel="noopener noreferrer" className="block shrink-0 no-underline">
        {card}
      </a>
    ) : (
      <Link to={g.href} className="block shrink-0 no-underline">
        {card}
      </Link>
    ) : card
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
    <div className="mt-20 border-t-2 pt-8" style={{ borderColor: FG }}>
      <div className="mb-7 flex items-end justify-between gap-4">
        <div>
          {/* <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-foreground/60">Side projects / experiments</p> */}
          <h3 className="text-3xl font-extrabold uppercase md:text-5xl">Archive</h3>
        </div>
        <div className="flex gap-2">
          {[
            { Icon: ArrowLeft, label: "Scroll gallery left", distance: -280 },
            { Icon: ArrowRight, label: "Scroll gallery right", distance: 280 },
          ].map(({ Icon, label, distance }) => (
            <button key={label} aria-label={label} title={label}
              aria-controls="project-archive"
              onClick={() => scrollRef.current?.scrollBy({ left: distance, behavior: "smooth" })}
              className="inline-flex size-11 items-center justify-center border-2 border-foreground bg-transparent text-foreground transition-colors hover:bg-accent hover:text-foreground"
              style={{ cursor: "pointer" }}>
              <Icon aria-hidden="true" size={16} strokeWidth={2.5} />
            </button>
          ))}
        </div>
      </div>
      <div id="project-archive" ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4 select-none"
        style={{ scrollbarWidth: "none", cursor: isDrag ? "grabbing" : "grab" }}
        onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}>
        {GALLERY.map(g => <GalleryCard key={g.title} g={g} />)}
      </div>
    </div>
  )
}

function Projects() {
  return (
    <section id="work" className="border-t-2 px-5 py-20 sm:px-8 md:px-12 md:py-28" style={{ borderColor: FG }}>
      <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end md:mb-20">
        <Title>Selected work</Title>
        <p className="max-w-xs text-sm font-bold uppercase leading-relaxed text-foreground/65">Product thinking, visual systems, and experiments built around real people.</p>
      </div>
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:gap-y-16">
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
    <section id="about" className="border-t-2 px-5 py-20 text-background sm:px-8 md:px-12 md:py-28" style={{ borderColor: FG, background: FG, color: BG }}>
      <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end md:mb-20">
        <Title color={BG}>In brief</Title>
        <p className="text-sm font-bold uppercase tracking-[0.12em]" style={{ color: "color-mix(in srgb, var(--background) 100%, transparent)" }}>About Me</p>
      </div>
      <div ref={ref as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 items-start gap-10 md:grid-cols-[1fr_0.9fr] md:gap-16">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={vis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55 }}>
          <p className="mb-8 text-lg leading-[1.65] md:text-2xl" style={{ fontFamily: MONO, color: BG }}>
            I am currently a senior at Lehigh University, pursuing a Bachelor of Science in Computer Science with a minor in Graphic Design. I&apos;ve interned as a UX Designer and Researcher at{" "}
            <span className="bg-accent px-1 text-foreground"><CompanyLink href="https://www.dt-house.com/">DT House</CompanyLink></span> and a UX Designer and Web Developer at{" "}
            <span className="bg-accent px-1 text-foreground"><CompanyLink href="https://ainatechnologies.com/">AINA Technologies</CompanyLink></span>. I also volunteer as a Designer with{" "}
            <span className="bg-accent px-1 text-foreground">The Bebop Workshop Institute</span> alongside{" "}
            <span className="bg-accent px-1 text-foreground"><CompanyLink href="https://www.developforgood.org/">Develop for Good</CompanyLink></span>, and work as a Digital Media Research Assistant with{" "}
            <span className="bg-accent px-1 text-foreground"><CompanyLink href="https://www.futureghost.art/">Future Ghost Digital Media Research Lab</CompanyLink></span>.{" "}
            I&apos;m a design-minded developer passionate about creating intuitive experiences that blend aesthetics with accessibility.
          </p>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em]">Tools</p>
          <div className="mb-8 grid grid-cols-2 gap-x-8">
            {TECH_COLS.map((col, ci) => (
              <ul key={ci} className="m-0 list-none p-0">
                {col.map(s => (
                  <li key={s} className="flex items-center gap-2 py-2 text-sm" style={{ color: BG }}>
                    <Star aria-hidden="true" size={12} strokeWidth={2} fill={AC} color={AC} />
                    {s}
                  </li>
                ))}
              </ul>
            ))}
          </div>
          <p className="max-w-xl text-base leading-[1.7] text-background/80 md:text-lg">
            In my free time, I love exploring new design tools, making my way through all the national parks, and playing (way too much) Roblox with my friends!
          </p>
        </motion.div>
        <motion.figure className="relative m-0" initial={{ opacity: 0, x: 20 }} animate={vis ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.55, delay: 0.12 }}>
          <div className="overflow-hidden border-2 border-foreground bg-[#efe7db]">
            <img src="/photos/about-me.jpg" alt="AI.NA Technologies campaign in Times Square" loading="lazy" className="aspect-[4/5] w-full object-cover md:aspect-[5/6]" />
          </div>
          <figcaption className="mt-3 border-t-2 border-foreground pt-2 text-xs font-bold uppercase tracking-wide">New York, NY / <span className="bg-accent px-1 text-foreground"><CompanyLink href="https://ainatechnologies.com/">AINA Technologies</CompanyLink></span></figcaption>
        </motion.figure>
      </div>
    </section>
  )
}

// ─── Experience ───────────────────────────────────────────────────────────────

interface Entry { title: string; period: string; bullets: string[] }

function CompanyLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="text-inherit no-underline hover:opacity-80">{children}</a>
}

function AccordionItem({ e, idx }: { e: Entry; idx: number }) {
  const [open, setOpen] = useState(false)
  const { ref, vis } = useInView("-30px")
  return (
    <motion.div ref={ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, x: -16 }} animate={vis ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: idx * 0.07 }}
      className="border-b" style={{ borderColor: BDRC }}>
      <button onClick={() => setOpen(!open)} aria-expanded={open} aria-label={`${open ? "Collapse" : "Expand"} experience details ${idx + 1}`}
        className="group flex w-full items-start gap-4 border-none bg-transparent py-5 text-left" style={{ cursor: "none" }}>
        <span className="text-[0.58rem] tracking-widest shrink-0 mt-0.5 w-6" style={{ fontFamily: MONO, color: "color-mix(in srgb, var(--foreground) 72%, transparent)" }}>{String(idx + 1).padStart(2, "0")}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold uppercase transition-colors leading-snug" style={{ fontFamily: MONO, color: open ? AC : FG }}>{e.title}</p>
          <p className="text-xs mt-1 uppercase" style={{ fontFamily: MONO, color: MUTED }}>{e.period}</p>
        </div>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }} className="text-xl shrink-0 mt-0.5" style={{ color: "color-mix(in srgb, var(--foreground) 72%, transparent)", fontFamily: MONO }}>+</motion.span>
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
      title: "Designer – The Bebop Workshop Institute w/ Develop for Good",
      period: "October 2026 – present",
      bullets: [
        "Designing a site with a mission page, donation integration, bursary application form, education video portal, and event calendar for a nonprofit offering free jazz education to youth and low-income musicians, as part of a volunteer team.",
      ],
    },
    {
      title: "Digital Media Research Assistant – Future Ghost Digital Media Research Lab",
      period: "October 2026 – present",
      bullets: [
        "Contributing to design and development projects and supporting long-form health equity research for a performance and emerging-technology collective.",
      ],
    },
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
    <section id="resume" className="border-t-2 px-5 py-20 sm:px-8 md:px-12 md:py-28" style={{ borderColor: FG }}>
      <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end md:mb-16">
        <Title>Experience</Title>
        <a href="resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex w-fit items-center gap-3 border-2 border-foreground bg-accent px-5 py-3 text-sm font-bold uppercase text-foreground transition-transform hover:-translate-y-1 hover:text-foreground">
          Full résumé <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <p className="mb-4 border-b-2 border-foreground pb-3 text-sm font-bold uppercase tracking-[0.12em]">Professional</p>
          {professional.map((e, i) => <AccordionItem key={i} e={e} idx={i} />)}
        </div>
        <div>
          <p className="mb-4 border-b-2 border-foreground pb-3 text-sm font-bold uppercase tracking-[0.12em]">Leadership</p>
          {leadership.map((e, i) => <AccordionItem key={i} e={e} idx={i + professional.length} />)}
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
      <img src="/photos/lehigh.jpg" alt="Aerial view of Lehigh University" loading="lazy" className="block h-auto w-full" />
      <Footer />
    </>
  )
}
