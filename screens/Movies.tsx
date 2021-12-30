import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { Dimensions, FlatList } from "react-native";
import Slide from "../components/Slide";
import { HorizontalMedia } from "../components/HorizontalMedia";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
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

  const {
    data: trendingData,
    isLoading: trendingLoading,
    hasNextPage: hasTrendingNextPage,
    fetchNextPage: fetchTrendingNextPage,
  } = useInfiniteQuery<IMovieResponse>(
    ["movies", "trending"],
    // @ts-ignore
    moviesApi.trending,
    {
      getNextPageParam: (currentPage) => {
        const nextPage = currentPage.page + 1;
        return nextPage > currentPage.total_pages ? null : nextPage;
      },
    }
  );

  const {
    data: upcomingData,
    isLoading: upcomingLoading,
    hasNextPage: hasUpcomingNextPage,
    fetchNextPage: fetchUpcomingNextpage,
  } = useInfiniteQuery<IMovieResponse>(
    ["movies", "upcoming"],
    // @ts-ignore
    moviesApi.upcoming,
    {
      getNextPageParam: (currentPage) => {
        const nextPage = currentPage.page + 1;
        return nextPage > currentPage.total_pages ? null : nextPage;
      },
    }
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["movies"]);
    setRefreshing(false);
  };

  const movieKeyExtractor = (item: IMovie) => item.id + "";

  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;

  const loadMoreTrending = () => {
    if (hasTrendingNextPage) {
      fetchTrendingNextPage();
    }
  };
  const loadMoreUpcoming = () => {
    if (hasUpcomingNextPage) {
      fetchUpcomingNextpage();
    }
  };

  return loading ? (
    <Loader />
  ) : (
    upcomingData && (
      <Container
        onEndReached={loadMoreUpcoming}
        // onEndReachedThreshold={1}
        showsHorizontalScrollIndicator={false}
        //@ts-ignore
        data={upcomingData.pages.map((page) => page.results).flat()}
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
              loadMore={loadMoreTrending}
              //@ts-ignore
              data={trendingData?.pages.map((page) => page.results).flat()}
            />
            <CommingSoonTitle>Comming Soon</CommingSoonTitle>
          </>
        }
      />
    )
  );
};

export default Movies;
