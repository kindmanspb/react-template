import { RouteObject, useRoutes } from "react-router-dom";
import { lazily } from "@shared/utils";
import { BaseLayout } from "./ui";

const { Main } = lazily(() => import("@pages/main"));

const routeConfig: RouteObject[] = [
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        path: "pidor",
        element: <Main />,
      },
    ],
  },
];

export const Routes = () => useRoutes(routeConfig);
