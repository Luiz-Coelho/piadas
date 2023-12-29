import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "./useAuth";

import { jwtDecode } from "jwt-decode";

import Cookies from "js-cookie";

export const useLogin = () => {
  const { dispatch } = useAuth();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      "https://piadas-backend.onrender.com/api/login",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      const token = json.token;
      Cookies.set("user", token, { expires: 3 });
      const decodedToken = jwtDecode(token);
      const { user } = decodedToken;
      dispatch({ type: "LOGIN", payload: user });
      setIsLoading(false);
      navigate(from, { replace: true });
    }
  };

  return { login, isLoading, error };
};
