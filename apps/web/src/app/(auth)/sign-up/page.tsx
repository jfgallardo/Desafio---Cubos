import SignUpForm from "@/components/auth/sign-up-form";
import { CONFIG } from "@/config-global";

export const metadata = { title: `Cadastro | ${CONFIG.site.name}` };

export default function SignUp() {
  return <SignUpForm />;
}
