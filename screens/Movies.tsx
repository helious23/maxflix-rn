import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";

import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { makeImgpath } from "../utils";
import { BlurView } from "expo-blur";

const API_KEY = "83e4562556a8e370915aa2a360e7d4db";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const View = styled.View`
  flex: 1;
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const BgImg = styled.Image``;

const Poster = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Column = styled.View`
  width: 40%;
  margin-left: 16px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.posterTitleTextColor};
`;

const Overview = styled.Text`
  margin-top: 10px;
  color: ${(props) => props.theme.posterOverviewColor};
`;

const Votes = styled(Overview)`
  font-size: 14px;
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const isDark = useColorScheme() === "dark";
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1&region=kr`
      )
    ).json();
    setNowPlaying(results);
    setLoading(false);
  };

  useEffect(() => {
    getNowPlaying();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator color={"#999999"} />
    </Loader>
  ) : (
    <Container>
      <Swiper
        loop
        horizontal
        autoplay
        autoplayTimeout={3.5}
        showsButtons={false}
        showsPagination={false}
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
      >
        {nowPlaying.map((movie) => (
          <View key={movie.id}>
            <BgImg
              source={{ uri: makeImgpath(movie.backdrop_path) }}
              style={StyleSheet.absoluteFill}
            />
            <BlurView
              intensity={100}
              style={StyleSheet.absoluteFill}
              tint={isDark ? "dark" : "light"}
            >
              <Wrapper>
                <Poster source={{ uri: makeImgpath(movie.poster_path) }} />
                <Column>
                  <Title>{movie.title}</Title>
                  {movie.vote_average > 0 ? (
                    <Votes>⭐️ {movie.vote_average} / 10</Votes>
                  ) : null}
                  <Overview>{movie.overview.slice(0, 60)}...</Overview>
                </Column>
              </Wrapper>
            </BlurView>
          </View>
        ))}
      </Swiper>
    </Container>
  );
};

export default Movies;
