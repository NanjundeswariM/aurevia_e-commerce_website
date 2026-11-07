import React, { createContext, useState } from "react";
import API from "../services/api";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(
        () => localStorage.getItem("aureviaToken")
    );
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("aureviaUser");
        try {
            return savedUser ? JSON.parse(savedUser) : null;
        } catch {
            return null;
        }
    });
    const saveAuth = (newToken, newUser) => {
        localStorage.setItem("aureviaToken", newToken);
        localStorage.setItem("aureviaUser", JSON.stringify(newUser));

        setToken(newToken);
        setUser(newUser);
    };
    const register = async (userData) => {
        const response = await API.post("/auth/register", userData);
        return response.data;
    };
    const login = async (email, password) => {
        const response = await API.post("/auth/login", {
            email,
            password
        });
        const { token, user } = response.data;
        saveAuth(token, user);
        return response.data;
    };
    const googleLogin = (googleToken, googleUser) => {
        saveAuth(googleToken, googleUser);
    };
    const logout = () => {
        localStorage.removeItem("aureviaToken");
        localStorage.removeItem("aureviaUser");

        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isLoggedIn: Boolean(token),
                register,
                login,
                googleLogin,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
