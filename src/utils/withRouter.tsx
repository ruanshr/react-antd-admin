import React from "react";
import { useLocation, useNavigate, useParams } from 'react-router-dom'

export function withRouter(Component: any) {
  return function ComponentWithRouterProps(props: any) {
    const location = useLocation()
    const nvaigate = useNavigate()
    const params = useParams()
    return <Component {...props} router={{ location, nvaigate, params }} />
  }
}
