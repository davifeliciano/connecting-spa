import dayjs from "dayjs";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import profilePlaceholder from "../assets/profile_placeholder.svg";

export default function CommentCard({ comment }) {
  return (
    <Container>
      <CardHeader>
        <Link to={`/user/${comment.author.username}`}>
          <img
            src={comment.author.imageUrl ?? profilePlaceholder}
            alt={`${comment.author.username} profile picture`}
            width={comment.author.imageUrl ? 1080 : 250}
            height={comment.author.imageUrl ? 1080 : 250}
          />
        </Link>
        <Link className="username" to={`/user/${comment.author.username}`}>
          {comment.author.username}
        </Link>
      </CardHeader>
      <div>{comment.content}</div>
      <CommentDate>{dayjs(comment.createdAt).fromNow()}</CommentDate>
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

  & > * {
    padding-inline: 1rem;
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

const CommentDate = styled.div`
  padding-block: 5px;
  font-size: 1rem;
  text-transform: uppercase;
`;
