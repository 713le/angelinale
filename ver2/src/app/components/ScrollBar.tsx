import { useState, useEffect } from "react"
import { AC } from "../constants"

export default function ScrollBar() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const upd = () => { const t = document.documentElement.scrollHeight - window.innerHeight; setP(t > 0 ? window.scrollY / t : 0) }
    window.addEventListener("scroll", upd, { passive: true })
    return () => window.removeEventListener("scroll", upd)
  }, [])
  return (
    <div className="fixed top-0 left-0 right-0 z-[9998]" style={{ height: "2px", background: `${AC}18` }}>
      <div style={{ height: "100%", width: `${p * 100}%`, background: AC, transition: "width 0.1s linear" }} />
    </div>
  )
}
