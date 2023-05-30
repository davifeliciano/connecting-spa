import axios from "../api/axios";
import useAuth from "./useAuth";

export default function useLogout() {
  const { setAuth } = useAuth();

  const logout = async () => {
    try {
      const response = await axios.post(
        "/auth/refresh",
        {},
        {
          withCredentials: true,
        }
      );

      setAuth();
      return response;
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
}
