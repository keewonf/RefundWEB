import { useForm, Controller } from "react-hook-form";
import { Input } from "../components/Input";
import searchSvg from "../assets/search.svg"
import { Button } from "../components/Button";

type FormData = {
  name: string;
};

export function Dashboard() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(data: FormData) {
    console.log(data);
  }

  return (
    <div className="flex flex-col  p-10 bg-gray-500 rounded-xl md:min-w-3xl ">
      <h1 className="text-gray-100 font-bold text-xl flex-1">Solicitações</h1>
      <form
        className="flex flex-1 items-center justify-between pb-6 border-b border-b-gray-400 md:flex-row gap-2 mt-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <Input required placeholder="Pesquisar pelo nome" {...field} />
          )}
        />

        <Button variant="iconSmall">
          <img src={searchSvg} alt="Ícone de pesquisar" className="w-5"/>
        </Button>
      </form>
    </div>
  );
}
