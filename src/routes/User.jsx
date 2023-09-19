import styled, { useTheme } from "styled-components";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import PostCard from "../components/PostCard.jsx";
import SideBar from "../components/SideBar.jsx";
import UserCard from "../components/UserCard.jsx";
import NewPostButton from "../components/NewPostButton.jsx";
import useInfiniteScroll from "../hooks/useInfiniteScroll.js";
import Sentinel from "../components/Sentinel.jsx";
import useAuth from "../hooks/useAuth.js";

export default function User() {
  const theme = useTheme();
  const { auth } = useAuth();
  const { username } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useState(null);
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
    if (!auth) {
      return navigate("/login?reason=denied", {
        state: { from: location },
        replace: true,
      });
    }

    const getData = async () => {
      try {
        const userPromise = axiosPrivate.get(`/users/${username}`);
        const postsPromise = axiosPrivate.get(`/posts?author=${username}`);

        const [userResponse, postsResponse] = await Promise.all([
          userPromise,
          postsPromise,
        ]);

        setUser(userResponse.data);
        setPosts(postsResponse.data);
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

  return (
    <PageContainer>
      <FeedContainer>
        {user ? (
          <UserCard user={user} setUser={setUser} />
        ) : (
          <Skeleton
            height={300}
            count={1}
            borderRadius={5}
            highlightColor={theme.skeletonLoaderMain}
          />
        )}
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
