import styled from "styled-components";

const SubmitButton = styled.button`
  width: 100%;
  height: 4.5rem;
  color: ${(props) => props.theme.contentBackground};
  background-color: ${(props) => props.theme.secondary};
  border: none;
  border-radius: 5px;
  font-family: "Poppins", sans-serif;
  font-size: 2rem;
  transition: background-color 200ms ease;

  &:active {
    background-color: ${(props) => props.theme.main};
    transition: background-color 200ms ease;
  }

  &:disabled {
    opacity: 70%;
  }

  & svg {
    margin: auto;
  }
`;

export default SubmitButton;
