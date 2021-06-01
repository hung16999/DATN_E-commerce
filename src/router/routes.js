import Fruit from "../components/pages/Fruit"
import Home from "../components/pages/Home"
import Payment from "../components/pages/Payment"
import Rice from "../components/pages/Rice"
import ShoppingCart from "../components/pages/ShoppingCart"
import Vegetable from "../components/pages/Vegetable"
import Login from "../components/pages/Login"

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
    path: "/rice",
    exact: true,
    Component: <Rice />,
  },
  {
    path: "/fruit",
    exact: true,
    Component: <Fruit />,
  },
  {
    path: "/shoppingcart",
    exact: true,
    Component: <ShoppingCart />,
  },
  {
    path: "/payment",
    exact: true,
    Component: <Payment />,
  },
  {
    path: "/login",
    exact: true,
    Component: <Login />,
  },
]
