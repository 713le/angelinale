import { createHashRouter } from "react-router"
import Root from "./Root"
import Home from "./pages/Home"
import Toolkit from "./pages/projects/Toolkit"
import Vynl from "./pages/projects/Vynl"
import Menulens from "./pages/projects/Menulens"
import Interplay from "./pages/projects/Interplay"
import LifeOfPi from "./pages/projects/LifeOfPi"
import Parasite from "./pages/projects/Parasite"
import Nostalgia from "./pages/projects/Nostalgia"
import BoatScene from "./pages/projects/BoatScene"
import Cats from "./pages/projects/Cats"
import RecordPlayer from "./pages/projects/RecordPlayer"

export const router = createHashRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "projects/toolkit", Component: Toolkit },
      { path: "projects/menulens", Component: Menulens },
      { path: "projects/vynl", Component: Vynl },
      { path: "projects/interplay", Component: Interplay },
      { path: "projects/life-of-pi", Component: LifeOfPi },
      { path: "projects/parasite", Component: Parasite },
      { path: "projects/nostalgia", Component: Nostalgia },
      { path: "projects/lazy-lake", Component: BoatScene },
      { path: "projects/cats", Component: Cats },
      { path: "projects/record-player", Component: RecordPlayer },
    ],
  },
])
