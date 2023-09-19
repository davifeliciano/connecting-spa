import styled from "styled-components";

const TextArea = styled.textarea`
  width: 100%;
  min-height: 10rem;
  padding-inline: 1rem;
  border: 1px solid ${(props) => props.theme.secondary};
  border-radius: 5px;
  font-size: 2rem;
  resize: vertical;

  &:focus {
    transition: outline 200ms ease;
    outline: 4px solid ${(props) => props.theme.secondary};
  }

  &:disabled {
    opacity: 70%;
  }
`;

export default TextArea;
