import { useState, useEffect } from "react";

export default function useSentinel(axios, posts, setPosts) {
  const [outOfPosts, setOutOfPosts] = useState(false);
  const [sentinelReached, setSentinelReached] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;

      if (entry.isIntersecting && posts.length !== 0) {
        setSentinelReached(true);

        const startTimestamp = posts.at(-1).createdAt;
        const startId = posts.at(-1).id;
        const url = `/posts?startTimestamp=${startTimestamp}&startId=${startId}`;

        axios
          .get(url)
          .then((res) => {
            const newPosts = res.data;

            if (newPosts.length === 0) {
              setOutOfPosts(true);
              return;
            }

            setPosts([...posts, ...newPosts]);
          })
          .catch((err) => {
            console.error(err);
            if (err.response.status === 401) {
              navigate("/");
            }
          })
          .finally(() => setSentinelReached(false));
      }
    });

    const sentinel = document.getElementById("sentinel");
    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [posts, setPosts, setSentinelReached]);

  return { outOfPosts, sentinelReached };
}
