import { IconDeviceTv } from "@tabler/icons-react";

export default function UINoMoviesFound() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div className="w-full flex flex-col items-center justify-center gap-2">
        <IconDeviceTv className="w-24 h-24 animate-pulse text-white" />
        <p className="text-center text-white font-medium ">
          Nenhum filme encontrado
        </p>
      </div>
    </div>
  );
}
