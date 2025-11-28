import React, { createContext, useContext, type ReactNode } from "react";
import axios from "axios";
import type { RegisterFormInputs } from "../pages/auth/Register";

const BASE_URL = "http://localhost:5000/api/auth";

interface AuthContextType {
  registration: (data: RegisterFormInputs) => Promise<any>;
  logout: () => void;
  login: (email: string, password: string) => Promise<any>;
  user: any
}

interface User {
  email: string,
  name: string,
  userType: 'admin' | 'user' | '',
  _id: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = React.useState<User>({ email: "", name: '', userType: '', _id: '' });

  // React.useEffect(()=> {
  //   const localUser = localStorage.getItem('user');
  //   alert(JSON.stringify(localUser))
  // },[])

  const registration = async (registerData: RegisterFormInputs) => {
    try {
      const res = await axios.post(`${BASE_URL}/registration`, registerData);

      if (res?.data?.success) {

        localStorage.setItem('token', res?.data?.token);

        const userData = res?.data?.user

        setUser(userData)

        console.log('user data', userData)

        localStorage.setItem('user', JSON.stringify(userData));
      }

      return res.data;

    } catch (error) {

      console.error("Registration error:", error);
      throw error;

    }
  };

  // login
  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post(`${BASE_URL}/login`, { email, password })

      if (res?.data?.success) {

        localStorage.setItem('token', res?.data?.token);

        const userData = res?.data?.user

        setUser(userData)

        console.log('user data', userData)

        localStorage.setItem('user', JSON.stringify(userData));
      }

      return res.data;

    } catch (error) {
      console.error("login error:", error);
      throw error;
    }
  }

  // logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ registration, logout, user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

// ---- Hook ----
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
