import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { ActivityIndicator, Dimensions, FlatList } from "react-native";
import Slide from "../components/Slide";
import { HorizontalMedia } from "../components/HorizontalMedia";
import { VerticalMedia } from "../components/VerticalMedia";
import { useQuery, useQueryClient } from "react-query";
import { moviesApi, IMovieResponse, IMovie } from "../api";
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.FlatList`
  background-color: ${(props) => props.theme.mainBgColor};
` as unknown as typeof FlatList;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const ListContainer = styled.View`
  margin-bottom: 32px;
`;

const ListTitle = styled.Text`
  color: ${(props) => props.theme.posterTitleTextColor};
  font-size: 18px;
  font-weight: 500;
  margin-left: 25px;
`;

const TrendingScroll = styled.FlatList`
  margin-top: 16px;
` as unknown as typeof FlatList;

const CommingSoonTitle = styled(ListTitle)`
  margin-bottom: 16px;
`;

const VerticalSeparator = styled.View`
  width: 20px;
`;

const HorizontalSeparator = styled.View`
  height: 20px;
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const queryClient = useQueryClient();

  const {
    data: nowPlayingData,
    isLoading: nowPlayingLoading,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery<IMovieResponse>(["movies", "nowPlaying"], moviesApi.nowPlaying);
  const {
    data: upcomingData,
    isLoading: upcomingLoading,
    isRefetching: isRefetchingUpcoming,
  } = useQuery<IMovieResponse>(["movies", "upcoming"], moviesApi.upcoming);
  const {
    data: trendingData,
    isLoading: trendingLoading,
    isRefetching: isRefetchingTrending,
  } = useQuery<IMovieResponse>(["movies", "trending"], moviesApi.trending);

  const onRefresh = () => {
    queryClient.refetchQueries(["movies"]);
  };

  const movieKeyExtractor = (item: IMovie) => item.id + "";

  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;

  const refreshing =
    isRefetchingNowPlaying || isRefetchingUpcoming || isRefetchingTrending;

  return loading ? (
    <Loader>
      <ActivityIndicator color={"#999999"} />
    </Loader>
  ) : (
    upcomingData && (
      <Container
        showsHorizontalScrollIndicator={false}
        data={upcomingData.results}
        refreshing={refreshing}
        onRefresh={onRefresh}
        keyExtractor={movieKeyExtractor}
        ItemSeparatorComponent={HorizontalSeparator}
        renderItem={({ item }) => (
          <HorizontalMedia
            posterPath={item.poster_path || ""}
            title={item.title}
            releaseDate={item.release_date}
            overview={item.overview}
          />
        )}
        ListHeaderComponent={
          <>
            <Swiper
              loop
              horizontal
              autoplay
              autoplayTimeout={3.5}
              showsButtons={false}
              showsPagination={false}
              containerStyle={{
                width: "100%",
                height: SCREEN_HEIGHT / 4,
                marginBottom: 30,
              }}
            >
              {nowPlayingData?.results.map((movie) => (
                <Slide
                  key={movie.id}
                  backdropPath={movie.backdrop_path || ""}
                  posterPath={movie.poster_path || ""}
                  movieTitle={movie.title}
                  voteAverage={movie.vote_average}
                  overview={movie.overview}
                />
              ))}
            </Swiper>
            <ListContainer>
              <ListTitle>Trending Movies</ListTitle>
              {trendingData && (
                <TrendingScroll
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={movieKeyExtractor}
                  contentContainerStyle={{ paddingHorizontal: 20 }}
                  ItemSeparatorComponent={VerticalSeparator}
                  data={trendingData.results}
                  renderItem={({ item }) => (
                    <VerticalMedia
                      posterPath={item.poster_path || ""}
                      title={item.title}
                      voteAverage={item.vote_average}
                    />
                  )}
                />
              )}
            </ListContainer>
            <CommingSoonTitle>Comming Soon</CommingSoonTitle>
          </>
        }
      />
    )
  );
};

export default Movies;
