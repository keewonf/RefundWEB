import { useForm, Controller } from "react-hook-form";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Select } from "../components/Select";

type FormData = {
  requestName: string;
  category: string;
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
      value: 0.0,
      paymentReceipt: "",
    },
  });

  function onSubmit(data: FormData) {
    console.log(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-500 w-full rounded-xl flex flex-col p-10 gap-6 lg:min-w-lg"
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

      <Controller
        control={control}
        name="category"
        render={({ field }) => <Select required legend="Categoria" {...field} />}
      />

      <Controller
        control={control}
        name="value"
        render={({ field }) => <Input required legend="Valor" {...field} />}
      />

      <Controller
        control={control}
        name="paymentReceipt"
        render={({ field }) => (
          <Input
            required
            legend="Comprovante"
            type="file"
            placeholder="Nome do arquivo.pdf"
            {...field}
          />
        )}
      />

      <Button type="submit" isLoading={isSubmitting}>
        Enviar
      </Button>
    </form>
  );
}
