import { useNavigate } from "react-router"
import { FG, AC, MONO } from "../constants"

export default function Nav({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const navigate = useNavigate()
  return (
    <nav className="fixed top-0 w-full z-[1000]" style={{ fontFamily: MONO, color: "#fff", mixBlendMode: "difference", isolation: "isolate", backgroundColor: "rgba(255,255,255,0.0)" }}>
      <div className="flex items-start justify-between px-4 py-4 gap-3 relative sm:px-6 sm:py-5">
        <div className="flex-1 min-w-0">
          <button className="flex flex-col items-start text-left uppercase transition-colors md:hidden"
            style={{ color: "#fff", cursor: "none", mixBlendMode: "difference" }}
            onClick={() => navigate("/")}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = AC }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#fff" }}>
            <span className="text-[0.8rem] font-bold tracking-[0.2em]">ANGELINA LE</span>
            <span className="mt-1 text-[0.56rem] font-normal tracking-[0.18em] opacity-70 leading-[1.3]">UX DESIGNER & CREATIVE DEVELOPER</span>
          </button>
          <button className="hidden md:inline-flex items-center text-sm font-normal tracking-wider uppercase bg-transparent border-none transition-colors"
            style={{ color: "#fff", cursor: "none", mixBlendMode: "difference" }}
            onClick={() => navigate("/")}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = AC }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#fff" }}>
            <span style={{ fontWeight: 700 }}>AL</span>
            <span style={{ opacity: 0.7, marginLeft: "0.5rem" }}>UX DESIGNER & CREATIVE DEVELOPER</span>
          </button>
        </div>

        <div className="flex-shrink-0">
          <button onClick={onToggle} aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex items-center justify-center p-1.5 bg-transparent border-none transition-colors md:hidden"
            style={{ color: open ? AC : "#fff", cursor: "none", mixBlendMode: "difference" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
              <path d="M4 7h16" strokeLinecap="round" />
              <path d="M4 12h16" strokeLinecap="round" />
              <path d="M4 17h16" strokeLinecap="round" />
            </svg>
          </button>
          <div className="hidden md:absolute md:left-1/2 md:-translate-x-1/2 md:block">
            <button onClick={onToggle} className="text-xs font-normal tracking-[0.15em] bg-transparent border-none uppercase transition-colors"
              style={{ color: open ? AC : "#fff", cursor: "none", mixBlendMode: "difference" }}>
              {open ? "[ close ]" : "[ menu ]"}
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
              style={{ color: "#fff", cursor: "none", mixBlendMode: "difference" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = AC }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#fff" }}>
              {icon}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
