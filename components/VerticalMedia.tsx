import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Poster from "./Poster";
import { Votes } from "./Votes";

const Movie = styled.View`
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
}

export const VerticalMedia: React.FC<IVerticalMediaProps> = ({
  posterPath,
  title,
  voteAverage,
}) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("Stack", { screen: "Detail" });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <Movie>
        <Poster path={posterPath} />
        <Title>
          {title.slice(0, 10)}
          {title.length > 10 ? "..." : null}
        </Title>
        <Votes voteAverage={voteAverage} />
      </Movie>
    </TouchableOpacity>
  );
};
