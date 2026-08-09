import GalleryPage from "../../components/GalleryPage"

export default function Nostalgia() {
  return (
    <GalleryPage
      eyebrow="p5.js Creative Coding"
      title="NOSTALGIA"
      tagline="A generative poster inspired by traditional Vietnamese cement tiles — recreating the intricate geometric patterns through algorithmic drawing in p5.js. Created for Creative Coding, taught by Jenny Kowalski."
      meta={[
        { label: "Tools", value: "p5.js" },
        { label: "Type", value: "Generative Art" },
        { label: "Course", value: "Creative Coding" },
        { label: "Instructor", value: "Jenny Kowalski" },
      ]}
      images={[
        { src: "/photos/final-print.png", alt: "Nostalgia generative poster" },
      ]}
      iframe={{ src: "https://editor.p5js.org/avl227/full/4FLBTJv8g", width: 700, height: 700 }}
    />
  )
}
