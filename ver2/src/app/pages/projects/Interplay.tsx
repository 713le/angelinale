import { useEffect, useRef } from "react"
import ProjectHero from "../../components/ProjectHero"
import Footer from "../../components/Footer"
import { FG, AC, MUTED, MONO, BDRC } from "../../constants"

const IMG = {
  cover:   '/photos/DES053 - Chapbook (final no bleed).png',
  back:    '/photos/DES053 - Chapbook (final no bleed)5.png',
  spreads: [
    '/photos/DES053 - Chapbook (final no bleed)2.png',
    '/photos/DES053 - Chapbook (final no bleed)3.png',
    '/photos/DES053 - Chapbook (final no bleed)4.png',
  ]
}

function BookViewer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stateRef = useRef({ view: 0, busy: false })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const S = IMG.spreads.length
    const PAGE_H = Math.min(window.innerHeight * 0.65, 480)
    const PAGE_W = PAGE_H

    const leftPanel = container.querySelector<HTMLDivElement>('#left-panel')!
    const rightPanel = container.querySelector<HTMLDivElement>('#right-panel')!
    const book = container.querySelector<HTMLDivElement>('#book')!
    const label = container.querySelector<HTMLDivElement>('#book-label')!
    const btnPrev = container.querySelector<HTMLButtonElement>('#btn-prev')!
    const btnNext = container.querySelector<HTMLButtonElement>('#btn-next')!

    book.style.height = PAGE_H + 'px'
    leftPanel.style.width = PAGE_W + 'px'
    leftPanel.style.height = PAGE_H + 'px'
    rightPanel.style.width = PAGE_W + 'px'
    rightPanel.style.height = PAGE_H + 'px'

    const coverBg = () => ({ src: `url('${IMG.cover}')`, pos: 'center center', size: 'cover' })
    const backBg  = () => ({ src: `url('${IMG.back}')`, pos: 'center center', size: 'cover' })
    const spreadBg = (idx: number, side: 'left' | 'right') => ({
      src: `url('${IMG.spreads[idx]}')`, pos: side === 'left' ? 'left center' : 'right center',
      size: `${PAGE_W * 2}px ${PAGE_H}px`
    })

    type Bg = { src: string; pos: string; size: string } | null
    const applyBg = (el: HTMLElement, bg: Bg) => {
      if (!bg) { el.style.backgroundImage = 'none'; return }
      el.style.backgroundImage = bg.src
      el.style.backgroundPosition = bg.pos
      el.style.backgroundSize = bg.size
    }

    const getBgs = (v: number): { left: Bg; right: Bg } => {
      if (v === 0) return { left: null, right: coverBg() }
      if (v === S + 1) return { left: backBg(), right: null }
      return { left: spreadBg(v - 1, 'left'), right: spreadBg(v - 1, 'right') }
    }

    function easeInOutQuint(t: number) {
      return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2
    }

    function animateFlip(el: HTMLElement, fromDeg: number, toDeg: number, durationMs: number, onProgress: (p: number) => void, onDone: () => void) {
      const start = performance.now()
      const frame = (now: number) => {
        const raw = Math.min((now - start) / durationMs, 1)
        const ease = easeInOutQuint(raw)
        const deg = fromDeg + (toDeg - fromDeg) * ease
        const bendT = Math.sin(ease * Math.PI)
        const scaleX = 1 - bendT * 0.08
        el.style.transform = `rotateY(${deg}deg) scaleX(${scaleX})`
        onProgress(ease)
        if (raw < 1) requestAnimationFrame(frame)
        else { el.style.transform = `rotateY(${toDeg}deg) scaleX(1)`; onDone() }
      }
      requestAnimationFrame(frame)
    }

    const updateUI = (v?: number) => {
      const cur = v ?? stateRef.current.view
      const total = S + 2
      label.textContent = `${cur + 1} / ${total}`
      btnPrev.classList.toggle('opacity-0', cur <= 0)
      btnPrev.classList.toggle('pointer-events-none', cur <= 0)
      btnNext.classList.toggle('opacity-0', cur >= S + 1)
      btnNext.classList.toggle('pointer-events-none', cur >= S + 1)
    }

    const render = () => {
      const bgs = getBgs(stateRef.current.view)
      leftPanel.innerHTML = ''
      rightPanel.innerHTML = ''
      const lStatic = document.createElement('div')
      lStatic.style.cssText = 'position:absolute;inset:0;background-repeat:no-repeat;'
      applyBg(lStatic, bgs.left)
      leftPanel.appendChild(lStatic)
      const rStatic = document.createElement('div')
      rStatic.style.cssText = 'position:absolute;inset:0;background-repeat:no-repeat;'
      applyBg(rStatic, bgs.right)
      rightPanel.appendChild(rStatic)
      updateUI()
    }

    const flip = (direction: 'forward' | 'backward') => {
      const { view, busy } = stateRef.current
      if (busy) return
      if (direction === 'forward' && view >= S + 1) return
      if (direction === 'backward' && view <= 0) return
      stateRef.current.busy = true

      const nextView = direction === 'forward' ? view + 1 : view - 1
      const nextBgs = getBgs(nextView)
      const curBgs = getBgs(view)

      if (direction === 'forward') {
        const card = document.createElement('div')
        card.style.cssText = 'position:absolute;inset:0;transform-style:preserve-3d;z-index:20;will-change:transform;transform-origin:0% 50%;'
        const front = document.createElement('div')
        front.style.cssText = 'position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;background-repeat:no-repeat;'
        applyBg(front, curBgs.right)
        const back = document.createElement('div')
        back.style.cssText = 'position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;transform:rotateY(180deg);background-repeat:no-repeat;'
        applyBg(back, nextBgs.left)
        card.appendChild(front); card.appendChild(back)
        rightPanel.appendChild(card)
        animateFlip(card, 0, -180, 700, (ease) => {
          if (ease >= 0.5) {
            const lS = leftPanel.querySelector<HTMLElement>('div'); if (lS) applyBg(lS, nextBgs.left)
            const rS = rightPanel.querySelector<HTMLElement>('div'); if (rS) applyBg(rS, nextBgs.right)
          }
        }, () => {
          stateRef.current.view = nextView
          rightPanel.querySelector('.flip-card')?.remove()
          stateRef.current.busy = false
          render()
        })
      } else {
        const card = document.createElement('div')
        card.style.cssText = 'position:absolute;inset:0;transform-style:preserve-3d;z-index:20;will-change:transform;transform-origin:100% 50%;'
        const front = document.createElement('div')
        front.style.cssText = 'position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;background-repeat:no-repeat;'
        applyBg(front, curBgs.left)
        const back = document.createElement('div')
        back.style.cssText = 'position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;transform:rotateY(180deg);background-repeat:no-repeat;'
        applyBg(back, nextBgs.right)
        card.appendChild(front); card.appendChild(back)
        leftPanel.appendChild(card)
        animateFlip(card, 0, 180, 700, (ease) => {
          if (ease >= 0.5) {
            const rS = rightPanel.querySelector<HTMLElement>('div'); if (rS) applyBg(rS, nextBgs.right)
            const lS = leftPanel.querySelector<HTMLElement>('div'); if (lS) applyBg(lS, nextBgs.left)
          }
        }, () => {
          stateRef.current.view = nextView
          leftPanel.querySelector('.flip-card')?.remove()
          stateRef.current.busy = false
          render()
        })
      }
      updateUI(nextView)
    }

    btnNext.addEventListener('click', () => flip('forward'))
    btnPrev.addEventListener('click', () => flip('backward'))
    rightPanel.addEventListener('click', () => { if (!stateRef.current.busy) flip('forward') })
    leftPanel.addEventListener('click', () => { if (!stateRef.current.busy) flip('backward') })

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') flip('forward')
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') flip('backward')
    }
    document.addEventListener('keydown', onKey)

    render()
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="flex flex-col items-center py-16 px-6">
      <p className="text-[0.6rem] tracking-widest uppercase mb-8" style={{ fontFamily: MONO, color: MUTED }}>Click or use arrow keys to flip pages</p>
      <div ref={containerRef} className="relative flex flex-col items-center" style={{ perspective: "2000px" }}>
        <div id="book" className="relative flex items-stretch" style={{ transformStyle: "preserve-3d", transform: "rotateX(4deg)" }}>
          <div id="left-panel" className="relative overflow-hidden" style={{ flexShrink: 0 }} />
          <div id="right-panel" className="relative overflow-hidden" style={{ flexShrink: 0 }} />
          <button id="btn-prev" className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center z-50 transition-opacity"
            style={{ right: "calc(100% + 12px)", width: "36px", height: "36px", background: "#f5f3ef", border: `1px solid ${BDRC}`, color: FG, fontSize: "18px", fontFamily: MONO, cursor: "none" }}>‹</button>
          <button id="btn-next" className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center z-50 transition-opacity"
            style={{ left: "calc(100% + 12px)", width: "36px", height: "36px", background: "#f5f3ef", border: `1px solid ${BDRC}`, color: FG, fontSize: "18px", fontFamily: MONO, cursor: "none" }}>›</button>
        </div>
        <div id="book-label" className="mt-6 text-[0.6rem] tracking-[0.15em] uppercase" style={{ fontFamily: MONO, color: MUTED }} />
      </div>
    </div>
  )
}

export default function Interplay() {
  return (
    <div>
      <ProjectHero
        eyebrow="Graphic Design Project"
        title="INTERPLAY"
        tagline="Chapbook design using Adobe InDesign & Adobe Illustrator. Created for Graphic Design Introductory Studio, taught by Maurizio Masi. Flip through the book below."
      />
      <BookViewer />
      <div className="px-4 md:px-8 py-8 border-t" style={{ borderColor: BDRC }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[["Tools", "InDesign · Illustrator"], ["Type", "Graphic Chapbook"], ["Course", "Graphic Design Intro"], ["Instructor", "Maurizio Masi"]].map(([l, v]) => (
            <div key={l}>
              <p className="text-[0.55rem] tracking-widest uppercase mb-1" style={{ fontFamily: MONO, color: AC }}>{l}</p>
              <p className="text-xs uppercase font-bold" style={{ fontFamily: MONO, color: FG }}>{v}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
