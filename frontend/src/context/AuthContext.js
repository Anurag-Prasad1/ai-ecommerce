import {
  createContext,
  useEffect,
  useState,
} from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [userInfo, setUserInfo] = useState(() => {
    const savedUser =
      localStorage.getItem("userInfo");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  useEffect(() => {
    localStorage.setItem(
      "userInfo",
      JSON.stringify(userInfo)
    );
  }, [userInfo]);

  const logout = () => {
    setUserInfo(null);
    localStorage.removeItem("userInfo");
  };

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        setUserInfo,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;