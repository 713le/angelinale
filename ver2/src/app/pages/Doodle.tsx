import { useEffect, useRef, useState } from "react"
import { ArrowLeft, Download, Eraser, Pencil, RotateCcw, Trash2 } from "lucide-react"
import { Link } from "react-router"
import { AC, BG, FG, MONO } from "../constants"

type Tool = "pen" | "eraser"
type Point = { x: number; y: number }
type Stroke = { points: Point[]; color: string; size: number; opacity: number; tool: Tool }

const COLORS = [
  { name: "Pink", value: "var(--accent)" },
  { name: "Orange", value: "#f2ab70" },
    { name: "Yellow", value: "#f2e770" },
  { name: "Green", value: "#71c48a" },
    { name: "Blue", value: "#66b2d1" },
    { name: "Purple", value: "#d0abf6" },

]

function resolveColor(value: string) {
  const token = value.match(/^var\((--[^)]+)\)$/)?.[1]
  return token ? getComputedStyle(document.documentElement).getPropertyValue(token).trim() : value
}

function renderStrokes(canvas: HTMLCanvasElement, strokes: Stroke[], ratio: number) {
  const context = canvas.getContext("2d")
  if (!context) return

  const width = canvas.width / ratio
  const height = canvas.height / ratio
  context.setTransform(ratio, 0, 0, ratio, 0, 0)
  context.clearRect(0, 0, width, height)
  context.lineCap = "round"
  context.lineJoin = "round"

  for (const stroke of strokes) {
    const first = stroke.points[0]
    if (!first) continue

    context.globalCompositeOperation = stroke.tool === "eraser" ? "destination-out" : "source-over"
    context.globalAlpha = stroke.tool === "eraser" ? 1 : stroke.opacity
    context.strokeStyle = stroke.color
    context.fillStyle = stroke.color
    context.lineWidth = stroke.size
    context.beginPath()

    if (stroke.points.length === 1) {
      context.arc(first.x, first.y, stroke.size / 2, 0, Math.PI * 2)
      context.fill()
      continue
    }

    context.moveTo(first.x, first.y)
    for (let index = 1; index < stroke.points.length; index++) {
      const point = stroke.points[index]
      context.lineTo(point.x, point.y)
    }
    context.stroke()
  }

  context.globalAlpha = 1
  context.globalCompositeOperation = "source-over"
}

export default function Doodle() {
  const boardRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const strokesRef = useRef<Stroke[]>([])
  const activePointerRef = useRef<number | null>(null)
  const pixelRatioRef = useRef(1)
  const [tool, setTool] = useState<Tool>("pen")
  const [color, setColor] = useState(COLORS[0].value)
  const [size, setSize] = useState(7)
  const [opacity, setOpacity] = useState(0.85)
  const [strokeCount, setStrokeCount] = useState(0)

  useEffect(() => {
    const root = document.documentElement
    root.dataset.doodle = "true"
    root.dataset.doodleTool = tool
    root.style.setProperty("--doodle-cursor-color", resolveColor(color))
    root.style.setProperty("--doodle-cursor-size", `${size}px`)
    root.style.setProperty("--doodle-cursor-opacity", String(opacity))
    window.dispatchEvent(new Event("doodletoolchange"))
    return () => {
      delete root.dataset.doodle
      delete root.dataset.doodleTool
      root.style.removeProperty("--doodle-cursor-color")
      root.style.removeProperty("--doodle-cursor-size")
      root.style.removeProperty("--doodle-cursor-opacity")
      window.dispatchEvent(new Event("doodletoolchange"))
    }
  }, [color, opacity, size, tool])

  useEffect(() => {
    const board = boardRef.current
    const canvas = canvasRef.current
    if (!board || !canvas) return

    const resizeObserver = new ResizeObserver(([entry]) => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      pixelRatioRef.current = ratio
      canvas.width = Math.round(entry.contentRect.width * ratio)
      canvas.height = Math.round(entry.contentRect.height * ratio)
      renderStrokes(canvas, strokesRef.current, ratio)
    })

    resizeObserver.observe(board)
    return () => resizeObserver.disconnect()
  }, [])

  const getPoint = (event: React.PointerEvent<HTMLCanvasElement>): Point => {
    const bounds = event.currentTarget.getBoundingClientRect()
    return { x: event.clientX - bounds.left, y: event.clientY - bounds.top }
  }

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return
    event.preventDefault()
    activePointerRef.current = event.pointerId
    try {
      event.currentTarget.setPointerCapture(event.pointerId)
    } catch {
      activePointerRef.current = event.pointerId
    }
    strokesRef.current.push({
      points: [getPoint(event)],
      color: resolveColor(color),
      size,
      opacity,
      tool,
    })
    setStrokeCount(strokesRef.current.length)
    if (canvasRef.current) renderStrokes(canvasRef.current, strokesRef.current, pixelRatioRef.current)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (activePointerRef.current !== event.pointerId) return
    event.preventDefault()
    const stroke = strokesRef.current[strokesRef.current.length - 1]
    if (!stroke) return
    stroke.points.push(getPoint(event))
    if (canvasRef.current) renderStrokes(canvasRef.current, strokesRef.current, pixelRatioRef.current)
  }

  const stopDrawing = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (activePointerRef.current === event.pointerId) activePointerRef.current = null
  }

  const undo = () => {
    strokesRef.current.pop()
    setStrokeCount(strokesRef.current.length)
    if (canvasRef.current) renderStrokes(canvasRef.current, strokesRef.current, pixelRatioRef.current)
  }

  const clear = () => {
    strokesRef.current = []
    setStrokeCount(0)
    if (canvasRef.current) renderStrokes(canvasRef.current, strokesRef.current, pixelRatioRef.current)
  }

  const download = () => {
    const board = boardRef.current
    const canvas = canvasRef.current
    if (!board || !canvas) return

    const ratio = pixelRatioRef.current
    const exportCanvas = document.createElement("canvas")
    exportCanvas.width = canvas.width
    exportCanvas.height = canvas.height
    const context = exportCanvas.getContext("2d")
    if (!context) return

    context.fillStyle = getComputedStyle(board).backgroundColor
    context.fillRect(0, 0, exportCanvas.width, exportCanvas.height)
    context.strokeStyle = "rgba(255,253,248,0.16)"
    context.lineWidth = ratio
    const grid = 24 * ratio
    context.beginPath()
    for (let x = 0; x <= exportCanvas.width; x += grid) {
      context.moveTo(x, 0)
      context.lineTo(x, exportCanvas.height)
    }
    for (let y = 0; y <= exportCanvas.height; y += grid) {
      context.moveTo(0, y)
      context.lineTo(exportCanvas.width, y)
    }
    context.stroke()
    context.drawImage(canvas, 0, 0)

    const link = document.createElement("a")
    link.download = "angelina-doodle.png"
    link.href = exportCanvas.toDataURL("image/png")
    link.click()
  }

  const toolButtonClass = "inline-flex min-h-10 items-center gap-2 px-3 text-sm font-semibold transition-colors"

  return (
    <main className="min-h-screen bg-background px-5 pb-8 pt-24 text-foreground sm:px-8 md:px-12">
      <div className="mx-auto max-w-[1440px]">
        <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Link to="/" className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground/70 transition-colors hover:text-accent">
              <ArrowLeft aria-hidden="true" size={15} /> Portfolio
            </Link>
            <h1 className="text-4xl font-extrabold uppercase leading-none sm:text-5xl" style={{ fontFamily: MONO }}>Doodle :)</h1>
          </div>
        </header>

        <section aria-label="Drawing tools" className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-4">
          <div className="flex items-center gap-1 rounded-sm bg-secondary p-1" role="group" aria-label="Drawing tool">
            <button type="button" aria-pressed={tool === "pen"} onClick={() => setTool("pen")}
              className={`${toolButtonClass} ${tool === "pen" ? "bg-foreground text-background" : "bg-transparent text-foreground"}`}>
              <Pencil aria-hidden="true" size={16} /> Pen
            </button>
            <button type="button" aria-pressed={tool === "eraser"} onClick={() => setTool("eraser")}
              className={`${toolButtonClass} ${tool === "eraser" ? "bg-foreground text-background" : "bg-transparent text-foreground"}`}>
              <Eraser aria-hidden="true" size={16} /> Erase
            </button>
          </div>

          <div className="flex items-center gap-2" role="group" aria-label="Ink color">
            {COLORS.map((swatch) => (
              <button key={swatch.name} type="button" aria-label={`${swatch.name} ink`} aria-pressed={color === swatch.value}
                title={`${swatch.name} ink`} onClick={() => setColor(swatch.value)}
                className={`size-8 transition-transform ${color === swatch.value ? "scale-110" : "hover:scale-105"}`}
                style={{ background: swatch.value, cursor: "pointer" }} />
            ))}
          </div>

          <label className="flex min-w-36 flex-1 items-center gap-3 text-xs font-semibold uppercase tracking-wide sm:max-w-48">
            Size <span className="text-foreground/60">{size}px</span>
            <input type="range" min="2" max="32" value={size} aria-label="Pen size"
              onChange={(event) => setSize(Number(event.target.value))} className="min-w-16 flex-1 accent-accent" />
          </label>
          <label className="flex min-w-36 flex-1 items-center gap-3 text-xs font-semibold uppercase tracking-wide sm:max-w-48">
            Opacity <span className="text-foreground/60">{Math.round(opacity * 100)}%</span>
            <input type="range" min="0.1" max="1" step="0.05" value={opacity} aria-label="Pen opacity"
              onChange={(event) => setOpacity(Number(event.target.value))} className="min-w-16 flex-1 accent-accent" />
          </label>

          <div className="ml-auto flex items-center gap-1">
            <button type="button" aria-label="Undo last stroke" title="Undo" disabled={!strokeCount} onClick={undo}
              className="inline-flex size-10 items-center justify-center text-foreground transition-colors hover:bg-secondary disabled:opacity-35">
              <RotateCcw aria-hidden="true" size={17} />
            </button>
            <button type="button" onClick={clear} disabled={!strokeCount}
              className="inline-flex min-h-10 items-center gap-2 px-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary disabled:opacity-35">
              <Trash2 aria-hidden="true" size={16} /> Clear
            </button>
            <button type="button" onClick={download}
              className="inline-flex min-h-10 items-center gap-2 bg-accent px-4 text-sm font-bold text-accent-foreground transition-transform hover:-translate-y-0.5">
              <Download aria-hidden="true" size={16} /> Download PNG
            </button>
          </div>
        </section>

        <div ref={boardRef} className="relative h-[62svh] min-h-[360px] max-h-[760px] w-full touch-none overflow-hidden bg-foreground"
          style={{
            backgroundColor: FG,
            backgroundImage: "linear-gradient(color-mix(in srgb, var(--background) 18%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--background) 18%, transparent) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}>
          <canvas ref={canvasRef} aria-label="Drawing canvas" className="absolute inset-0 h-full w-full touch-none"
            onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={stopDrawing} onPointerCancel={stopDrawing} />
        </div>
      </div>
    </main>
  )
}