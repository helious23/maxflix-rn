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
  data: IMovie[] | ITv[] | undefined;
}

export const HorizontalList: React.FC<HListProps> = ({ title, data }) => {
  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        keyExtractor={(item) => item.id + ""}
        ItemSeparatorComponent={HorizontalListSeparator}
        data={data}
        renderItem={({ item }) => (
          <VerticalMedia
            posterPath={item.poster_path || ""}
            title={item.name ?? item.title}
            voteAverage={item.vote_average}
          />
        )}
      />
    </ListContainer>
  );
};
