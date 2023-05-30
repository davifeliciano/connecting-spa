import styled from "styled-components";
import { useState, useEffect } from "react";
import {
  Link,
  useNavigation,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { toast } from "react-toastify";
import placeholder from "../assets/placeholder.svg";
import Toast from "../components/Toast.jsx";
import FormContainer from "../components/FormContainer.jsx";
import Form from "../components/Form.jsx";
import TextArea from "../components/TextArea.jsx";
import SubmitButton from "../components/SubmitButton.jsx";
import SubmitLoader from "../components/SubmitLoader.jsx";
import captionSchema from "../schemas/caption.schema.js";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";

export default function NewPost() {
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [caption, setCaption] = useState(location.state?.caption ?? "");
  const [file, setFile] = useState(location.state?.file ?? "");
  const [image, setImage] = useState(location.state?.image ?? null);
  const [isLoading, setIsLoading] = useState(false);

  function handleImageChange(e) {
    console.log(e.target.value);
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    if (image === null) {
      toast("Image file required");
      return;
    }

    const { error } = captionSchema.validate(caption);

    if (error) {
      toast(error.message);
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);

    try {
      await axiosPrivate.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/feed");
    } catch (err) {
      switch (err.response?.status) {
        case 422:
          console.log(err);
          toast(err.response.data.detail);
          break;

        case 401:
          navigate("/login?reason=expired", {
            state: { caption, image, from: location },
            replace: true,
          });
          break;

        default:
          console.error(err);
          toast("Unexpected error. Try again.");
          break;
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {}, []);

  return (
    <>
      <Toast />
      <Container>
        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <img
              src={image || placeholder}
              alt={image ? "Selected Image" : "Placeholder"}
            />
            <ChooseFileButton htmlFor="file-input">
              Choose an Image
            </ChooseFileButton>
            <input
              id="file-input"
              type="file"
              name="image"
              accept="image/jpeg, image/png, image/webp, image/aviff, image/svg"
              onChange={handleImageChange}
              disabled={isLoading}
            />
            <TextArea
              maxLength={1500}
              name="caption"
              placeholder="Describe your awesome image"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              disabled={isLoading}
            />
            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? <SubmitLoader /> : "Upload"}
            </SubmitButton>
          </Form>
        </FormContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  margin-inline: auto;
  margin-bottom: 3rem;
  width: 40rem;
  padding: 1rem;
  border-radius: 5px;
  background-color: ${(props) => props.theme.contentBackground};
  filter: drop-shadow(2px 2px 5px ${(props) => props.theme.secondary});

  & img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: contain;
    border: 1px solid ${(props) => props.theme.secondary};
    border-radius: 5px;
    user-select: none;
    -webkit-user-drag: none;
  }

  & #file-input {
    display: none;
  }
`;

const ChooseFileButton = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4.5rem;
  color: ${(props) => props.theme.contentBackground};
  background-color: ${(props) => props.theme.secondary};
  border: none;
  border-radius: 5px;
  font-family: "Poppins", sans-serif;
  font-size: 2rem;
  transition: background-color 200ms ease;

  &:focus {
    outline: transparent;
  }

  &:active {
    background-color: ${(props) => props.theme.main};
    transition: background-color 200ms ease;
  }

  &:hover {
    cursor: pointer;
  }
`;
