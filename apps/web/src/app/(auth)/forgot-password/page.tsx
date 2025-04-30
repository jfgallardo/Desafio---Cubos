import ForgotPasswordForm from "@/components/auth/forgot-password-form";
import { CONFIG } from "@/config-global";

export const metadata = { title: `Recuperar senha | ${CONFIG.site.name}` };

export default function ForgotPassword() {
  return <ForgotPasswordForm />;
}
