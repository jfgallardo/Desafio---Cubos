"use client";
import { useEffect, useState } from "react";
import UIButton from "./ui-button";
import { IconSunFilled, IconMoonFilled, IconCube } from "@tabler/icons-react";
import UITooltip from "./ui-tooltip";
import { signOut, useSession } from "next-auth/react";
import UILoadingScreen from "./ui-loadingScreen";
import UIAvatar from "./ui-avatar";
import { CustomSession } from "@/auth";
import Link from "next/link";

type Theme = "light" | "dark";

type Props = {
  initialValue: Theme;
};

export default function UITopBar({ initialValue }: Props) {
  const [theme, setTheme] = useState<Theme>(initialValue);
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession() as { data: CustomSession };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (theme) {
      document.cookie = `theme=${theme};path=/;`;
      document.querySelector("html")?.setAttribute("data-theme", theme);
    }
  }, [theme, mounted]);

  const handleSignOut = async () => {
    await signOut();
  };

  if (!mounted) {
    return <UILoadingScreen text="Preparando todo..." />;
  }

  return (
    <div className="w-full flex flex-row justify-between p-4 h-[72px] bg-ui-purple-100 dark:bg-ui-purple-dark-100 dark:text-white">
      <div className="flex flex-row items-center gap-2">
        <Link href="/dashboard" className="flex items-center gap-2">
          <IconCube className="w-8 h-8" />
          <span className="font-inter font-extrabold text-2xl leading-none tracking-normal text-center hidden md:block">
            Cubos
          </span>
        </Link>
        <span className="font-inter font-bold text-lg leading-none tracking-normal text-center">
          Movies
        </span>
      </div>
      <div className="flex flex-row items-center gap-2">
        <UIButton
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          variant="default"
          color="soft"
        >
          {theme === "dark" ? (
            <UITooltip id="IconSunFilled" content="Light Mode">
              <IconSunFilled />
            </UITooltip>
          ) : (
            <UITooltip id="IconMoonFilled" content="Dark Mode">
              <IconMoonFilled color="black" />
            </UITooltip>
          )}
        </UIButton>
        {session && (
          <div className="flex items-center gap-4">
            <UIButton onClick={handleSignOut} color="primary">
              Logout
            </UIButton>
            <UIAvatar
              imageUrl={session.image || ""}
              username={session.name || ""}
            />
          </div>
        )}
      </div>
    </div>
  );
}
