import { Outlet } from "react-router-dom";
import Header from "../components/Header";

import { SessionContextProvider } from "../store/session";

export default function Root() {
  return (
    <SessionContextProvider>
      <Header />
      <Outlet />
    </SessionContextProvider>
  );
}
