import { createContext, useState, useEffect, useReducer } from "react";

import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import Loading from "../components/Loading";

const AuthContext = createContext({});

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get("user");

      if (token) {
        const decodedToken = jwtDecode(token);
        const { user } = decodedToken;
        dispatch({ type: "LOGIN", payload: user });
        setIsChecking(false);
      } else {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  if (isChecking) {
    return <Loading />;
  }

  console.log("AuthContext state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
