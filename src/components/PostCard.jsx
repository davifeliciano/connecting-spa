import dayjs from "dayjs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { AiOutlineStar, AiFillStar, AiOutlineComment } from "react-icons/ai";
import { useCallback, useState } from "react";
import profilePlaceholder from "../assets/profile_placeholder.svg";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";

export default function PostCard({ post }) {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [like, setLike] = useState(post.liked);
  const [likePending, setLikePending] = useState(false);

  const handleLike = useCallback(() => {
    setLikePending(true);

    const url = like ? `/posts/${post.id}/unlike` : `/posts/${post.id}/like`;

    axiosPrivate
      .post(url, {})
      .then((res) => {
        setLike(!like);
      })
      .catch((err) => {
        console.error(err);
        navigate("/login?reason=denied", {
          state: { from: location },
          replace: true,
        });
      })
      .finally(() => {
        setLikePending(false);
      });
  }, [likePending, setLikePending, like, setLike]);

  return (
    <Container>
      <CardHeader>
        <Link to={`/user/${post.author.username}`}>
          <img
            src={post.author.imageUrl ?? profilePlaceholder}
            alt={`${post.author.username} profile picture`}
            width={post.author.imageUrl ? 1080 : 250}
            height={post.author.imageUrl ? 1080 : 250}
          />
        </Link>
        <Link className="username" to={`/user/${post.author.username}`}>
          {post.author.username}
        </Link>
      </CardHeader>
      <img
        src={post.imageUrl}
        alt={post.caption}
        width={1080}
        height={1080}
        loading="lazy"
      />
      <PostActions>
        <button className={likePending ? "pending" : ""} onClick={handleLike}>
          {like ? <AiFillStar /> : <AiOutlineStar />}
        </button>
        <button>
          <Link to={`/post/${post.id}`}>
            <AiOutlineComment />
          </Link>
        </button>
      </PostActions>
      <PostContent>
        <PostCaption>
          <Link className="username" to={`/user/${post.author.username}`}>
            {post.author.username}
          </Link>
          <p>{post.caption}</p>
        </PostCaption>
      </PostContent>
      <PostDate>{dayjs(post.createdAt).fromNow()}</PostDate>
    </Container>
  );
}

const pendingKeyframes = keyframes`
  to {
    transform: rotate(72deg);
  }
`;

const Container = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 5px;
  background-color: ${(props) => props.theme.contentBackground};
  filter: drop-shadow(2px 2px 5px ${(props) => props.theme.secondary});
  font-size: 1.4rem;

  & button.pending {
    animation-name: ${pendingKeyframes};
    animation-duration: 500ms;
    animation-direction: alternate;
    animation-timing-function: ease;
    animation-iteration-count: infinite;
  }

  & > *:not(img) {
    padding-inline: 1rem;
  }

  & > img {
    width: 100%;
    height: auto;
    user-select: none;
    -webkit-user-drag: none;
  }

  & a.username {
    font-weight: 500;
  }

  @media (max-width: 768px) {
    border-radius: 0px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;

  & img {
    height: 3rem;
    width: auto;
    user-select: none;
    -webkit-user-drag: none;
    border-radius: 100%;
  }
`;

const PostActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-block: 1rem;

  & button {
    height: 2.5rem;
    aspect-ratio: 1 / 1;
    padding: 0;
    background-color: transparent;
    border: none;
  }

  & svg {
    height: 2.5rem;
    width: 2.5rem;
  }
`;

const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-inline: 1rem;
`;

const PostCaption = styled.div`
  display: inline-flex;
  gap: 1rem;

  & p {
    display: inline;
  }
`;

const PostDate = styled.div`
  padding-block: 5px;
  font-size: 1rem;
  text-transform: uppercase;
`;
