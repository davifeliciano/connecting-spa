import styled from "styled-components";

export default function SideBar() {
  return <Container></Container>;
}

const Container = styled.aside`
  flex: 1;
  height: 40rem;
  padding: 1rem;
  border-radius: 5px;
  background-color: ${(props) => props.theme.contentBackground};
  filter: drop-shadow(2px 2px 5px ${(props) => props.theme.secondary});
  position: sticky;
  top: 2rem;
`;
