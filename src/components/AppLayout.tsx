import { Outlet } from "react-router";

import { Header } from "./Header";

export function AppLayout() {
  return (
    <div className="w-screen min-h-screen bg-gray-400  flex flex-col items-center text-gray-100">
      <main className="p-3 w-full max-w-296.25 ">
        <Header />
        <Outlet />
      </main>
    </div>
  );
}
