import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Usa useNavigate en lugar de setSection
import AuthContext from "../context/AuthContext";
import "./Login.css"; 

export default function Login() {
    const { register, login, error, user } = useContext(AuthContext);
    const navigate = useNavigate(); // ✅ Usamos navigate para redirigir al Home
    const [isRegistering, setIsRegistering] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        nombre: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let success = false;

        if (isRegistering) {
            console.log("📤 Enviando datos de registro:", formData);
            success = await register(formData);
        } else {
            console.log("📤 Enviando datos de login:", formData);
            success = await login({ usernameOrEmail: formData.username, password: formData.password });
        }

        if (success) {
            console.log("✅ Usuario autenticado:", user);
        }
    };

    // ✅ Redirigir automáticamente si `user` está definido
    useEffect(() => {
        if (user) {
            navigate("/home"); // Redirigir al Home si el usuario está autenticado
        }
    }, [user, navigate]);

    return (
        <div className="login-container">
            <h2>{isRegistering ? "Crear Cuenta" : "Iniciar Sesión"}</h2>

            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit}>
                {!isRegistering ? (
                    <>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username o Email"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </>
                ) : (
                    <>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre Completo"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </>
                )}

                <button type="submit" className="btn btn-primary">
                    {isRegistering ? "Registrar" : "Iniciar Sesión"}
                </button>
            </form>

            <button className="btn btn-secondary" onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? "¿Ya tienes cuenta? Inicia Sesión" : "¿No tienes cuenta? Regístrate"}
            </button>
        </div>
    );
}
