import GalleryPage from "../../components/GalleryPage"

export default function RecordPlayer() {
  return (
    <GalleryPage
      eyebrow="Blender & Unity Project"
      title="3D INTERACTIVE RECORD PLAYER"
      tagline="A fully interactive record player — modeled in Blender, scripted in C# within Unity — featuring adjustable knobs and a moveable tonearm, set inside a mid-century modern living room environment."
      meta={[
        { label: "Tools", value: "Blender · Unity · C#" },
        { label: "Type", value: "3D / Interactive" },
        { label: "Course", value: "Immersive Design" },
        { label: "Instructor", value: "Joseph Amodei" },
      ]}
      images={[
        { src: "/photos/record player interaction 2.gif", alt: "Record player interaction demo 1" },
        { src: "/photos/record player interaction.gif", alt: "Record player interaction demo 2" },
        { src: "/photos/recordplayerred2.png", alt: "Record player render 1" },
        { src: "/photos/recordplayerred.png", alt: "Record player render 2" },
        { src: "/photos/record player.png", alt: "Record player full view" },
        { src: "/photos/livingroom.gif", alt: "Living room environment" },
      ]}
    />
  )
}
