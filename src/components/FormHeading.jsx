import styled from "styled-components";
import heading from "../assets/heading.svg";
import logoEarth from "../assets/logo_earth.svg";

export default function FormHeading() {
  return (
    <Container>
      <img src={logoEarth} alt="Connecting Logo" />
      <img className="heading" src={heading} alt="Connecting Heading" />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-self: flex-start;
  align-items: center;
  gap: 1rem;
  height: 4rem;

  & img {
    height: 100%;
    width: auto;
    user-select: none;
    -webkit-user-drag: none;
  }

  & img.heading {
    height: 2rem;
  }
`;
