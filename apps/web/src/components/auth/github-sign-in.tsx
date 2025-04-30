"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { IconBrandGithubFilled, IconLoader3 } from "@tabler/icons-react";
import UIButton from "../shared/ui-button";
import { toast } from "react-toastify";

export default function GithubSignIn() {
  const [loading, setLoading] = useState(false);
  return (
    <UIButton
      color="soft"
      className="w-full"
      disabled={loading}
      onClick={() => {
        try {
          setLoading(true);
          signIn("github", { callbackUrl: "/dashboard", redirect: true });
        } catch (error) {
          console.error(error);
          toast("Erro ao fazer login com GitHub");
          setLoading(false);
        }
      }}
    >
      <div className="flex flex-row items-center justify-center gap-2 ">
        <IconBrandGithubFilled color="black" className="w-8 h-8" />
        <span className="text-black dark:text-white font-inter font-bold text-lg leading-none tracking-normal">
          Continue with GitHub
        </span>
        {loading && <IconLoader3 className="animate-spin" />}
      </div>
    </UIButton>
  );
}
