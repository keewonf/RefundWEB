import logoSvg from "../assets/logo.svg";
import logoutSvg from "../assets/logout.svg";

import { useAuth } from "../hooks/useAuth";

export function Header() {
  const auth = useAuth();

  return (
    <header className="w-full flex justify-between">
      <img src={logoSvg} alt="logo" className="my-8" />
      <div className="flex items-center gap-3 ">
        <span className="font-semibold text-sm text-gray-200">
          Olá, Rodrigo
        </span>
        <img
          className="my-8 cursor-pointer hover:opacity-75 transition ease-linear"
          src={logoutSvg}
          alt="logout"
          onClick={() => auth.remove()}
        />
      </div>
    </header>
  );
}
