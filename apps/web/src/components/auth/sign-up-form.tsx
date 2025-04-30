"use client";
import { IconBugOff, IconCube, IconLoader3 } from "@tabler/icons-react";
import GithubSignIn from "./github-sign-in";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import UIInput from "../form/ui-input";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import UIButton from "../shared/ui-button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import UICustomNotification from "../shared/ui-custom-notification";
import { signUp } from "@/actions/auth";
import { SignUp } from "@/actions/types/auth";

interface FormSignUp {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const schema = zod
    .object({
      name: zod
        .string()
        .min(1, { message: "Campo obrigatório" })
        .max(50, { message: "O nome deve ter no máximo 50 caracteres" }),
      email: zod
        .string()
        .min(1, { message: "Campo obrigatório" })
        .email({ message: "Deve ser um email válido" }),
      password: zod
        .string()
        .min(6, { message: "O campo deve ter no mínimo 6 caracteres" })
        .max(50, { message: "O campo deve ter no máximo 50 caracteres" })
        .regex(/[0-9]/, { message: "A senha deve conter pelo menos um número" })
        .regex(/[^a-zA-Z0-9]/, {
          message: "A senha deve conter pelo menos um caractere especial",
        }),
      confirmPassword: zod
        .string()
        .min(6, { message: "O campo deve ter no mínimo 6 caracteres" })
        .max(50, { message: "O campo deve ter no máximo 50 caracteres" })
        .regex(/[0-9]/, { message: "A senha deve conter pelo menos um número" })
        .regex(/[^a-zA-Z0-9]/, {
          message: "A senha deve conter pelo menos um caractere especial",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "As senhas precisam ser iguais",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormSignUp> = async (data) => {
    try {
      setLoading(true);
      const body: SignUp = {
        name: data.name,
        email: data.email,
        password: data.password,
        provider: "credentials",
        image:
          "https://img.freepik.com/premium-vector/person-with-blue-shirt-that-says-name-person_1029948-7040.jpg",
      };
      await signUp(body);
      toast("Usuário criado com sucesso!");
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
        <IconCube className="w-12 h-12" />

        <GithubSignIn />

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          <div>
            <UIInput<FormSignUp>
              label="Nome"
              register={register}
              value="name"
              placeholder="Digite seu nome"
              required
            />
            <p
              role="alert"
              className="text-red-500 dark:text-red-400 text-sm ml-2 mt-1"
            >
              {errors.name?.message}
            </p>
          </div>

          <div>
            <UIInput<FormSignUp>
              label="E-mail"
              register={register}
              value="email"
              placeholder="Digite seu e-mail"
              required
            />
            <p
              role="alert"
              className="text-red-500 dark:text-red-400 text-sm ml-2 mt-1"
            >
              {errors.email?.message}
            </p>
          </div>

          <div>
            <UIInput<FormSignUp>
              label="Senha"
              register={register}
              value="password"
              required
              type="password"
              placeholder="Digite sua senha"
            />
            <p
              role="alert"
              className="text-red-500 dark:text-red-400 text-sm ml-2 mt-1"
            >
              {errors.password?.message}
            </p>
          </div>

          <div>
            <UIInput<FormSignUp>
              label="Confirmar senha"
              register={register}
              value="confirmPassword"
              required
              type="password"
              placeholder="Confirme sua senha"
            />
            <p
              role="alert"
              className="text-red-500 dark:text-red-400 text-sm ml-2 mt-1"
            >
              {errors.confirmPassword?.message}
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
                Entrar {loading && <IconLoader3 className="animate-spin" />}
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
