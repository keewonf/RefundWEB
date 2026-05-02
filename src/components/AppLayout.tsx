import { Outlet } from "react-router";

import { Header } from "./Header";

export function AppLayout() {
  return (
    <div className="w-screen min-h-screen bg-gray-400 text-gray-100">
      <header className="w-full">
        <div className="max-w-296.25 mx-auto px-3">
          <Header />
        </div>
      </header>

      <main className="max-w-296.25 mx-auto px-3">
        <Outlet />
      </main>
    </div>
  );
}
