import { CONFIG } from "@/config-global";
import { redirect } from "next/navigation";

export default function Page() {
  redirect(CONFIG.auth.redirectPath);
}
