import { motion, AnimatePresence } from "motion/react"
import { useNavigate } from "react-router"
import { BG, FG, AC, MUTED, MONO } from "../constants"

export default function Menu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate()
  const go = (path: string, anchor?: string) => {
    onClose()
    if (anchor) {
      setTimeout(() => {
        navigate("/")
        setTimeout(() => document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" }), 50)
      }, 320)
    } else {
      setTimeout(() => navigate(path), 320)
    }
  }
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[998] flex flex-col p-6 pt-24 gap-5"
          style={{ background: `${BG}f5`, backdropFilter: "blur(16px)", cursor: "none", fontFamily: MONO }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.28 }}>
          {([["/ projects", "/", "work"], ["/ about", "/", "about"], ["/ experience", "/", "resume"]] as [string, string, string][]).map(([label, path, anchor], i) => (
            <motion.button key={label} onClick={() => go(path, anchor)}
              className="text-left bg-transparent border-none uppercase leading-none w-fit transition-colors"
              style={{ fontSize: "clamp(2.2rem,6vw,5rem)", color: FG, cursor: "none", fontFamily: MONO }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = AC }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = FG }}
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25, delay: i * 0.07 }}>
              {label}
            </motion.button>
          ))}
          <div className="mt-auto text-xs tracking-widest uppercase" style={{ color: MUTED }}>angelinale13@gmail.com</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
