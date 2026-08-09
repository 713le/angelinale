import GalleryPage from "../../components/GalleryPage"

export default function LifeOfPi() {
  return (
    <GalleryPage
      eyebrow="Book Cover & Spine Redesign"
      title="LIFE OF PI"
      tagline="A modern book cover redesign depicting a stylized ocean rendered as tiger-stripe patterns. Created for Graphic Design Introductory Studio, taught by Maurizio Masi."
      meta={[
        { label: "Tools", value: "Illustrator · InDesign" },
        { label: "Type", value: "Book Cover Design" },
        { label: "Course", value: "Graphic Design Intro" },
        { label: "Instructor", value: "Maurizio Masi" },
      ]}
      imageAspectRatio="auto"
      images={[
        { src: "/photos/lifeofpicovermockup.png", alt: "Life of Pi cover mockup" },
        { src: "/photos/lifeofpicoverandspine.png", alt: "Life of Pi cover and spine" },
      ]}
    />
  )
}
