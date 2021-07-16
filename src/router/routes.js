import Fruit from "../components/pages/customer/Fruit"
import Home from "../components/pages/customer/Home"
import Payment from "../components/pages/customer/Payment"
import Rice from "../components/pages/customer/Rice"
import ShoppingCart from "../components/pages/customer/ShoppingCart"
import Vegetable from "../components/pages/customer/Vegetable"
import Login from "../components/common/Login"
import Register from "../components/common/Register"
import Salesman from "../components/pages/salesman/Salesman"
import Shipper from "../components/pages/shipper/Shipper"
import Admin from "../components/pages/admin/Admin"
import HistoryOrders from "../components/pages/customer/HistoryOrders"
import Info from "../components/pages/customer/Info"

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
  {
    path: "/register",
    exact: true,
    Component: <Register />,
  },
  {
    path: "/admin",
    exact: true,
    Component: <Admin />,
  },
  {
    path: "/salesman",
    exact: true,
    Component: <Salesman />,
  },
  {
    path: "/shipper",
    exact: true,
    Component: <Shipper />,
  },
  {
    path: "/history",
    exact: true,
    Component: <HistoryOrders />,
  },
  {
    path: "/info",
    exact: true,
    Component: <Info />,
  },
]
