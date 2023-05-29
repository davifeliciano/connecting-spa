import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  margin: auto;
  border-radius: 5px;

  & span {
    font-size: 1.2rem;
  }

  && a {
    color: #0586ff;
  }
`;

export default FormContainer;
