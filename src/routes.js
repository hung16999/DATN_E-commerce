import Contact from "./components/Contact"
import Home from "./components/Home"
import Info from "./components/Info"
import Project from "./components/Projects"

export const routes = [
  {
    path: "/",
    name: "HOME",
    exact: true,
    Component: <Home routeName="Home" />,
  },
  {
    path: "/contact",
    name: "CONTACT",
    exact: true,
    Component: <Contact routeName="Contact" />,
  },
  {
    path: "/projects",
    name: "PROJECTS",
    exact: true,
    Component: <Project routeName="Projects" />,
  },
  {
    path: "/info",
    name: "INFO",
    exact: true,
    Component: <Info routeName="Info" />,
  },
]
