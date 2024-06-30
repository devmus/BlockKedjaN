import { createBrowserRouter } from "react-router-dom";
import { Explorer } from "./Pages/Explorer";
import { Home } from "./Pages/Home";
import { Layout } from "./Pages/Layout";
import { Mine } from "./Pages/Mine";
import { NotFound } from "./Pages/NotFound";
import { Transact } from "./Pages/Transact";

export const router = createBrowserRouter([
  {
    path: "/flowchain/",
    element: <Layout />,
    errorElement: <NotFound />,
    children:[
      {
        index: true,
        element: <Home />
      },
      {
        path: "/flowchain/home",
        element: <Home />
      },
      {
        path: "/flowchain/transact",
        element: <Transact />
      },
      {
        path: "/flowchain/mine",
        element: <Mine />
      },
      {
        path: "/flowchain/explorer",
        element: <Explorer />
      }]
    },
  ]);