import Cookies from "js-cookie";
import useAuth from "./useAuth";

export const useLogout = () => {
  const { dispatch } = useAuth();

  const logout = () => {
    Cookies.remove("user");
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
