import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router";

type FormData = {
  email: string;
  password: string;
};

export function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: FormData) {
    console.log(data);
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
            {...field}
          />
        )}
      />

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
