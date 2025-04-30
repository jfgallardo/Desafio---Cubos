import { CONFIG } from "@/config-global";
import CreateMovieView from "@/sections/movie/view/create-movie-view";

export const metadata = { title: `Cadastro | ${CONFIG.site.name}` };

export default function MoviePage() {
  return <CreateMovieView />;
}
