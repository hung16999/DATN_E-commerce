import Vegetable from "./components/pages/Vegetable"
import Tuber from "./components/pages/Tuber"
import Fruit from "./components/pages/Fruit"
import Home from "./components/pages/Home"

export const routes = [
  {
    path: "/",
    exact: true,
    Component: <Home routeName="Home" />,
  },
  {
    path: "/vegetable",
    exact: true,
    Component: <Vegetable routeName="vegetable" />,
  },
  {
    path: "/tuber",
    exact: true,
    Component: <Tuber routeName="tuber" />,
  },
  {
    path: "/fruit",
    exact: true,
    Component: <Fruit routeName="fruit" />,
  },
]
