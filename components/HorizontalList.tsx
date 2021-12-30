import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { VerticalMedia } from "./VerticalMedia";
import { ITv, IMovie } from "../api";

const ListContainer = styled.View`
  margin-bottom: 32px;
`;

const ListTitle = styled.Text`
  color: ${(props) => props.theme.posterTitleTextColor};
  font-size: 18px;
  font-weight: 500;
  margin-left: 25px;
  margin-bottom: 16px;
`;

export const HorizontalListSeparator = styled.View`
  width: 20px;
`;

interface HListProps {
  title: string;
  data: ITv[] | IMovie[] | undefined;
  loadMore: () => void;
}

export const HorizontalList: React.FC<HListProps> = ({
  title,
  data,
  loadMore,
}) => {
  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      <FlatList
        //@ts-ignore
        data={data}
        horizontal
        onEndReached={loadMore}
        onEndReachedThreshold={1.5}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        keyExtractor={(item: IMovie | ITv) => item.id + ""}
        ItemSeparatorComponent={HorizontalListSeparator}
        renderItem={({ item }: { item: IMovie | ITv }) => (
          <VerticalMedia
            posterPath={item.poster_path || ""}
            title={"title" in item ? item.title : item.name}
            voteAverage={item.vote_average}
            fullData={item}
          />
        )}
      />
    </ListContainer>
  );
};
