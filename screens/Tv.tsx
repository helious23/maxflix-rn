import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { tvApi, ITvResponse } from "../api";
import { HorizontalList } from "../components/HorizontalList";
import { Loader } from "../components/Loader";

const Tv = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const { data: todayData, isLoading: todayLoading } = useQuery<ITvResponse>(
    ["tv", "today"],
    tvApi.airingToday
  );
  const { data: topData, isLoading: topLoading } = useQuery<ITvResponse>(
    ["tv", "top"],
    tvApi.topRated
  );
  const { data: trendingData, isLoading: trendingLoading } =
    useQuery<ITvResponse>(["tv", "trending"], tvApi.trending);

  const loading = todayLoading || topLoading || trendingLoading;

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["tv"]);
    setRefreshing(false);
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
        <HorizontalList title="Trending TV" data={trendingData.results} />
      )}
      {todayData && (
        <HorizontalList title="Airing Today" data={todayData.results} />
      )}
      {topData && (
        <HorizontalList title="Top Rated TV" data={topData.results} />
      )}
    </ScrollView>
  );
};

export default Tv;
