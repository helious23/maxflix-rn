import styled from "styled-components/native";

const Vote = styled.Text`
  margin-top: 5px;
  color: ${(props) => props.theme.posterOverviewColor};
  font-size: 12px;
`;

export const Votes: React.FC<{ voteAverage: number | undefined }> = ({
  voteAverage,
}) => {
  return (
    <Vote>
      {voteAverage && voteAverage > 0
        ? `⭐️ ${voteAverage} / 10`
        : "Comming soon"}
    </Vote>
  );
};
