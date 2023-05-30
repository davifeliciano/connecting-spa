import dayjs from "dayjs";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineStar, AiFillStar, AiOutlineComment } from "react-icons/ai";
import { useState } from "react";
import profilePlaceholder from "../assets/profile_placeholder.svg";

export default function PostCard({ post }) {
  const [like, setLike] = useState(post.liked);

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
      <img src={post.imageUrl} alt={post.caption} />
      <PostActions>
        <button>{like ? <AiFillStar /> : <AiOutlineStar />}</button>
        <button>
          <AiOutlineComment />
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

const Container = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 5px;
  background-color: ${(props) => props.theme.contentBackground};
  filter: drop-shadow(2px 2px 5px ${(props) => props.theme.secondary});
  font-size: 1.4rem;

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
