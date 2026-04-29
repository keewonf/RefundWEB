import { Controller, useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Link } from "react-router";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
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
          <Input required legend="nome" placeholder="Seu nome" {...field} />
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
            placeholder="seu@email.com"
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
            legend="senha"
            placeholder="123456"
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
            legend="Confirmação da senha"
            placeholder="123456"
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
