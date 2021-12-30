import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  useColorScheme,
  Share,
  TouchableOpacity,
  Platform,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import styled from "styled-components/native";
import { IMovie, ITv, moviesApi, tvApi, IDetailResponse } from "../api";
import Poster from "../components/Poster";
import { makeImgpath } from "../utils";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../colors";
import { useQuery } from "react-query";
import { Loader } from "../components/Loader";
import { Ionicons } from "@expo/vector-icons";

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

const DataContainer = styled.View`
  padding: 20px 20px;
`;

const OverView = styled.Text`
  color: ${(props) => props.theme.posterOverviewColor};
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 20px;
`;

const DetailContainer = styled.View`
  height: 100%;
`;

const VideoTab = styled.View`
  margin-bottom: 12px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const VideoTabText = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 20px;
  font-weight: 600;
`;

const VideoOpenIcon = styled.TouchableOpacity``;

const VideoCard = styled.View<{ isVideoOpen: boolean }>`
  display: ${(props) => (props.isVideoOpen ? "flex" : "none")};
`;

const VideoBtn = styled.TouchableOpacity`
  flex-direction: row;
`;

const BtnText = styled.Text`
  color: ${(props) => props.theme.textColor};
  width: 90%;
  font-weight: 600;
  margin-bottom: 12px;
  line-height: 24px;
  margin-left: 10px;
`;

type RootStackParamList = {
  Detail: IMovie | ITv;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

export const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: { params },
}) => {
  const isDark = useColorScheme() === "dark";
  const isMovie = "title" in params;
  const [videoOpen, setVideoOpen] = useState(true);
  const { isLoading, data } = useQuery<IDetailResponse>(
    [isMovie ? "movie" : "tv", params.id],
    isMovie ? moviesApi.detail : tvApi.detail
  );
  const shareMedia = async () => {
    const isAndroid = Platform.OS === "android";
    const homepage = isMovie
      ? `https://www.imdb.com/title/${data?.imdb_id}`
      : data?.homepage;
    if (homepage) {
      if (isAndroid) {
        await Share.share({
          message: `${params.overview}\n ${homepage}`,
          title: "title" in params ? params.title : params.name,
        });
      } else {
        await Share.share({
          url: homepage,
          title: "title" in params ? params.title : params.name,
        });
      }
    }
  };
  const ShareButton = () => (
    <TouchableOpacity onPress={shareMedia}>
      <Ionicons
        name="share-outline"
        color={isDark ? "white" : colors.NAVY}
        size={20}
      />
    </TouchableOpacity>
  );

  useEffect(() => {
    setOptions({
      title: isMovie ? "Movie" : "TV",
      headerRight: () => <ShareButton />,
    });
  }, []);

  useEffect(() => {
    if (data) {
      setOptions({
        headerRight: () => <ShareButton />,
      });
    }
  }, [data]);

  const openYoutubeLink = async (videoId: string) => {
    const baseUrl = `https://m.youtube.com/watch?v=${videoId}`;
    // await Linking.openURL(baseUrl);
    await WebBrowser.openBrowserAsync(baseUrl);
  };

  console.log(data);

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
      <DataContainer>
        <OverView> {params.overview}</OverView>
        <DetailContainer>
          {isLoading ? <Loader /> : null}
          {data?.videos.results && data.videos.results.length > 0 && (
            <VideoTab>
              <VideoTabText>Videos</VideoTabText>
              <VideoOpenIcon onPress={() => setVideoOpen((prev) => !prev)}>
                <Ionicons
                  name={
                    videoOpen
                      ? "chevron-up-circle-outline"
                      : "chevron-down-circle-outline"
                  }
                  color={isDark ? "white" : colors.NAVY}
                  size={24}
                />
              </VideoOpenIcon>
            </VideoTab>
          )}
          {data?.videos.results.map((video) => (
            <VideoCard key={video.key} isVideoOpen={videoOpen}>
              <VideoBtn onPress={() => openYoutubeLink(video.key)}>
                <Ionicons
                  name="ios-logo-youtube"
                  color={isDark ? "white" : colors.NAVY}
                  size={24}
                />
                <BtnText>
                  {video.name.length > 32
                    ? `${video.name.slice(0, 32)} ...`
                    : video.name}
                </BtnText>
              </VideoBtn>
            </VideoCard>
          ))}
        </DetailContainer>
      </DataContainer>
    </Container>
  );
};
