import Vegetable from "../components/pages/Vegetable"
import Tuber from "../components/pages/Tuber"
import Fruit from "../components/pages/Fruit"
import Home from "../components/pages/Home"
import DetailProduct from "./../containers/DetailProduct"

export const routes = [
  {
    path: "/",
    exact: true,
    Component: <Home />,
  },
  {
    path: "/vegetable",
    exact: true,
    Component: <Vegetable />,
  },
  {
    path: "/tuber",
    exact: true,
    Component: <Tuber />,
  },
  {
    path: "/fruit",
    exact: true,
    Component: <Fruit />,
  },
]
