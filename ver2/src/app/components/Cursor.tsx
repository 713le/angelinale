import { useState, useEffect, useRef } from "react"
import { motion } from "motion/react"
import { AC, BG, MONO } from "../constants"

type CursorMode = "default" | "link" | "project" | "gallery"

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: -200, y: -200 })
  const lagged = useRef({ x: -200, y: -200 })
  const raf = useRef<number | null>(null)
  const [show, setShow] = useState(false)
  const [mode, setMode] = useState<CursorMode>("default")
  const [showCursor, setShowCursor] = useState(false)
  const lastLink = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const media = window.matchMedia("(pointer: fine)")
    const updatePointerSupport = () => setShowCursor(media.matches)
    updatePointerSupport()

    const onMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; setShow(true) }
    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (lastLink.current) { lastLink.current.style.color = ""; lastLink.current = null }
      const proj = el.closest("[data-cursor='project']")
      const gallery = el.closest("[data-cursor='gallery']")
      const link = el.closest("a,button")
      if (proj) { setMode("project") }
      else if (gallery) { setMode("gallery") }
      else if (link) {
        setMode("link")
        const linkEl = link as HTMLElement
        if (!linkEl.dataset.noblue) { linkEl.style.color = AC; lastLink.current = linkEl }
      } else { setMode("default") }
    }
    const onOut = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      const link = el.closest("a,button") as HTMLElement | null
      if (link && lastLink.current === link) { link.style.color = ""; lastLink.current = null }
    }
    const tick = () => {
      lagged.current.x += (mouse.current.x - lagged.current.x) * 0.13
      lagged.current.y += (mouse.current.y - lagged.current.y) * 0.13
      if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${lagged.current.x}px,${lagged.current.y}px,0)`
      raf.current = window.requestAnimationFrame(tick)
    }
    media.addEventListener("change", updatePointerSupport)
    document.addEventListener("mousemove", onMove)
    document.addEventListener("mouseover", onOver)
    document.addEventListener("mouseout", onOut)
    document.addEventListener("mouseleave", () => setShow(false))
    raf.current = window.requestAnimationFrame(tick)
    return () => {
      media.removeEventListener("change", updatePointerSupport)
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseover", onOver)
      document.removeEventListener("mouseout", onOut)
      if (raf.current !== null) cancelAnimationFrame(raf.current)
    }
  }, [])

  const isPill = mode === "project" || mode === "gallery"
  const isLink = mode === "link"
  const pillLabel = mode === "gallery" ? "view overview" : "view case study"

  if (!showCursor) return null

  return (
    <div ref={cursorRef} className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{ opacity: show ? 1 : 0, transition: "opacity 0.25s", willChange: "transform" }}>
      {isPill ? (
        <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }} transition={{ duration: 0.15 }}
          style={{ transform: "translate(-50%,-50%)", padding: "0.38rem 0.9rem", borderRadius: "999px",
            background: AC, color: BG, fontFamily: MONO, fontSize: "0.58rem", fontWeight: 700,
            letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
          {pillLabel}
        </motion.div>
      ) : (
        <div style={{
          transform: "translate(-50%,-50%)", width: isLink ? "36px" : "10px", height: isLink ? "36px" : "10px",
          borderRadius: "50%", background: isLink ? `${AC}28` : AC, border: isLink ? `1.5px solid ${AC}` : "none",
          transition: "width 0.22s ease, height 0.22s ease, background 0.22s ease",
        }} />
      )}
    </div>
  )
}
