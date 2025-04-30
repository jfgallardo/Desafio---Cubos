"use client";
import Link from "next/link";
import UIInput from "../form/ui-input";
import UIButton from "../shared/ui-button";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IconBugOff, IconLoader3 } from "@tabler/icons-react";
import { forgotPassword } from "@/actions/auth";
import { toast } from "react-toastify";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import UICustomNotification from "../shared/ui-custom-notification";
import { useRouter } from "next/navigation";

interface ForgotPassword {
  email: string;
}

export default function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const schema = zod.object({
    email: zod
      .string()
      .min(1, { message: "Campo obrigatório" })
      .email({ message: "Deve ser um email válido" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<ForgotPassword> = async (data) => {
    try {
      setLoading(true);
      await forgotPassword(data.email);
      toast("Email enviado com sucesso!");
      router.push("/sign-in");
    } catch (error) {
      toast.error(UICustomNotification, {
        data: {
          title: "Opa",
          content: error as string,
        },
        ariaLabel: "Unexpected error",
        icon: <IconBugOff />,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-[90%] max-w-lg flex flex-col justify-center space-y-4 items-center bg-ui-mauve-300 dark:bg-ui-mauve-dark-300 p-4 rounded-md">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          <div>
            <UIInput<ForgotPassword>
              label="Email"
              register={register}
              value="email"
              placeholder="Digite seu email"
              required
            />

            <p
              role="alert"
              className="text-red-500 dark:text-red-400 text-sm ml-2 mt-1"
            >
              {errors.email?.message}
            </p>
          </div>

          <div className="flex flex-col w-full items-center gap-4">
            <UIButton
              color="primary"
              variant="default"
              type="submit"
              className="w-full"
              disabled={loading}
            >
              <div className="flex flex-row items-center justify-center gap-2 ">
                Enviar {loading && <IconLoader3 className="animate-spin" />}
              </div>
            </UIButton>
            <Link
              href="/sign-in"
              className="text-sm font-medium underline text-ui-purple-dark-alpha-900 dark:text-ui-purple-dark-900"
            >
              Já possui uma conta? Faça login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
