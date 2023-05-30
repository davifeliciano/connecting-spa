import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await axios.post(
        "/auth/refresh",
        {},
        {
          withCredentials: true,
        }
      );

      setAuth((prev) => {
        return { ...prev, token: response.data.token };
      });

      return response.data.token;
    } catch (err) {
      setAuth();
    }
  };

  return refresh;
};

export default useRefreshToken;
