import styled from "styled-components";

export default function SideBar() {
  return <Container></Container>;
}

const Container = styled.aside`
  flex: 1;
  height: 40rem;
  min-width: 20rem;
  padding: 1rem;
  margin-left: 2rem;
  border-radius: 5px;
  background-color: ${(props) => props.theme.contentBackground};
  filter: drop-shadow(2px 2px 5px ${(props) => props.theme.secondary});
  position: sticky;
  top: 2rem;

  @media (max-width: 956px) {
    & {
      display: none;
    }
  }
`;
