import { useState, useEffect, useRef } from "react"
import { motion } from "motion/react"
import { Circle } from "lucide-react"
import { AC, BG, MONO } from "../constants"

type CursorMode = "default" | "text" | "link" | "project" | "gallery" | "doodle"

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: -200, y: -200 })
  const lagged = useRef({ x: -200, y: -200 })
  const raf = useRef<number | null>(null)
  const [show, setShow] = useState(false)
  const [mode, setMode] = useState<CursorMode>("default")
  const [doodleTool, setDoodleTool] = useState<"pen" | "eraser">("pen")
  const [showCursor, setShowCursor] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const media = window.matchMedia("(pointer: fine)")
    const updatePointerSupport = () => setShowCursor(media.matches)
    updatePointerSupport()

    const onMove = (e: PointerEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (document.documentElement.dataset.doodle === "true") {
        setMode("doodle")
        lagged.current = { ...mouse.current }
        if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`
      }
      setShow(true)
    }
    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      const proj = el.closest("[data-cursor='project']")
      const gallery = el.closest("[data-cursor='gallery']")
      const link = el.closest("a,button")
      const text = el.closest("p,h1,h2,h3,h4,h5,h6,li,blockquote,figcaption,dt,dd")
      if (document.documentElement.dataset.doodle === "true") { setMode("doodle") }
      else if (proj) { setMode("project") }
      else if (gallery) { setMode("gallery") }
      else if (link) { setMode("link") }
      else if (text) { setMode("text") }
      else { setMode("default") }
    }
    const syncDoodleTool = () => {
      setDoodleTool(document.documentElement.dataset.doodleTool === "eraser" ? "eraser" : "pen")
    }
    const tick = () => {
      if (document.documentElement.dataset.doodle === "true") {
        lagged.current = { ...mouse.current }
      } else {
        lagged.current.x += (mouse.current.x - lagged.current.x) * 0.13
        lagged.current.y += (mouse.current.y - lagged.current.y) * 0.13
      }
      if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${lagged.current.x}px,${lagged.current.y}px,0)`
      raf.current = window.requestAnimationFrame(tick)
    }
    media.addEventListener("change", updatePointerSupport)
    document.addEventListener("pointermove", onMove)
    document.addEventListener("mouseover", onOver)
    document.addEventListener("mouseleave", () => setShow(false))
    window.addEventListener("doodletoolchange", syncDoodleTool)
    raf.current = window.requestAnimationFrame(tick)
    return () => {
      media.removeEventListener("change", updatePointerSupport)
      document.removeEventListener("pointermove", onMove)
      document.removeEventListener("mouseover", onOver)
      window.removeEventListener("doodletoolchange", syncDoodleTool)
      if (raf.current !== null) cancelAnimationFrame(raf.current)
    }
  }, [])

  const isPill = mode === "project" || mode === "gallery"
  const isLink = mode === "link"
  const isText = mode === "text"
  const isDoodle = mode === "doodle"
  const isDoodleEraser = isDoodle && doodleTool === "eraser"
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
          transform: "translate(-50%,-50%)", width: isDoodle ? "var(--doodle-cursor-size, 7px)" : isText ? "3px" : isLink ? "36px" : "10px", height: isDoodle ? "var(--doodle-cursor-size, 7px)" : isText ? "28px" : isLink ? "36px" : "10px",
          borderRadius: isText ? "2px" : "50%", background: isDoodleEraser ? "transparent" : isDoodle ? "var(--doodle-cursor-color, var(--accent))" : isLink ? "color-mix(in srgb, var(--accent) 16%, transparent)" : AC,
          opacity: isDoodle ? "var(--doodle-cursor-opacity, 0.85)" : 1,
          border: isLink && !isDoodle ? `1.5px solid ${AC}` : "none",
          transition: "width 0.22s ease, height 0.22s ease, border-radius 0.22s ease, background 0.22s ease, opacity 0.22s ease",
        }}>
          {isDoodleEraser && <Circle aria-hidden="true" className="h-full w-full" color={AC} strokeWidth={2} />}
        </div>
      )}
    </div>
  )
}
