import GalleryPage from "../../components/GalleryPage"

export default function Cats() {
  return (
    <GalleryPage
      eyebrow="p5.js Creative Coding"
      title="CATS"
      tagline="Randomly generated cats — each refresh produces a new procedurally drawn feline face using p5.js. A playful exploration of generative character design."
      meta={[
        { label: "Tools", value: "p5.js" },
        { label: "Type", value: "Generative Art" },
        { label: "Course", value: "Creative Coding" },
        { label: "Notes", value: "Refresh for a new cat!" },
      ]}
      images={[]}
      iframe={{ src: "https://editor.p5js.org/avl227/full/PxwOmucl1", width: 600, height: 640 }}
    />
  )
}
