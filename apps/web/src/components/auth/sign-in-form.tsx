"use client";
import { IconCube, IconLoader3 } from "@tabler/icons-react";
import GithubSignIn from "./github-sign-in";
import UIInput from "../form/ui-input";
import { SubmitHandler, useForm } from "react-hook-form";
import UIButton from "../shared/ui-button";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";

interface FormLogin {
  identifier: string;
  password: string;
}

export default function SignInForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLogin>();

  const onSubmit: SubmitHandler<FormLogin> = async (data) => {
    try {
      setLoading(true);
      await signIn("credentials", {
        ...data,
        callbackUrl: "/dashboard",
        redirect: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-[90%] max-w-lg flex flex-col justify-center space-y-4 items-center bg-ui-mauve-300 dark:bg-ui-mauve-dark-300 p-4 rounded-md">
        <IconCube className="w-12 h-12" />

        <GithubSignIn />

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          <div>
            <UIInput<FormLogin>
              label="Nome/E-mail"
              register={register}
              value="identifier"
              placeholder="Digite seu nome/E-mail"
              required
            />
            {errors.identifier?.type === "required" && (
              <p
                role="alert"
                className="text-red-500 dark:text-red-400 text-sm ml-2 mt-1"
              >
                Por favor, digite seu nome ou e-mail.
              </p>
            )}
          </div>

          <div>
            <UIInput<FormLogin>
              label="Senha"
              register={register}
              value="password"
              required
              type="password"
              placeholder="Digite sua senha"
            />
            {errors.password?.type === "required" && (
              <p
                role="alert"
                className="text-red-500 dark:text-red-400 text-sm ml-2 mt-1"
              >
                Por favor, digite sua senha.
              </p>
            )}
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
                Entrar {loading && <IconLoader3 className="animate-spin" />}
              </div>
            </UIButton>
            <Link
              href="/forgot-password"
              className="text-sm font-medium underline text-ui-purple-dark-alpha-900 dark:text-ui-purple-dark-900"
            >
              Esqueci minha senha
            </Link>
            <Link
              className="text-sm font-medium underline text-ui-purple-dark-alpha-900 dark:text-ui-purple-dark-900"
              href="/sign-up"
            >
              Não tem uma conta? Cadastre-se
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
