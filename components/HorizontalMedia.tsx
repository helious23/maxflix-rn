import { useNavigation } from "@react-navigation/native";
import { Platform, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Poster from "./Poster";
import { IMovie, ITv } from "../api";

const HorizontalMovie = styled.View`
  padding: 0px 20px;
  flex-direction: row;
`;

const HorizontalColumn = styled.View`
  margin-left: 16px;
  width: 80%;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.posterTitleTextColor};
  font-weight: 500;
  margin-top: 6px;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.posterOverviewColor};
  width: 80%;
`;

const Release = styled.Text`
  color: ${(props) => props.theme.posterOverviewColor};
  font-size: 12px;
  margin: 10px 0;
`;

interface IHorizontalMediaProps {
  posterPath: string;
  title: string;
  overview: string;
  releaseDate?: Date;
  voteAverage?: number;
  fullData: IMovie;
}

export const HorizontalMedia: React.FC<IHorizontalMediaProps> = ({
  posterPath,
  title,
  releaseDate,
  overview,
  fullData,
}) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    //@ts-ignore
    navigation.navigate("Stack", {
      screen: "Detail",
      params: {
        ...fullData,
      },
    });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <HorizontalMovie>
        <Poster path={posterPath} />
        <HorizontalColumn>
          <Title>{title}</Title>
          {releaseDate && (
            <Release>
              {Platform.OS === "android"
                ? new Date(releaseDate).toISOString().slice(0, 10)
                : new Date(releaseDate).toLocaleDateString("ko", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
            </Release>
          )}
          <Overview>
            {overview !== "" && overview.length > 100
              ? `${overview.slice(0, 100)}...`
              : overview}
          </Overview>
        </HorizontalColumn>
      </HorizontalMovie>
    </TouchableOpacity>
  );
};
