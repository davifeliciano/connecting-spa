import styled, { useTheme } from "styled-components";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AiOutlinePlus } from "react-icons/ai";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import PostCard from "../components/PostCard.jsx";
import SideBar from "../components/SideBar.jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useInfiniteScroll from "../hooks/useInfiniteScroll.js";
import Sentinel from "../components/Sentinel.jsx";

export default function Feed() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const [posts, setPosts] = useState([]);
  const sentinelId = "sentinel";
  const { outOfRows, sentinelReached } = useInfiniteScroll({
    sentinelId,
    axios: axiosPrivate,
    rows: posts,
    setRows: setPosts,
    path: "/posts",
  });

  useEffect(() => {
    axiosPrivate
      .get("/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.error(err);
        navigate("/login?reason=denied", {
          state: { from: location },
          replace: true,
        });
      });
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
        <Sentinel
          outOfRows={outOfRows}
          sentinelReached={sentinelReached}
          sentinelId={sentinelId}
        />
      </FeedContainer>
      <SideBar />
      <Link to="/new">
        <NewPostButton>
          <AiOutlinePlus />
        </NewPostButton>
      </Link>
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

const NewPostButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6rem;
  aspect-ratio: 1 / 1;
  border: none;
  border-radius: 100%;
  color: ${(props) => props.theme.contentBackground};
  background-color: ${(props) => props.theme.secondary};
  filter: drop-shadow(2px 2px 5px ${(props) => props.theme.secondary});

  transition: background-color 200ms ease;

  position: fixed;
  right: 5rem;
  bottom: 5rem;

  &:active {
    background-color: ${(props) => props.theme.main};
    transition: background-color 200ms ease;
  }

  & svg {
    width: 4rem;
    height: 4rem;
  }
`;
