import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth.js";
import placeholder from "../assets/placeholder.svg";
import Toast from "../components/Toast.jsx";
import FormContainer from "../components/FormContainer.jsx";
import Form from "../components/Form.jsx";
import TextArea from "../components/TextArea.jsx";
import Button from "../components/Button.jsx";
import SubmitLoader from "../components/SubmitLoader.jsx";
import ChooseFileButton from "../components/ChooseFileButton.jsx";
import captionSchema from "../schemas/caption.schema.js";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";

export default function NewPost() {
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [caption, setCaption] = useState(location.state?.caption ?? "");
  const [file, setFile] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!auth) {
      return navigate("/login?reason=denied", {
        state: { from: location },
        replace: true,
      });
    }
  }, [auth]);

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
      setIsLoading(false);
      return;
    }

    const { error } = captionSchema.validate(caption);

    if (error) {
      toast(error.message);
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);

    try {
      await axiosPrivate.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/feed", { replace: true });
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
            <ChooseFileButton as="label" htmlFor="file-input">
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
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <SubmitLoader /> : "Upload"}
            </Button>
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
