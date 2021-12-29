import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { Dimensions, FlatList } from "react-native";
import Slide from "../components/Slide";
import { HorizontalMedia } from "../components/HorizontalMedia";
import { useQuery, useQueryClient } from "react-query";
import { moviesApi, IMovieResponse, IMovie } from "../api";
import { Loader } from "../components/Loader";
import { HorizontalList } from "../components/HorizontalList";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.FlatList`
  background-color: ${(props) => props.theme.mainBgColor};
` as unknown as typeof FlatList;

const ListTitle = styled.Text`
  color: ${(props) => props.theme.posterTitleTextColor};
  font-size: 18px;
  font-weight: 500;
  margin-left: 25px;
`;

const CommingSoonTitle = styled(ListTitle)`
  margin-bottom: 16px;
`;

const HorizontalSeparator = styled.View`
  height: 20px;
`;

const Movies = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const { data: nowPlayingData, isLoading: nowPlayingLoading } =
    useQuery<IMovieResponse>(["movies", "nowPlaying"], moviesApi.nowPlaying);

  const { data: upcomingData, isLoading: upcomingLoading } =
    useQuery<IMovieResponse>(["movies", "upcoming"], moviesApi.upcoming);

  const { data: trendingData, isLoading: trendingLoading } =
    useQuery<IMovieResponse>(["movies", "trending"], moviesApi.trending);

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["movies"]);
    setRefreshing(false);
  };

  const movieKeyExtractor = (item: IMovie) => item.id + "";

  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;

  return loading ? (
    <Loader />
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
            fullData={item}
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
                  fullData={movie}
                />
              ))}
            </Swiper>
            <HorizontalList
              title="Trending Movies"
              data={trendingData?.results}
            />
            <CommingSoonTitle>Comming Soon</CommingSoonTitle>
          </>
        }
      />
    )
  );
};

export default Movies;
