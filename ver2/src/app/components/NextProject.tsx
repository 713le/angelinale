import { Link, useLocation } from "react-router"
import { ArrowUpRight } from "lucide-react"
import { FG, BDRC, MUTED, MONO } from "../constants"

const PROJECTS = [
  { path: "/projects/menulens", title: "MENULENS", image: "/photos/menulens-mockup-2.webp" },
  { path: "/projects/accessly", title: "ACCESSLY", image: "/photos/accessly-mockup.webp" },
  { path: "/projects/toolkit", title: "TOOLKIT FOR DISABILITY WELLBEING", image: "/photos/toolkit.webp" },
  { path: "/projects/vynl", title: "VYNL", image: "/photos/vynl.webp" },
  { path: "/projects/interplay", title: "INTERPLAY", image: "/photos/Chapbook%20Mockup%20Inside%20Pages.jpg" },
  { path: "/projects/life-of-pi", title: "LIFE OF PI", image: "/photos/lifeofpicovermockup.png" },
  { path: "/projects/parasite", title: "PARASITE", image: "/photos/parasite.png" },
  { path: "/projects/nostalgia", title: "NOSTALGIA", image: "/photos/final-print.png" },
  { path: "/projects/lazy-lake", title: "LAZY LAKE", image: "/photos/boat-scene.gif" },
  { path: "/projects/cats", title: "CATS", image: "/photos/cats.gif" },
  { path: "/projects/record-player", title: "RECORD PLAYER", image: "/photos/recordplayerred.png" },
]

export default function NextProject() {
  const { pathname } = useLocation()
  const projectIndex = PROJECTS.findIndex((project) => project.path === pathname)
  if (projectIndex < 0) return null

  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length]

  return (
    <section className="px-6 py-8 md:px-8 md:py-10 border-y" style={{ borderColor: BDRC }}>
      <Link to={nextProject.path} aria-label={`Next Project: ${nextProject.title}`}
        className="group grid grid-cols-1 items-center gap-6 no-underline transition-colors md:grid-cols-[minmax(0,1fr)_minmax(18rem,0.9fr)] md:gap-10"
        style={{ color: FG, cursor: "none" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = FG }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = FG }}>
        <div>
          <div>
            <p className="text-xs tracking-widest mb-3" style={{ fontFamily: MONO, color: MUTED }}>Next Project</p>
            <h2 className="m-0" style={{ fontFamily: MONO, fontSize: "clamp(1.5rem,4vw,3rem)", fontWeight: 500, lineHeight: 1, color: "currentColor" }}>
              {nextProject.title}<ArrowUpRight aria-hidden="true" size="1.5em" strokeWidth={2} className="ml-3 inline-block align-middle" />
            </h2>
          </div>
        </div>
        <div className="flex h-48 w-full items-center justify-end overflow-hidden md:h-72">
          <img src={nextProject.image} alt={`${nextProject.title} project preview`} loading="lazy"
            className="h-full w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]" />
        </div>
      </Link>
    </section>
  )
}