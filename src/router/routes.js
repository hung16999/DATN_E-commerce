import Fruit from "../components/pages/Fruit"
import Home from "../components/pages/Home"
import Payment from "../components/pages/Payment"
import Tuber from "../components/pages/Tuber"
import Vegetable from "../components/pages/Vegetable"

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
  {
    path: "/payment",
    exact: true,
    Component: <Payment />,
  },
]
