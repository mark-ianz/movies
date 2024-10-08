import { TvFullDetails } from "@/types/tv";
import { MovieFullDetails } from "@/types/movie.details";
import {
  getImg,
  getShowDirectors,
  getShowDuration,
  getShowName,
  getShowYear,
} from "@/lib/helpers";
import JoinGenreList from "./JoinGenreList";
import Rating from "@/components/Rating";
import ShowNameWYear from "../ShowNameWYear";
import OtherShowDescription from "./OtherShowDescription";
import OptionButtons from "./OptionButtons";
import { useLanguage } from "@/context/language-provider";
import { useEffect, useState } from "react";

type Props = {
  showData: TvFullDetails | MovieFullDetails;
};

export default function ViewInfoSection({ showData }: Props) {
  const [directors, setDirectors] = useState<string[] | []>([]);
  const {
    language: { iso_639_1: language },
  } = useLanguage();

  useEffect(() => {
    const fetchDirectors = async () => {
      const directorsData = await getShowDirectors(showData);
      setDirectors(directorsData);
    };

    fetchDirectors();
  }, [showData, language]);
  const backdrop_path = getImg(showData?.backdrop_path!, "w1280", true);
  const poster_path = getImg(showData?.poster_path!, "w300", true);
  const genreList = showData.genres.map((genre) => genre.name);

  return (
    <section
      className="p-6 relative"
      style={{
        backgroundImage: `url(${backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background opacity-90 z-0"></div>
      <div className="flex gap-10 relative z-10 items-center max-md:flex-col">
        {poster_path && (
          <img
            src={poster_path}
            alt={getShowName(showData) + " poster path"}
            className="object-cover rounded-lg"
          />
        )}
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 font-thin items-center">
            <p className="min-w-fit">{getShowDuration(showData)}</p>
            <JoinGenreList genreList={genreList} />
            <Rating rating={showData.vote_average} />
          </div>
          <ShowNameWYear
            showName={getShowName(showData)}
            year={getShowYear(showData)}
          />
          <OtherShowDescription
            directorList={directors}
            tagline={showData.tagline}
            overview={showData.overview}
          />
          <OptionButtons showData={showData} />
        </div>
      </div>
    </section>
  );
}
