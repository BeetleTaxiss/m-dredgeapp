import React, { useEffect, useState } from "react";
import App from "./App";
import { getUserStoreInstance } from "./hooks/function-utils";

export default function useAppRouter() {
  const UserStore = getUserStoreInstance();

  const [loginStatus, setLoginStatus] = useState(false);

  UserStore.useStateAsync("login").then((status) => {
    setLoginStatus(status);
  });

  return <App loginStatus={loginStatus} />;
}
