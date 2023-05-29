import styled from "styled-components";
import heading from "../assets/heading.svg";

export default function Header() {
  return (
    <HeaderContainer>
      <HeaderLogo>
        <img src={heading} alt="Connecting" />
      </HeaderLogo>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3rem 10rem;

  background-color: ${(props) => props.theme.contentBackground};
  filter: drop-shadow(2px 2px 5px ${(props) => props.theme.secondary});
`;

const HeaderLogo = styled.div`
  height: 2.5rem;

  & img {
    height: 100%;
    width: auto;
    user-select: none;
    -webkit-user-drag: none;
  }
`;
