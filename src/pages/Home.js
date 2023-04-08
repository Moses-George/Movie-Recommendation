import FeaturedMovie from "../components/Movies/FeaturedMovie";
import MoviesGenreFilter from "../components/Movies/MoviesGenreFilter";
import MoviesRow from "../components/Movies/MoviesRow";
import TvShowRow from "../components/TvShows/TvShowRow";
import TopStories from "../components/News/TopStories";
import {
    useGetMoviesDiscoverQuery,
    useGetUpcomingMoviesQuery,
    useGetPopularTVShowsQuery,
    useGetTopRatedTVShowsQuery
} from "../store/service/movieApiSlice";

const Home = () => {

    const { data: discoveryMovies, isLoading: isDiscoveryLoading } = useGetMoviesDiscoverQuery(1);

    const { data: upcomingMovies, isLoading: isUpcomingLoading } = useGetUpcomingMoviesQuery(1);

    const { data: popularTVShows, isLoading: isPopularLoading } = useGetPopularTVShowsQuery(1);

    const { data: topRatedTVShows, isLoading: isTopRatedLoading } = useGetTopRatedTVShowsQuery(1);



    return <>
        <FeaturedMovie />
        <MoviesGenreFilter />
        <MoviesRow header="Discover" movieData={discoveryMovies?.results} loading={isDiscoveryLoading} />
        <MoviesRow header="Upcoming Movies" movieData={upcomingMovies?.results} loading={isUpcomingLoading} />
        <TvShowRow header="Popular TV Shows" tvShowData={popularTVShows?.results} loading={isPopularLoading} />
        <TvShowRow header="Top Rated TV Shows" tvShowData={topRatedTVShows?.results} loading={isTopRatedLoading} />
        <TopStories />
    </>
}

export default Home;