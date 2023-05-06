import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { RouterBeforeEach } from "./routerBeforeEach";

import routes from "./routes";

const renderRoutes = (routes: any) => {
  return routes.map((item: any) => {
    const { meta, path, children, redirect, component: Component } = item;
    const route: any = { meta, path }
    if (Component) {
      // route.element = <Component />
      route.element = <RouterBeforeEach route={item} ><Component /></RouterBeforeEach>;
    } 
    if (children) {
      route.children = renderRoutes(children)
    }
    if (redirect) {
      route.element = <Navigate to={redirect} />
    }
    return route;
  })
}

export function Router() {
  const _routes = renderRoutes(routes);
  return useRoutes(_routes);
}