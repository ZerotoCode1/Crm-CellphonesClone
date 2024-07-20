import { BaseRoute } from "@/constants/baseRoute";
import { UserInfos } from "@/interfaces/common";
import httpServices from "@/services/httpServices";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

interface AuthenticationContextI {
  loading: boolean;
  isLogged: boolean;
  user: UserInfos;
  login: ({ userInfos, token }: { userInfos: any; token: any }) => void;
  logout: () => void;
}

const AuthenticationContext = createContext<AuthenticationContextI>({
  loading: false,
  isLogged: false,
  user: {} as any,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthenticationContext);

const AuthenticationProvider = ({ children }: { children: any }) => {
  //! State
  const [token, setToken] = useState(httpServices.getTokenStorage());
  const [user, setUser] = useState<any>(httpServices.getUserStorage());
  const [isLogging, setIsLogging] = useState(false);
  //! Function
  const login = useCallback(({ userInfos, token }: any) => {
    setIsLogging(true);
    setToken(token);
    setUser(userInfos);
    httpServices.attachTokenToHeader(token);
    httpServices.saveTokenStorage(token);
    httpServices.saveUserStorage(userInfos);
    setIsLogging(false);
  }, []);

  const logout = useCallback(() => {
    httpServices.clearStorage();
    window.sessionStorage.clear();
    window.location.href = BaseRoute.Homepage;
  }, []);

  //! Return
  const value = useMemo(() => {
    return {
      loading: isLogging,
      isLogged: !!user && !!token,
      user,
      logout,
      login,
    };
  }, [login, logout, user, token, isLogging]);

  return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>;
};

export default AuthenticationProvider;
