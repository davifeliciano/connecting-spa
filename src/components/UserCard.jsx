import styled from "styled-components";
import profilePlaceholder from "../assets/profile_placeholder.svg";
import Button from "./Button.jsx";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import { AiFillEdit } from "react-icons/ai";

export default function UserCard({ user }) {
  const { auth } = useAuth();

  return (
    <Container>
      <ProfilePicContainer>
        {auth.username === user.username ? (
          <EditProfileButton to={"/editprofile"}>
            <AiFillEdit />
          </EditProfileButton>
        ) : null}
        <img
          src={user.imageUrl ?? profilePlaceholder}
          alt={`${user.username} profile picture`}
          width={user.imageUrl ? 1080 : 250}
          height={user.imageUrl ? 1080 : 250}
        />
        {auth.username !== user.username ? (
          <FollowButton>{user.followed ? "Unfollow" : "Follow"}</FollowButton>
        ) : null}
      </ProfilePicContainer>
      <UserInfoContainer>
        <h1>{user.username}</h1>
        <h2>{user.name}</h2>
        <Bio>{user.bio ?? "No bio"}</Bio>
        <Counters>
          <span>Posts</span>
          <Link to={`/user/${user.username}/followers`}>Followers</Link>
          <Link to={`/user/${user.username}/following`}>Following</Link>
          <span>{user.postsCount}</span>
          <Link to={`/user/${user.username}/followers`}>
            {user.followersCount}
          </Link>
          <Link to={`/user/${user.username}/following`}>
            {user.followingCount}
          </Link>
        </Counters>
      </UserInfoContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
  border-radius: 5px;
  background-color: ${(props) => props.theme.contentBackground};
  filter: drop-shadow(2px 2px 5px ${(props) => props.theme.secondary});

  @media (max-width: 768px) {
    border-radius: 0px;
  }
`;

const ProfilePicContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 20rem;

  position: relative;

  & img {
    width: 100%;
    height: auto;
    object-fit: contain;
    border-radius: 100%;
    user-select: none;
    -webkit-user-drag: none;
  }
`;

const EditProfileButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  aspect-ratio: 1 / 1;
  border: none;
  border-radius: 100%;
  background-color: ${(props) => props.theme.secondary};
  filter: drop-shadow(1px 1px 3px ${(props) => props.theme.secondary});

  transition: background-color 200ms ease;

  position: absolute;
  left: 0;
  top: 0;
  transform: translate(20%, 20%);

  &:active {
    background-color: ${(props) => props.theme.main};
    transition: background-color 200ms ease;
  }

  && svg {
    fill: ${(props) => props.theme.contentBackground};
    width: 2rem;
    height: 2rem;
  }
`;

const FollowButton = styled(Button)`
  width: 10rem;
  height: 3rem;
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  & h1 {
    font-size: 2.5rem;
    font-weight: 500;
  }

  & h2 {
    color: ${(props) => props.theme.foreground};
    line-height: 2rem;
    font-size: 2rem;
    font-weight: 300;
  }
`;

const Bio = styled.p`
  flex: 1;
  overflow-y: scroll;
  margin-top: 2rem;
  font-size: 1.2rem;
`;

const Counters = styled.div`
  display: grid;
  grid-template:
    "count count count"
    "count count count";
  place-items: center;
  gap: 0 1rem;
  margin-top: 2rem;
  font-size: 1.5rem;
  font-weight: 500;
`;
