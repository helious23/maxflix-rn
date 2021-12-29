import React, { useState } from "react";
import styled from "styled-components/native";
import { useQuery } from "react-query";
import { moviesApi, tvApi, IMovieResponse, ITvResponse } from "../api";
import { Loader } from "../components/Loader";
import { HorizontalList } from "../components/HorizontalList";

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
  background-color: ${(props) => props.theme.searchInputBgColor};
  padding: 10px 15px;
  border: 1px solid ${(props) => props.theme.searchInputBorderColor};
  border-radius: 10px;
  width: 90%;
  margin: 10px auto;
  margin-bottom: 40px;
`;

const NotFound = styled.Text`
  color: ${(props) => props.theme.posterTitleTextColor};
  margin: 10px auto;
  font-size: 20px;
`;

const Search = () => {
  const [query, setQuery] = useState("");
  const {
    isLoading: moviesLoading,
    data: moviesData,
    refetch: searchMovies,
  } = useQuery<IMovieResponse>(["searchMovies", query], moviesApi.search, {
    enabled: false,
  });

  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTv,
  } = useQuery<ITvResponse>(["searchTv", query], tvApi.search, {
    enabled: false,
  });

  const onChangeText = (text: string) => setQuery(text);
  const onSubmit = () => {
    if (query === "") {
      return;
    }
    searchMovies();
    searchTv();
  };

  return (
    <Container>
      <SearchBar
        placeholder="Search for Movie or TV Show"
        placeholderTextColor="grey"
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      {moviesLoading || tvLoading ? <Loader /> : null}
      {moviesData && moviesData.total_results > 0 ? (
        <HorizontalList title="Movie Results" data={moviesData.results} />
      ) : null}
      {tvData && tvData?.total_results > 0 ? (
        <HorizontalList title="TV Results" data={tvData.results} />
      ) : null}
      {moviesData?.total_pages == 0 && tvData?.total_results == 0 ? (
        <NotFound>No results for {query}</NotFound>
      ) : null}
    </Container>
  );
};

export default Search;
