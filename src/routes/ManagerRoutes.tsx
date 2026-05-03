import { Routes, Route } from "react-router";
import { NotFound } from "../pages/NotFound";
import { AppLayout } from "../components/AppLayout";
import { Dashboard } from "../pages/Dashboard";

export function ManagerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
