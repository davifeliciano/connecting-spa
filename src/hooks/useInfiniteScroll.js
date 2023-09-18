import { useState, useEffect } from "react";

function buildQueryParams(queryParamsObj) {
  if (!queryParamsObj) {
    return "";
  }

  const pairs = [];
  Object.entries(queryParamsObj).forEach((pair) => pairs.push(pair.join("=")));
  return pairs.join("&").concat("&");
}

export default function useInfiniteScroll({
  axios,
  rows,
  setRows,
  path,
  queryParams,
  sentinelId,
}) {
  const [outOfRows, setOutOfRows] = useState(false);
  const [sentinelReached, setSentinelReached] = useState(false);
  const queryParamsString = buildQueryParams(queryParams);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;

      if (entry.isIntersecting && rows.length !== 0) {
        setSentinelReached(true);

        const startTimestamp = rows.at(-1).createdAt;
        const startId = rows.at(-1).id;
        const url = `${path}?${queryParamsString}startTimestamp=${startTimestamp}&startId=${startId}`;

        axios
          .get(url)
          .then((res) => {
            const newPosts = res.data;

            if (newPosts.length === 0) {
              setOutOfRows(true);
              return;
            }

            setRows([...rows, ...newPosts]);
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

    const sentinel = document.getElementById(sentinelId);
    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [rows, setRows, setSentinelReached]);

  return { outOfPosts: outOfRows, sentinelReached };
}
