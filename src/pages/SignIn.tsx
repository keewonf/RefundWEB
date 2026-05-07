import { api } from "../services/api";
import { AxiosError } from "axios";
import { z, ZodError } from "zod";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../components/Button";
import { Input } from "../components/Input";

const signInSchema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string("Senha inválida").trim().min(1, "Informe a senha"),
});

type FormData = z.infer<typeof signInSchema>;

export function SignIn() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
  });

  async function onSubmit(data: FormData) {
    console.log(data);
    try {
      const response = await api.post("/sessions", data);
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-4"
    >
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <Input
            required
            type="email"
            legend="E-MAIL"
            placeholder="seu@email.com"
            error={errors.email?.message}
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <Input
            required
            legend="SENHA"
            type="password"
            placeholder="123456"
            error={errors.password?.message}
            {...field}
          />
        )}
      />

      <p className="text-sm text-red-600 text-center my-4 font-medium">
        {errors.root?.message}
      </p>

      <Button type="submit" isLoading={isSubmitting}>
        Entrar
      </Button>
      <Link
        to="/signup"
        className="text-center hover:text-green-800 text-sm font-semibold text-gray-100 mt-4 transition ease-linear"
      >
        Criar conta
      </Link>
    </form>
  );
}
