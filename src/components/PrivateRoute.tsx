import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthenticationProvider";
import { BaseRoute } from "@/constants/baseRoute";
// import { useEffect } from "react";

const PrivateRoute = (props: { children: any }) => {
  const auth = useAuth();
  const { isLogged } = auth;

  //! Render
  if (auth.isLogged) {
    return props.children;
  }

  if (isLogged) {
    return props.children;
  }

  return <Navigate to={BaseRoute.Login} replace />;
};

export default PrivateRoute;
