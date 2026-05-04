import { useForm, Controller } from "react-hook-form";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Select } from "../components/Select";
import { CATEGORIES, CATEGORIES_KEYS } from "../utils/categories";
import { Upload } from "../components/Upload";
import { useNavigate, useParams } from "react-router";

type Category = keyof typeof CATEGORIES;

type FormData = {
  requestName: string;
  category: Category | "";
  value: number;
  file: File | null;
};

export function Refund() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      requestName: "",
      category: "",
      value: 0,
      file: null,
    },
  });

  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  function onSubmit(data: FormData) {
    if (params.id) {
      return navigate(-1);
    }

    navigate("/confirm", { state: { fromSubmit: true } });
  }

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-500 rounded-xl flex flex-col p-10 gap-6 lg:min-w-lg"
      >
        <header>
          <h1 className="text-xl font-bold text-gray-100">
            Solicitação de reembolso
          </h1>
          <p className="text-sm text-gray-200 mt-2 mb-4">
            Dados da despesa para solicitar reembolso.{" "}
          </p>
        </header>
        <Controller
          control={control}
          name="requestName"
          render={({ field }) => (
            <Input
              required
              legend="Nome da solicitação"
              disabled={!!params.id}
              {...field}
            />
          )}
        />
        <div className="flex gap-4">
          <div className="flex-1">
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Select
                  required
                  legend="Categoria"
                  disabled={!!params.id}
                  {...field}
                >
                  {CATEGORIES_KEYS.map((category) => (
                    <option key={category} value={category}>
                      {CATEGORIES[category].name}
                    </option>
                  ))}
                </Select>
              )}
            />
          </div>
          <div className="w-28 md:w-38.5">
            <Controller
              control={control}
              name="value"
              render={({ field }) => (
                <Input
                  required
                  legend="Valor"
                  disabled={!!params.id}
                  {...field}
                />
              )}
            />
          </div>
        </div>
        <Controller
          control={control}
          name="file"
          render={({ field }) => (
            <Upload
              required
              onChange={field.onChange}
              filename={field.value?.name}
            />
          )}
        />

        <Button type="submit" isLoading={isSubmitting}>
          {params.id ? "Voltar" : "Enviar"}
        </Button>
      </form>
    </div>
  );
}
