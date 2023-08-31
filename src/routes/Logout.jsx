import { useEffect } from "react";
import useLogout from "../hooks/useLogout.js";
import { useNavigate } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { ThreeDots } from "react-loader-spinner";

export default function Logout() {
  const logout = useLogout();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    logout().finally(() => {
      navigate("/login");
    });
  }, []);

  return (
    <LoaderContainer>
      <ThreeDots height={20} color={theme.main} />
      <span>Logging you out...</span>
    </LoaderContainer>
  );
}

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
