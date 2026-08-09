import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useInView } from "../hooks"
import { FG, AC, BDRC, MUTED, MONO, BG } from "../constants"
import ProjectHero from "./ProjectHero"
import Footer from "./Footer"

interface ImageItem { src: string; alt?: string }

interface GalleryPageProps {
  eyebrow: string
  title: string
  tagline: string
  images: ImageItem[]
  meta?: { label: string; value: string }[]
  iframe?: { src: string; width?: number; height?: number }
  imageAspectRatio?: string
}

function ImageGrid({ images, imageAspectRatio }: { images: ImageItem[]; imageAspectRatio?: string }) {
  const [lightbox, setLightbox] = useState<number | null>(null)
  const { ref, vis } = useInView("-40px")
  return (
    <>
      <motion.div ref={ref as React.RefObject<HTMLDivElement>}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        style={{ gridAutoRows: "1fr" }}
        initial={{ opacity: 0, y: 20 }} animate={vis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55 }}>
        {images.map((img, i) => (
          <div key={i} className="overflow-hidden h-full" style={{ background: "#ddd8d0", cursor: "none", aspectRatio: imageAspectRatio && imageAspectRatio !== "auto" ? imageAspectRatio : undefined }}
            data-noblue="1"
            onClick={() => setLightbox(i)}>
            <img src={img.src} alt={img.alt || ""} className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
              style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ))}
      </motion.div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div className="fixed inset-0 z-[9990] flex items-center justify-center p-6"
            style={{ background: "rgba(10,10,10,0.95)", cursor: "none" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}>
            <motion.img src={images[lightbox].src} alt={images[lightbox].alt || ""}
              className="max-w-full max-h-full object-contain"
              initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }}
              onClick={(e) => e.stopPropagation()} />
            <button className="absolute top-6 right-6 text-xl" style={{ fontFamily: MONO, color: "rgba(245,243,239,0.6)", background: "transparent", border: "none", cursor: "none" }}
              onClick={() => setLightbox(null)}>×</button>
            {lightbox > 0 && (
              <button className="absolute left-6 top-1/2 -translate-y-1/2 px-4 py-2 text-xs uppercase"
                style={{ fontFamily: MONO, color: "rgba(245,243,239,0.6)", background: "transparent", border: `1px solid rgba(245,243,239,0.15)`, cursor: "none" }}
                onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1) }}>← prev</button>
            )}
            {lightbox < images.length - 1 && (
              <button className="absolute right-6 top-1/2 -translate-y-1/2 px-4 py-2 text-xs uppercase"
                style={{ fontFamily: MONO, color: "rgba(245,243,239,0.6)", background: "transparent", border: `1px solid rgba(245,243,239,0.15)`, cursor: "none" }}
                onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1) }}>next →</button>
            )}
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[0.58rem] uppercase tracking-widest"
              style={{ fontFamily: MONO, color: "rgba(245,243,239,0.3)" }}>
              {lightbox + 1} / {images.length} — click outside to close
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default function GalleryPage({ eyebrow, title, tagline, images, meta, iframe, imageAspectRatio }: GalleryPageProps) {
  return (
    <div>
      <ProjectHero eyebrow={eyebrow} title={title} tagline={tagline} />

      {meta && (
        <div className="px-4 md:px-8 pb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-b py-6" style={{ borderColor: BDRC }}>
            {meta.map(({ label, value }) => (
              <div key={label}>
                <p className="text-[0.55rem] tracking-widest uppercase mb-1" style={{ fontFamily: MONO, color: AC }}>{label}</p>
                <p className="text-xs uppercase font-bold" style={{ fontFamily: MONO, color: FG }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="px-4 md:px-8 pb-24">
        {iframe ? (
          <div className="flex justify-center">
            <iframe src={iframe.src} style={{ width: `${iframe.width || 600}px`, height: `${iframe.height || 640}px`, border: "none", display: "block" }} title={title} />
          </div>
        ) : (
          <ImageGrid images={images} imageAspectRatio={imageAspectRatio} />
        )}
        <p className="text-[0.58rem] tracking-widest uppercase mt-5" style={{ fontFamily: MONO, color: MUTED }}>
          {iframe ? "Interactive sketch — use mouse to explore" : "Click any image to enlarge"}
        </p>
      </div>

      <Footer />
    </div>
  )
}
