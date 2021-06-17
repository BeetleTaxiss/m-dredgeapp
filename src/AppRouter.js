import React, { useState } from "react";
import App from "./App";
import { getUserStoreInstance } from "./hooks/function-utils";

const AppRouter=()=> {
  
  //const UserStore = getUserStoreInstance();

  //const [loginStatus, setLoginStatus] = useState(false);

  // UserStore.useStateAsync("login").then((status) => {
  //   setLoginStatus(status);
  // });

  const loginStatus= localStorage.getItem("login");

  return <App loginStatus={loginStatus} />;
}
export default AppRouter;
