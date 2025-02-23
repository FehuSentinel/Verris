import { createContext, useState } from "react";

const API_URL = "http://localhost:5100/api/usuarios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    // 🔹 Registrar Usuario
    const register = async (userData) => {
        try {
            setError(null);
            const response = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error al registrar usuario");
            }

            const data = await response.json();
            setUser(data);
            localStorage.setItem("token", data.token);
        } catch (error) {
            console.error("Error al registrar:", error.message);
            setError(error.message);
        }
    };

    // 🔹 Iniciar Sesión
    const login = async ({ usernameOrEmail, password }) => {
        try {
            setError(null);
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: usernameOrEmail.includes("@") ? usernameOrEmail : undefined,
                    username: !usernameOrEmail.includes("@") ? usernameOrEmail : undefined,
                    password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error al iniciar sesión");
            }

            const data = await response.json();
            setUser(data.usuario);
            localStorage.setItem("token", data.token);
        } catch (error) {
            console.error("Error al iniciar sesión:", error.message);
            setError(error.message);
        }
    };

    // 🔹 Cerrar Sesión
    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

