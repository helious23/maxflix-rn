import React from "react";
import styled from "styled-components/native";
import { makeImgpath } from "../utils";

const PosterImage = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.defaultGrey};
`;

interface IPosterProps {
  path: string;
}

const Poster: React.FC<IPosterProps> = ({ path }) => (
  <PosterImage source={{ uri: makeImgpath(path) }} />
);

export default Poster;
