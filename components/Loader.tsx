import React from "react";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

export const Loader = () => (
  <Wrapper>
    <ActivityIndicator color={"#999999"} />
  </Wrapper>
);
