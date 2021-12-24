import React from "react";
import styled from "styled-components/native";
import { makeImgpath } from "../utils";
import { BlurView } from "expo-blur";
import { StyleSheet, useColorScheme } from "react-native";
import Poster from "./Poster";

const View = styled.View`
  flex: 1;
`;

const BgImg = styled.Image``;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: space-around;
  align-items: center;
`;

const Column = styled.View`
  width: 50%;
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

interface ISlideProps {
  backdropPath: string;
  posterPath: string;
  movieTitle: string;
  voteAverage: number;
  overview: string;
}

const Slide: React.FC<ISlideProps> = ({
  backdropPath,
  posterPath,
  movieTitle,
  voteAverage,
  overview,
}) => {
  const isDark = useColorScheme() === "dark";

  return (
    <View>
      <BgImg
        source={{ uri: makeImgpath(backdropPath) }}
        style={StyleSheet.absoluteFill}
      />
      <BlurView
        intensity={100}
        style={StyleSheet.absoluteFill}
        tint={isDark ? "dark" : "light"}
      >
        <Wrapper>
          <Poster path={posterPath} />
          <Column>
            <Title>{movieTitle}</Title>
            {voteAverage > 0 ? <Votes>⭐️ {voteAverage} / 10</Votes> : null}
            <Overview>{overview?.slice(0, 68)}...</Overview>
          </Column>
        </Wrapper>
      </BlurView>
    </View>
  );
};

export default Slide;
