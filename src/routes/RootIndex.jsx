import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth.js";

export default function RootIndex() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) return navigate("/feed");
    navigate("/login");
  }, [auth]);

  return <></>;
}
