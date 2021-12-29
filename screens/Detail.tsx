import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { IMovie, ITv, moviesApi, tvApi } from "../api";
import Poster from "../components/Poster";
import { makeImgpath } from "../utils";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../colors";
import { useQuery } from "react-query";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 0px 20px;
`;

const Background = styled.Image``;

const Column = styled.View`
  flex-direction: row;
  margin-bottom: 16px;
  width: 80%;
`;

const Title = styled.Text`
  color: white;
  font-size: 24px;
  align-self: flex-end;
  margin-left: 16px;
  font-weight: 500;
`;

const OverView = styled.Text`
  color: ${(props) => props.theme.posterOverviewColor};
  font-size: 14px;
  line-height: 20px;
  margin-top: 20px;
  padding: 0px 20px;
`;

type RootStackParamList = {
  Detail: IMovie | ITv;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

export const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: { params },
}) => {
  const { isLoading: movieLoading, data: movieData } = useQuery(
    ["movie", params.id],
    moviesApi.detail,
    {
      enabled: "title" in params,
    }
  );
  const { isLoading: tvLoading, data: tvData } = useQuery(
    ["tv", params.id],
    tvApi.detail,
    {
      enabled: "name" in params,
    }
  );
  console.log(movieData, tvData);

  useEffect(() => {
    setOptions({
      title: "title" in params ? "Movie" : "TV",
    });
  }, []);
  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgpath(params.backdrop_path || "") }}
        />
        <LinearGradient
          colors={["transparent", colors.BLACK]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={params.poster_path || ""} />
          <Title>{"title" in params ? params.title : params.name}</Title>
        </Column>
      </Header>
      <OverView> {params.overview}</OverView>
    </Container>
  );
};
