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
    if (userInfo) {
      localStorage.setItem(
        "userInfo",
        JSON.stringify(userInfo)
      );
    } else {
      localStorage.removeItem(
        "userInfo"
      );
    }
  }, [userInfo]);

  const logout = () => {
    setUserInfo(null);

    localStorage.removeItem(
      "userInfo"
    );

    // Cleanup old cart data
    localStorage.removeItem(
      "cartItems"
    );

    localStorage.removeItem(
      "shippingAddress"
    );
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