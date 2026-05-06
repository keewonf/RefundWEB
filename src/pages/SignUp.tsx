import { Controller, useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Link } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.email(),
    password: z.string().min(6, "Password must have at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(schema),
  });

  function onSubmit(data: FormData) {
    console.log(data);
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
