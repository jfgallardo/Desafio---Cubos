import { CONFIG } from "@/config-global";
import DetailsMovieView from "@/sections/movie/view/details-movie-view";

type Props = {
  params: {
    id: string;
  };
};

export const metadata = { title: `Detalhes | ${CONFIG.site.name}` };

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <DetailsMovieView id={id} />;
}
