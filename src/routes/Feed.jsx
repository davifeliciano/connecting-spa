import styled, { useTheme } from "styled-components";
import { useEffect, useState, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import PostCard from "../components/PostCard.jsx";
import SideBar from "../components/SideBar.jsx";
import useAuth from "../hooks/useAuth.js";
import { useLocation, useNavigate } from "react-router-dom";

export default function Feed() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [posts, setPosts] = useState([]);
  const [outOfPosts, setOutOfPosts] = useState(false);
  const [loadingMorePosts, setLoadingMorePosts] = useState(false);
  const effectRun = useRef(false);

  useEffect(() => {
    if (!auth) navigate("/login?reason=denied");

    const controller = new AbortController();

    const getPosts = async () => {
      try {
        const response = await axiosPrivate.get("/posts", {
          signal: controller.signal,
        });

        setPosts(response.data);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    effectRun.current && getPosts();

    return () => {
      effectRun.current = true;
      controller.abort();
    };
  }, []);

  return (
    <PageContainer>
      <FeedContainer>
        {posts.length !== 0 ? (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <Skeleton
            height={600}
            count={1}
            borderRadius={5}
            highlightColor={theme.skeletonLoaderMain}
          />
        )}
        <LoadMorePostsButton>
          {loadingMorePosts ? <SubmitLoader /> : "Load More Posts"}
        </LoadMorePostsButton>
      </FeedContainer>
      <SideBar />
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 5rem;
`;

const FeedContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 60rem;
`;

const LoadMorePostsButton = styled.button`
  width: 100%;
  height: 4.5rem;
  color: ${(props) => props.theme.contentBackground};
  background-color: ${(props) => props.theme.secondary};
  filter: drop-shadow(2px 2px 5px ${(props) => props.theme.secondary});
  border: none;
  border-radius: 5px;
  font-family: "Poppins", sans-serif;
  font-size: 2rem;
  transition: background-color 200ms ease;

  &:active {
    background-color: ${(props) => props.theme.main};
    transition: background-color 200ms ease;
  }

  &:disabled {
    opacity: 70%;
  }

  & svg {
    margin: auto;
  }
`;
