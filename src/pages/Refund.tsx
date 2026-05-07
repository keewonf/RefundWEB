import fileSvg from "../assets/file.svg";
import { CATEGORIES, CATEGORIES_KEYS } from "../utils/categories";

import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { z } from "zod";

import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Select } from "../components/Select";
import { Upload } from "../components/Upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { api } from "../services/api";

const categories = [
  "food",
  "others",
  "services",
  "transport",
  "accommodation",
] as const;

const refundSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Informe um nome claro para sua solicitação" }),
  category: z.enum(categories, {
    message: "Selecione uma categoria",
  }),
  amount: z.number().positive("O valor deve ser positivo"),
  file: z
    .file()
    .nullable()
    .refine((file) => file !== null, {
      message: "Selecione um arquivo",
    }),
});

type FormData = z.input<typeof refundSchema>;

export function Refund() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      category: undefined,
      amount: 0,
      file: undefined,
    },
    resolver: zodResolver(refundSchema),
  });

  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  async function onSubmit(data: FormData) {
    if (params.id) {
      return navigate(-1);
    }

    try {
      if (!data.file) {
        return alert("Selecione um arquivo de comprovante");
      }

      const fileUploadForm = new FormData();
      fileUploadForm.append("file", data.file);

      const response = await api.post("/uploads", fileUploadForm);

      const { file, ...refundData } = data;

      await api.post("/refunds", {
        ...refundData,
        filename: response.data.filename,
      });

      navigate("/confirm", { state: { fromSubmit: true } });
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error.response?.data?.message ?? "Erro de conexão com o servidor";
        setError("root", {
          message,
        });
        return;
      }

      setError("root", {
        message: "Erro inesperado. Tente novamente",
      });

      return;
    }
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
          name="name"
          render={({ field }) => (
            <Input
              required
              legend="Nome da solicitação"
              error={errors.name?.message}
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
                  error={errors.category?.message}
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
              name="amount"
              render={({ field }) => (
                <Input
                  required
                  legend="Valor"
                  error={errors.amount?.message}
                  disabled={!!params.id}
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value.replace(",", ".");

                    field.onChange(Number(value));
                  }}
                />
              )}
            />
          </div>
        </div>

        {params.id ? (
          <a
            className="flex justify-center text-green-100 text-sm font-semibold items-center gap-2 my-6 hover:opacity-70 transition ease-linear"
            href=""
            target="_blank"
          >
            <img src={fileSvg} alt="Ícone de arquivo" />
            Abrir comprovante
          </a>
        ) : (
          <Controller
            control={control}
            name="file"
            render={({ field }) => (
              <Upload
                required
                error={errors.file?.message}
                onChange={field.onChange}
                filename={field.value?.name}
              />
            )}
          />
        )}

        <p className="text-sm text-red-600 text-center my-4 font-medium">
          {errors.root?.message}
        </p>

        <Button type="submit" isLoading={isSubmitting}>
          {params.id ? "Voltar" : "Enviar"}
        </Button>
      </form>
    </div>
  );
}
