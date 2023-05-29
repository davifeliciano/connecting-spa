import styled from "styled-components";
import { useState, useEffect } from "react";
import {
  Link,
  useNavigation,
  useNavigate,
  useActionData,
  useSearchParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import Toast from "../components/Toast.jsx";
import FormContainer from "../components/FormContainer.jsx";
import FormHeading from "../components/FormHeading.jsx";
import Form from "../components/Form.jsx";
import Input from "../components/Input.jsx";
import SubmitButton from "../components/SubmitButton.jsx";
import SubmitLoader from "../components/SubmitLoader.jsx";
import useAuth from "../hooks/useAuth.js";
import { loginSchema } from "../schemas/auth.schemas.js";
import axios from "../api/axios.js";

export async function action({ request }) {
  const formData = await request.formData();
  const form = Object.fromEntries(formData);
  const { error, value } = loginSchema.validate(form);

  if (error) {
    toast(error.message);
    return null;
  }

  const body = value;

  try {
    const { data } = await axios.post("/auth/login", body, {
      withCredentials: true,
    });

    return data;
  } catch (err) {
    switch (err.response?.status) {
      case 401:
        toast("Invalid credentials.");
        break;

      default:
        console.error(err);
        toast("Unexpected error. Try again.");
        break;
    }

    return null;
  }
}

export default function Login() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const actionData = useActionData();
  const [searchParams, setSearchParams] = useSearchParams();
  const reason = searchParams.get("reason");
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const isLoading =
    navigation.state === "submitting" || navigation.state === "loading";

  useEffect(() => {
    if (actionData) {
      setAuth(actionData);
    }
  }, [actionData]);

  useEffect(() => {
    if (Object.keys(auth).length !== 0) navigate("/feed");

    switch (reason) {
      case "expired":
        toast("Your session has expired! Login again.");
        break;

      case "newuser":
        toast("User created successfully! You can login now.");
        break;

      case "denied":
        toast("You must login to access this page.");
        break;
    }
  }, [auth]);

  return (
    <>
      <Toast />
      <Container>
        <FormContainer>
          <FormHeading />
          <Form method="post">
            <Input
              type="text"
              name="emailOrUsername"
              placeholder="email or username"
              disabled={isLoading}
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
            />
            <Input
              type="password"
              name="password"
              placeholder="senha"
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? <SubmitLoader /> : "Login"}
            </SubmitButton>
          </Form>
          <span>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </span>
        </FormContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  margin-inline: auto;
  width: 40rem;
  padding: 1rem;
  border-radius: 5px;
  background-color: ${(props) => props.theme.contentBackground};
  filter: drop-shadow(2px 2px 5px ${(props) => props.theme.secondary});
`;
