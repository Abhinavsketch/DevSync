import { AuthContext } from "./authContext";
import {
  getCurrentUser,
  refreshAccessToken,
  registerUser,
  loginUser,
  logoutUser,
} from "../api/authApi";
import { useState, useEffect, useRef } from "react";
import instance from "../api/axios";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const refreshPromiseRef = useRef(null);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const refreshresponse = await refreshAccessToken();
        setAccessToken(refreshresponse.accessToken);
        const userResponse = await getCurrentUser(refreshresponse.accessToken);
        setUser(userResponse.user);
      } catch (error) {
        setAccessToken(null);
        setUser(null);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    restoreSession();
  }, []);

  useEffect(() => {
    const interceptorId = instance.interceptors.request.use(
      (config) => {
        if (accessToken && !config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    return () => {
      instance.interceptors.request.eject(interceptorId);
    };
  }, [accessToken]);

  useEffect(() => {
    const interceptorId = instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const errorStatus = error?.response?.status;
        const errorConfig = error?.config;

        if (
          errorStatus === 401 &&
          errorConfig &&
          errorConfig._retry !== true &&
          errorConfig.url !== "/auth/refresh"
        ) {
          errorConfig._retry = true;
          if (refreshPromiseRef.current === null) {
            refreshPromiseRef.current = refreshAccessToken();
          }
          try {
            const response = await refreshPromiseRef.current;
            const newToken = response.accessToken;
            setAccessToken(newToken);
            errorConfig.headers.Authorization = `Bearer ${newToken}`;
            return instance(errorConfig);
          }catch(refreshError){
            setUser(null)
            setAccessToken(null)
            throw refreshError

          } finally {
            refreshPromiseRef.current = null;
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      instance.interceptors.response.eject(interceptorId);
    };
  }, []);

  const register = async (credential) => {
    setLoading(true);
    try {
      const response = await registerUser({
        name: credential.name,
        email: credential.email,
        password: credential.password,
      });

      setUser(response.user);
      setAccessToken(response.accessToken);

      return response;
    } finally {
      setLoading(false);
    }
  };

  const login = async (credential) => {
    setLoading(true);
    try {
      const response = await loginUser({
        email: credential.email,
        password: credential.password,
      });

      setUser(response.user);
      setAccessToken(response.accessToken);

      return response;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const response = await logoutUser();

      return response;
    } finally {
      setUser(null);
      setAccessToken(null);
    }
  };
  return (
    <AuthContext.Provider
      value={{ user, accessToken, loading, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
