import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import { ActivityIndicator, Dimensions, StyleSheet } from "react-native";
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

const Title = styled.Text``;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
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
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
        loop
        timeout={3.5}
        controlsEnabled={false}
      >
        {nowPlaying.map((movie) => (
          <View key={movie.id}>
            <BgImg
              source={{ uri: makeImgpath(movie.backdrop_path) }}
              style={StyleSheet.absoluteFill}
            />
            <BlurView
              intensity={20}
              style={StyleSheet.absoluteFill}
              tint={"dark"}
            >
              <Title>{movie.title}</Title>
            </BlurView>
          </View>
        ))}
      </Swiper>
    </Container>
  );
};

export default Movies;
