import styled from "styled-components";
import Button from "./Button.jsx";

const ChooseFileButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;

  &:focus {
    outline: transparent;
  }

  &:hover {
    cursor: pointer;
  }
`;

export default ChooseFileButton;
