import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export const RouterBeforeEach = (props: { route: any, children: any }) => {
  const title = props?.route?.meta?.title;
  if (title) {
    document.title = title;
  }
  const isLogin: boolean = !!sessionStorage.getItem("userInfo");
  if (!isLogin && props?.route?.meta?.isLogin) {
    // return <Navigate to={"/login"} replace />
  }
  const location = useLocation();
  const routeKey = location.pathname;
  if (isLogin && ["/login"].includes(routeKey)) {
    return <Navigate to={"/"} replace />
  }
  return (<div>{props.children}</div>)
}
