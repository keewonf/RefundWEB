import okSvg from "../assets/ok.svg";
import { Link, Navigate, useLocation } from "react-router";

export function Confirm() {
  const location = useLocation();

  if (!location.state?.fromSubmit) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex  justify-center">
      <main className="flex  flex-col bg-gray-500 lg:max-w-lg rounded-xl p-10 gap-10">
        <div className="flex flex-col gap-6 items-center">
          <h1 className="text-green-100 font-bold text-2xl">
            Solicitação enviada!
          </h1>
          <img src={okSvg} alt="Ícone de OK" className="w-28" />
          <p className="text-gray-200  text-sm text-center">
            Agora é apenas aguardar! Sua solicitação será analisada e, em breve,
            o setor financeiro irá entrar em contato com você.
          </p>
        </div>

        <Link
          to="/"
          className="flex justify-center items-center bg-green-100 px-5 py-3.75 h-12 rounded-lg text-white text-sm font-bold cursor-pointer hover:bg-green-200 transition ease-linear disabled:opacity-50 disabled:cursor-progress"
        >
          Nova solicitação
        </Link>
      </main>
    </div>
  );
}
