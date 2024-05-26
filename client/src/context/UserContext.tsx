/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";
import { authorizedApi, unauthorizedApi } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { User } from "../utils/types/user";

export interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: () => void;
  logout: () => void;
  login: (values: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => Promise<void>;
}

export const UserContext = createContext<UserContextProps | undefined>(
  undefined
);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const isTokenExpired = (timestamp: number) => {
    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    return now - timestamp > twentyFourHours;
  };

  const refreshAccessToken = async () => {
    setLoading(true);
    try {
      const refreshToken = Cookies.get("refreshToken");
      const response = await authorizedApi.post("/auth/refresh-token", {
        token: refreshToken,
      });
      const { accessToken } = response.data;
      Cookies.set("accessToken", accessToken, { expires: 1 });
      Cookies.set("tokenTimestamp", Date.now().toString(), { expires: 1 });
      setLoading(false);
      return accessToken;
    } catch (error) {
      console.error("Failed to refresh access token:", error);
      setLoading(false);
      return null;
    }
  };

  // Initialize authentication
  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = Cookies.get("user");
      const storedAccessToken = Cookies.get("accessToken");
      const tokenTimestamp = Cookies.get("tokenTimestamp");

      if (storedUser && storedAccessToken) {
        if (tokenTimestamp && isTokenExpired(Number(tokenTimestamp))) {
          const newAccessToken = await refreshAccessToken();
          if (!newAccessToken) {
            navigate("/auth/login");
          } else {
            setUser(JSON.parse(storedUser));
          }
        } else {
          setUser(JSON.parse(storedUser));
        }
      }
      setLoading(false);
    };
    initializeAuth();
  }, [navigate]);

  const updateUser = async () => {
    try {
      const response = await authorizedApi.get("/user/me");
      const fetchedUser = response.data as User;
      setUser(fetchedUser);
      Cookies.set("user", JSON.stringify(fetchedUser), { expires: 1 });
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const login = async (values: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => {
    try {
      const response = await unauthorizedApi.post("/auth/login", {
        email: values.email,
        password: values.password,
      });
      Cookies.set("accessToken", response.data.accessToken, {
        expires: values.rememberMe ? 365 : 1,
      });
      Cookies.set("refreshToken", response.data.refreshToken, {
        expires: values.rememberMe ? 365 : 1,
      });
      Cookies.set("user", JSON.stringify(response.data.user), {
        expires: values.rememberMe ? 365 : 1,
      });
      setUser(response.data.user);
      navigate("/");
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error, {
          transition: Bounce,
        });
      } else {
        toast.error("Error while logging in!", {
          transition: Bounce,
        });
      }
      console.log("Error", error);
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("user");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("tokenTimestamp");
    navigate("/auth/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
      </div>
    );
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        updateUser,
        logout,
        login,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
