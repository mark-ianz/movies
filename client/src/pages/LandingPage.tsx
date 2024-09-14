import { useQuery } from "@tanstack/react-query";
import { getNewReleases, getTrendingThisWeek } from "@/utils/api";
import MovieSection from "@/components/MovieSection";

export type Movie = {
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export default function LandingPage() {
  const {
    data: trending_this_week,
    isLoading: is_trending_this_week_loading,
    isError: is_trending_this_week_error,
    error: trending_this_week_error,
  } = useQuery({
    queryKey: ["trending_this_week"],
    queryFn: getTrendingThisWeek,
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: new_releases,
    isLoading: is_new_releases_loading,
    isError: is_new_releases_error,
    error: new_releases_error,
  } = useQuery({
    queryKey: ["new_releases"],
    queryFn: getNewReleases,
    staleTime: 1000 * 60 * 5,
  });

  if (is_trending_this_week_loading || is_new_releases_loading) {
    return <p>Loading...</p>;
  }

  if (is_new_releases_error || is_trending_this_week_error) {
    return (
      <p>{trending_this_week_error?.message || new_releases_error?.message}</p>
    );
  }

  if (trending_this_week && new_releases) {
    return (
      <main className="flex flex-col gap-20">
        <MovieSection
          movieArray={trending_this_week}
          title="Trending This Week"
        />
        <MovieSection movieArray={new_releases} title="New Releases" />
      </main>
    );
  }
}
