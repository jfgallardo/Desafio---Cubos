import SignInForm from "@/components/auth/sign-in-form";
import { CONFIG } from "@/config-global";

export const metadata = { title: `Entrar | ${CONFIG.site.name}` };

export default function SignIn() {
  return <SignInForm />;
}
