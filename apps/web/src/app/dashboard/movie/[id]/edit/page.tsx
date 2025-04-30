import { CONFIG } from "@/config-global";
import EditMovieView from "@/sections/movie/view/edit-movie-view";

type Props = {
  params: {
    id: string;
  };
};

export const metadata = { title: `Edicao | ${CONFIG.site.name}` };

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <EditMovieView id={id} />;
}
