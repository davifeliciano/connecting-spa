import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  height: 4.5rem;
  padding-inline: 1rem;
  border: 1px solid ${(props) => props.theme.secondary};
  border-radius: 5px;
  font-size: 2rem;

  &:focus {
    transition: outline 200ms ease;
    outline: 4px solid ${(props) => props.theme.secondary};
  }

  &:disabled {
    opacity: 70%;
  }
`;

export default Input;
