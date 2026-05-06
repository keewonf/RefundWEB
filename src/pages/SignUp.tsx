import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { api } from "../services/api";

import { useNavigate } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

const signUpSchema = z
  .object({
    name: z.string().trim().min(1, "Informe o nome"),
    email: z.email("E-mail inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 dígitos"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof signUpSchema>;

export function SignUp() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(signUpSchema),
  });

  const navigate = useNavigate();

  async function onSubmit(data: FormData) {
    console.log(data);
    try {
      await api.post("/users", data);

      navigate("/");
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError) {
        setError("email", {
          type: "server",
          message: error.response?.data.message,
        });
        return;
      }

      setError("root", {
        type: "server",
        message: "Erro inesperado. Tente novamente.",
      });
    }
  }

  return (
    <form
      className="w-full flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <Input
            required
            legend="nome"
            placeholder="Seu nome"
            error={errors.name?.message}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <Input
            required
            type="email"
            legend="e-mail"
            autoComplete="email"
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
            type="password"
            autoComplete="new-password"
            legend="senha"
            placeholder="123456"
            error={errors.password?.message}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field }) => (
          <Input
            required
            type="password"
            autoComplete="new-password"
            legend="Confirmação da senha"
            placeholder="123456"
            error={errors.confirmPassword?.message}
            {...field}
          />
        )}
      />
      <Button type="submit" isLoading={isSubmitting}>
        Cadastrar
      </Button>

      <Link
        to="/"
        className="text-center hover:text-green-800 text-sm font-semibold text-gray-100 mt-4 transition ease-linear"
      >
        Já tenho uma conta
      </Link>
    </form>
  );
}
