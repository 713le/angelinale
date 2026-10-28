import { useNavigate } from "react-router"
import { FG, AC, MONO } from "../constants"

export default function Nav({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const navigate = useNavigate()
  return (
    <nav className="fixed top-0 z-[1000] w-full" style={{ fontFamily: MONO, color: FG, background: "rgba(255,253,248,0.96)", backdropFilter: "blur(14px)" }}>
      <div className="relative flex items-center justify-between gap-3 px-5 py-3 sm:px-8 md:px-12">
        <div className="flex-1 min-w-0">
          <button className="flex flex-col items-start text-left uppercase transition-colors"
            style={{ color: FG, cursor: "pointer" }}
            onClick={() => navigate("/")}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = FG }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = FG }}>
            <span className="text-sm font-extrabold tracking-[0.12em]">ANGELINA LE</span>
            <span className="mt-0.5 hidden text-[0.58rem] font-bold tracking-[0.12em] text-foreground/60 sm:block">UX DESIGNER & CREATIVE DEVELOPER</span>
          </button>
        </div>

        <div className="flex-shrink-0">
          <button onClick={onToggle} aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-10 items-center justify-center bg-transparent text-foreground transition-colors hover:bg-accent md:hidden"
            style={{ cursor: "pointer" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
              <path d="M4 7h16" strokeLinecap="round" />
              <path d="M4 12h16" strokeLinecap="round" />
              <path d="M4 17h16" strokeLinecap="round" />
            </svg>
          </button>
          <div className="hidden md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:block">
            <button onClick={onToggle} className="bg-transparent px-5 py-2 text-xs font-bold uppercase tracking-[0.15em] text-foreground transition-colors hover:bg-accent"
              style={{ cursor: "pointer" }}>
              {open ? "[ CLOSE ]" : "[ MENU ]"}
            </button>
          </div>
        </div>

        <div className="hidden md:flex md:items-center md:gap-4">
          {([
            ["mailto:angelinale13@gmail.com", <svg key="m" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>, ""],
            ["https://www.linkedin.com/in/angelinavle/", <svg key="l" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>, "_blank"],
          ] as [string, React.ReactNode, string][]).map(([href, icon, target]) => (
            <a key={href} href={href} {...(target ? { target, rel: "noopener noreferrer" } : {})}
              data-noblue="1"
              style={{ color: FG, cursor: "pointer" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = FG }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = FG }}>
              {icon}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
