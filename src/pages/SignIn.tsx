import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function SignIn() {
  return (
    <form className="w-full flex flex-col gap-4">
      <Input
        required
        type="email"
        legend="E-MAIL"
        placeholder="seu@email.com"
      />
      <Input required legend="SENHA" type="password" placeholder="123456" />
      <Button type="submit">Entrar</Button>
    </form>
  );
}
