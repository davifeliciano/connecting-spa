import styled, { useTheme } from "styled-components";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import PostCard from "../components/PostCard.jsx";
import SideBar from "../components/SideBar.jsx";
import NewPostButton from "../components/NewPostButton.jsx";
import CommentCard from "../components/CommentCard.jsx";
import TextArea from "../components/TextArea.jsx";
import Sentinel from "../components/Sentinel.jsx";
import useInfiniteScroll from "../hooks/useInfiniteScroll.js";
import useAuth from "../hooks/useAuth.js";
import { AiOutlineSend } from "react-icons/ai";
import { TailSpin } from "react-loader-spinner";
import { commentSchema } from "../schemas/comment.schema.js";
import { toast } from "react-toastify";
import Toast from "../components/Toast.jsx";

export default function Post() {
  const { auth } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { postId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState(
    location.state?.comment ?? ""
  );
  const [isSendingComment, setIsSendingComment] = useState(false);
  const sentinelId = "sentinel";
  const { outOfRows, sentinelReached } = useInfiniteScroll({
    sentinelId,
    axios: axiosPrivate,
    rows: comments,
    setRows: setComments,
    path: "/comments",
    queryParams: { postId },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSendingComment(true);

    const { value, error } = commentSchema.validate(commentContent);

    if (error) {
      toast("The comment must be non-empty, up to 256 characters");
      return;
    }

    const body = { postId, content: value };

    try {
      await axiosPrivate.post("/comments", body);
      const res = await axiosPrivate.get(`/comments?postId=${postId}`);
      const newComments = res.data;

      setComments(newComments);
    } catch (err) {
      console.error(err);
      navigate("/login?reason=expired", {
        state: { from: location, comment: commentContent },
        replace: true,
      });
    } finally {
      setIsSendingComment(false);
      setCommentContent("");
    }
  };

  useEffect(() => {
    if (!auth) {
      return navigate("/login?reason=denied", {
        state: { from: location },
        replace: true,
      });
    }

    const errHandler = (err) => {
      if (err.response.status === 404) {
        throw new Error("Post not found");
      }

      console.error(err);
      navigate("/login?reason=expired", {
        state: { from: location, comment: commentContent },
        replace: true,
      });
    };

    axiosPrivate
      .get(`/posts/${postId}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch(errHandler);

    axiosPrivate
      .get(`/comments?postId=${postId}`)
      .then((res) => {
        setComments(res.data);
      })
      .catch(errHandler);
  }, []);

  return (
    <PageContainer>
      <Toast />
      <FeedContainer>
        {post && <PostCard post={post} />}
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <TextArea
              maxLength={256}
              name="content"
              placeholder="Send a comment"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              disabled={isSendingComment}
            />
            <SendCommentButton>
              {isSendingComment ? (
                <TailSpin color={theme.secondary} />
              ) : (
                <AiOutlineSend />
              )}
            </SendCommentButton>
          </form>
        </FormContainer>
        {comments.length !== 0 ? (
          comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))
        ) : (
          <Skeleton
            height={100}
            borderRadius={5}
            highlightColor={theme.skeletonLoaderMain}
          />
        )}
        <Sentinel
          outOfRows={outOfRows}
          sentinelReached={sentinelReached}
          sentinelId={sentinelId}
        />
      </FeedContainer>
      <SideBar />
      <NewPostButton />
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  margin-bottom: 5rem;
`;

const FeedContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 60rem;

  @media (max-width: 768px) {
    width: 100vw;
  }
`;

const FormContainer = styled.div`
  border-radius: 5px;
  background-color: ${(props) => props.theme.contentBackground};
  filter: drop-shadow(2px 2px 5px ${(props) => props.theme.secondary});
  padding: 1rem;

  & form {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

const SendCommentButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
  aspect-ratio: 1 / 1;
  border: none;
  border-radius: 100%;
  color: ${(props) => props.theme.contentBackground};
  background-color: ${(props) => props.theme.secondary};

  transition: background-color 200ms ease;

  &:active {
    background-color: ${(props) => props.theme.main};
    transition: background-color 200ms ease;
  }

  & svg {
    width: 3rem;
    height: 3rem;
  }
`;
