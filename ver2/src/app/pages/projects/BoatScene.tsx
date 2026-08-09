import GalleryPage from "../../components/GalleryPage"

export default function BoatScene() {
  return (
    <GalleryPage
      eyebrow="p5.js Creative Coding"
      title="LAZY LAKE"
      tagline="An interactive boat scene — click and drag to navigate a calm lake environment. Created for Creative Coding, taught by Jenny Kowalski."
      meta={[
        { label: "Tools", value: "p5.js" },
        { label: "Type", value: "Interactive Sketch" },
        { label: "Course", value: "Creative Coding" },
        { label: "Instructor", value: "Jenny Kowalski" },
      ]}
      images={[]}
      iframe={{ src: "https://editor.p5js.org/avl227/full/bx7MsuAhL", width: 600, height: 600 }}
    />
  )
}
