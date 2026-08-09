import { useState, useEffect } from "react"
import { Outlet, useLocation } from "react-router"
import { AnimatePresence, motion } from "motion/react"
import ScrollBar from "./components/ScrollBar"
import Cursor from "./components/Cursor"
import Nav from "./components/Nav"
import Menu from "./components/Menu"
import Terminal from "./components/Terminal"
import { BG, FG, MONO } from "./constants"

export default function Root() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [loading, setLoading] = useState(() => !sessionStorage.getItem("visited"))
  const location = useLocation()

  useEffect(() => { document.body.style.overflow = menuOpen ? "hidden" : ""; return () => { document.body.style.overflow = "" } }, [menuOpen])
  useEffect(() => { setMenuOpen(false) }, [location.pathname])
  useEffect(() => { window.scrollTo(0, 0) }, [location.pathname])

  const handleDone = () => { sessionStorage.setItem("visited", "1"); setLoading(false) }

  return (
    <>
      <style>{`@media (pointer: fine) { * { cursor: none !important; } } ::-webkit-scrollbar { display: none; } * { scrollbar-width: none; }`}</style>
      <div style={{ background: BG, color: FG, fontFamily: MONO, overflowX: "hidden", minHeight: "100vh" }}>
        <ScrollBar />
        <Cursor />
        <AnimatePresence>
          {loading && <Terminal key="t" onDone={handleDone} />}
        </AnimatePresence>
        <Nav open={menuOpen} onToggle={() => setMenuOpen(v => !v)} />
        <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />
        {!loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
            <Outlet />
          </motion.div>
        )}
      </div>
    </>
  )
}
