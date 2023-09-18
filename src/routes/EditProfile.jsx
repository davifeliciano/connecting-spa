import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth.js";
import placeholder from "../assets/placeholder.svg";
import Toast from "../components/Toast.jsx";
import FormContainer from "../components/FormContainer.jsx";
import Form from "../components/Form.jsx";
import Input from "../components/Input.jsx";
import TextArea from "../components/TextArea.jsx";
import Button from "../components/Button.jsx";
import SubmitLoader from "../components/SubmitLoader.jsx";
import ChooseFileButton from "../components/ChooseFileButton.jsx";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import editProfileSchema from "../schemas/editProfile.schema.js";

export default function EditProfile() {
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [name, setName] = useState(location.state?.name ?? "");
  const [bio, setBio] = useState(location.state?.bio ?? "");
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

    const getData = async () => {
      try {
        const { data } = await axiosPrivate.get(`/users/${auth.username}`);

        setName(data.name);
        setBio(data.bio ?? "");
        setImage(data.imageUrl);
      } catch (err) {
        console.error(err);
        navigate("/login?reason=denied", {
          state: { from: location },
          replace: true,
        });
      }
    };

    getData();
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

    const { error } = editProfileSchema.validate({ name, bio });

    if (error) {
      toast(error.message);
      setIsLoading(false);
      return;
    }

    const formData = new FormData();

    if (file) formData.append("image", file);
    formData.append("name", name);

    if (bio !== "") formData.append("bio", bio);

    try {
      await axiosPrivate.put("/users/me", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate(`/user/${auth.username}`, { replace: true });
    } catch (err) {
      switch (err.response?.status) {
        case 422:
          console.log(err);
          toast(err.response.data.detail);
          break;

        case 401:
          navigate("/login?reason=expired", {
            state: { name, bio, image, from: location },
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
            <Input
              type="text"
              name="name"
              placeholder="name"
              disabled={isLoading}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextArea
              maxLength={1500}
              name="bio"
              placeholder="Write something about you"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <SubmitLoader /> : "Update Profile"}
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
