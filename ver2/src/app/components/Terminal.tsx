import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { TBG, AC, MONO } from "../constants"

export default function Terminal({ onDone }: { onDone: () => void }) {
  const lines = ["> hello! ✦", "> loading: angelina_le.tsx", "> compiling assets... done ✓", "> welcome ˚｡𖦹"]
  const [shown, setShown] = useState<number[]>([])

  useEffect(() => {
    let i = 0
    const next = (): ReturnType<typeof setTimeout> => {
      if (i < lines.length) {
        return setTimeout(() => { setShown(p => [...p, i]); i++; next() }, i === 0 ? 280 : 360)
      }
      return setTimeout(onDone, 580)
    }
    const t = next()
    return () => clearTimeout(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onDone])

  return (
    <motion.div className="fixed inset-0 z-[9999] flex items-end p-8 md:p-16" style={{ background: TBG }}
      exit={{ y: "-100%", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}>
      <div className="flex flex-col gap-2">
        {lines.map((line, i) => (
          <AnimatePresence key={i}>
            {shown.includes(i) && (
              <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.18 }}
                style={{ fontFamily: MONO, fontSize: "clamp(0.8rem,2vw,1rem)", textTransform: "none",
                  color: i === lines.length - 1 ? AC : "rgba(245,243,239,0.65)" }}>
                {line}
                {i === shown[shown.length - 1] && (
                  <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.65 }} style={{ color: AC }}>█</motion.span>
                )}
              </motion.p>
            )}
          </AnimatePresence>
        ))}
      </div>
    </motion.div>
  )
}
