import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Poster from "./Poster";
import { Votes } from "./Votes";
import { IMovie, ITv } from "../api";

const Container = styled.View`
  align-items: center;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.posterTitleTextColor};
  font-weight: 500;
  margin-top: 6px;
`;

interface IVerticalMediaProps {
  posterPath: string;
  title: string;
  voteAverage?: number;
  fullData: IMovie | ITv;
}

export const VerticalMedia: React.FC<IVerticalMediaProps> = ({
  posterPath,
  title,
  voteAverage,
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
      <Container>
        <Poster path={posterPath} />
        <Title>
          {title.slice(0, 10)}
          {title.length > 10 ? "..." : null}
        </Title>
        <Votes voteAverage={voteAverage} />
      </Container>
    </TouchableOpacity>
  );
};
