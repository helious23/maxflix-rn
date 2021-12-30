import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { tvApi, ITvResponse } from "../api";
import { HorizontalList } from "../components/HorizontalList";
import { Loader } from "../components/Loader";

const Tv = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const {
    data: todayData,
    isLoading: todayLoading,
    hasNextPage: hasAiringNextPage,
    fetchNextPage: fetchAiringNextPage,
  } = useInfiniteQuery<ITvResponse>(
    ["tv", "today"],
    //@ts-ignore
    tvApi.airingToday,
    {
      getNextPageParam: (currentPage) => {
        const nextPage = currentPage.page + 1;
        return nextPage > currentPage.total_pages ? null : nextPage;
      },
    }
  );

  const {
    data: topData,
    isLoading: topLoading,
    hasNextPage: hasTopRatedNextPage,
    fetchNextPage: fetchTopRatedNextPage,
  } = useInfiniteQuery<ITvResponse>(
    ["tv", "top"],
    //@ts-ignore
    tvApi.topRated,
    {
      getNextPageParam: (currentPage) => {
        const nextPage = currentPage.page + 1;
        return nextPage > currentPage.total_pages ? null : nextPage;
      },
    }
  );
  const {
    data: trendingData,
    isLoading: trendingLoading,
    hasNextPage: hasTrendingNextPage,
    fetchNextPage: fetchTrendingNextPage,
  } = useInfiniteQuery<ITvResponse>(
    ["tv", "trending"],
    //@ts-ignore
    tvApi.trending,
    {
      getNextPageParam: (currentPage) => {
        const nextPage = currentPage.page + 1;
        return nextPage > currentPage.total_pages ? null : nextPage;
      },
    }
  );

  const loading = todayLoading || topLoading || trendingLoading;

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["tv"]);
    setRefreshing(false);
  };

  const loadMoreAiring = () => {
    if (hasAiringNextPage) {
      fetchAiringNextPage();
    }
  };
  const loadMoreTopRated = () => {
    if (hasTopRatedNextPage) {
      fetchTopRatedNextPage();
    }
  };
  const loadMoreTrending = () => {
    if (hasTrendingNextPage) {
      fetchTrendingNextPage();
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <ScrollView
      contentContainerStyle={{ paddingVertical: 30 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {trendingData && (
        <HorizontalList
          title="Trending TV"
          loadMore={loadMoreTrending}
          //@ts-ignore
          data={trendingData?.pages.map((page) => page.results).flat()}
        />
      )}
      {todayData && (
        <HorizontalList
          title="Airing Today"
          loadMore={loadMoreAiring}
          //@ts-ignore
          data={todayData?.pages.map((page) => page.results).flat()}
        />
      )}
      {topData && (
        <HorizontalList
          title="Top Rated TV"
          loadMore={loadMoreTopRated}
          //@ts-ignore
          data={topData?.pages.map((page) => page.results).flat()}
        />
      )}
    </ScrollView>
  );
};

export default Tv;
