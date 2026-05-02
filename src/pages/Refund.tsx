import { useForm, Controller } from "react-hook-form";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Select } from "../components/Select";
import { CATEGORIES, CATEGORIES_KEYS } from "../utils/categories";
import { Upload } from "../components/Upload";

type Category = keyof typeof CATEGORIES;

type FormData = {
  requestName: string;
  category: Category | "";
  value: number;
  paymentReceipt: string;
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
      paymentReceipt: "",
    },
  });

  function onSubmit(data: FormData) {
    console.log(data);
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
            <Input required legend="Nome da solicitação" {...field} />
          )}
        />
        <div className="flex gap-4">
          <div className="flex-1">
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Select required legend="Categoria" {...field}>
                  {CATEGORIES_KEYS.map((category) => (
                    <option key={category} value={category}>
                      {CATEGORIES[category].name}
                    </option>
                  ))}
                </Select>
              )}
            />
          </div>
          <div className="w-32 md:w-38.5">
            <Controller
              control={control}
              name="value"
              render={({ field }) => (
                <Input required legend="Valor" {...field} />
              )}
            />
          </div>
        </div>
        <Controller
          control={control}
          name="paymentReceipt"
          render={({ field }) => <Upload required {...field} />}
        />

        <Button type="submit" isLoading={isSubmitting}>
          Enviar
        </Button>
      </form>
    </div>
  );
}
