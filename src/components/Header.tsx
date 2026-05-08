import logoSvg from "../assets/logo.svg";
import logoutSvg from "../assets/logout.svg";
import { Link } from "react-router";

import { useAuth } from "../hooks/useAuth";

export function Header() {
  const auth = useAuth();
  const userName = auth.session?.user.name ?? "Usuário";

  return (
    <header className="w-full flex items-center justify-between py-8">
      <Link
        to="/"
        aria-label="Ir para a pagina inicial"
        className="inline-flex rounded-md transition hover:opacity-90 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-200"
      >
        <img src={logoSvg} alt="logo" className="block" />
      </Link>
      <div className="flex items-center gap-3 ">
        <span className="font-semibold text-sm text-gray-200">
          Olá, {userName}
        </span>
        <img
          className="cursor-pointer hover:opacity-75 transition ease-linear"
          src={logoutSvg}
          alt="logout"
          onClick={() => auth.remove()}
        />
      </div>
    </header>
  );
}
