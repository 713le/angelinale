import { useState, useEffect, useRef, useCallback } from "react"
import { GC } from "./constants"

export function useGlitch(orig: string) {
  const [txt, setTxt] = useState(orig)
  const t = useRef<ReturnType<typeof setInterval> | null>(null)
  const go = useCallback(() => {
    let i = 0
    if (t.current) clearInterval(t.current)
    t.current = setInterval(() => {
      setTxt(orig.split("").map((_, idx) => idx < i ? orig[idx] : GC[Math.floor(Math.random() * GC.length)]).join(""))
      i += 0.5
      if (i >= orig.length) { clearInterval(t.current!); setTxt(orig) }
    }, 30)
  }, [orig])
  useEffect(() => () => { if (t.current) clearInterval(t.current) }, [])
  return { txt, go }
}

export function useTypewriter(text: string, speed = 50, delay = 400) {
  const [out, setOut] = useState("")
  useEffect(() => {
    let i = 0
    const start = setTimeout(() => {
      const iv = setInterval(() => { i++; setOut(text.slice(0, i)); if (i >= text.length) clearInterval(iv) }, speed)
      return () => clearInterval(iv)
    }, delay)
    return () => clearTimeout(start)
  }, [text, speed, delay])
  return out
}

export function useInView(margin = "-60px") {
  const ref = useRef<HTMLElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { rootMargin: margin })
    obs.observe(el)
    return () => obs.disconnect()
  }, [margin])
  return { ref, vis }
}
