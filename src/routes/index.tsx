import { BrowserRouter } from "react-router";

import { Loading } from "../components/Loading";

import { AuthRoutes } from "./AuthRoutes";
import { EmployeeRoutes } from "./EmployeeRoutes";
import { ManagerRoutes } from "./ManagerRoutes";
import { useAuth } from "../hooks/useAuth";

const isLoading = false;
const session = {
  user: {
    role: "",
  },
};

export function Routes() {
  const { name } = useAuth();

  function Route() {
    switch (session?.user.role) {
      case "manager":
        return <ManagerRoutes />;
      case "employee":
        return <EmployeeRoutes />;
      default:
        return <AuthRoutes />;
    }
  }

  if (isLoading) {
    return <Loading />;
  }
  return (
    <BrowserRouter>
      <Route />
    </BrowserRouter>
  );
}
