import GalleryPage from "../../components/GalleryPage"

export default function Parasite() {
  return (
    <GalleryPage
      eyebrow="Symbol Designs"
      title="PARASITE"
      tagline="Symbol designs inspired by Bong Joon-ho's film Parasite, each one foreshadowing a key element of the story through abstract visual language. Created for Graphic Design Introductory Studio, taught by Maurizio Masi."
      meta={[
        { label: "Tools", value: "Illustrator" },
        { label: "Type", value: "Symbol / Icon Design" },
        { label: "Course", value: "Graphic Design Intro" },
        { label: "Instructor", value: "Maurizio Masi" },
      ]}
      imageAspectRatio="auto"
      images={[
        { src: "/photos/parasite.png", alt: "Parasite symbol designs" },
      ]}
    />
  )
}
