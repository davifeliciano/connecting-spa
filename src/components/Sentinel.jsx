import styled from "styled-components";
import { TailSpin } from "react-loader-spinner";
import { useTheme } from "styled-components";

export default function Sentinel({ outOfRows, sentinelReached, sentinelId }) {
  const theme = useTheme();

  return (
    <Container id="sentinel">
      {outOfRows ? (
        "No more posts"
      ) : sentinelReached ? (
        <TailSpin height={40} width={40} color={theme.main} />
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  margin-inline: auto;
  color: ${(props) => props.theme.text};
  font-size: 1.2rem;
`;
