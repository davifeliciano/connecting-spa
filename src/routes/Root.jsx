import styled from "styled-components";
import Header from "../components/Header.jsx";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <Container>
      <Header />
      <OutletContainer>
        <Outlet />
      </OutletContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const OutletContainer = styled.div`
  margin-inline: 20rem;
`;
