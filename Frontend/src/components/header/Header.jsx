import { useContext } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Importamos useNavigate
import AuthContext from "../../context/AuthContext";
import "./Header.css"; 

export default function Header() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate(); // ✅ Usamos navigate para cambiar de ruta

    const handleLogout = () => {
        logout();
        navigate("/home"); // ✅ Redirigir al Home después de cerrar sesión
    };

    return (
        <nav className="navbar fixed-top px-3 custom-navbar">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                
                {/* 🏷 Título (izquierda) */}
                <h2 className="navbar-brand m-0" onClick={() => navigate("/home")}>Eventos</h2>

                {/* 📌 Botón de Menú Offcanvas */}
                {user ? (
                    <button 
                        className="menu-btn btn btn-outline-secondary"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar"
                        aria-controls="offcanvasNavbar"
                    >
                        {user.username}
                    </button>
                ) : (
                    <div className="d-flex">
                        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => navigate("/home")}>Home</button>
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => navigate("/login")}>Iniciar Sesión</button>
                    </div>
                )}

                {/* 🛠 Offcanvas Menú */}
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title">{user ? user.username : "Menú"}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>

                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item">
                                <button className="btn btn-outline-primary w-100" data-bs-dismiss="offcanvas" onClick={() => navigate("/home")}>Home</button>
                            </li>

                            {!user ? (
                                <li className="nav-item">
                                    <button className="btn btn-outline-secondary w-100" data-bs-dismiss="offcanvas" onClick={() => navigate("/login")}>Iniciar Sesión</button>
                                </li>
                            ) : (
                                <>
                                    <li className="nav-item"><button className="btn dropdown-item w-100" data-bs-dismiss="offcanvas" onClick={() => navigate("/perfil")}>Perfil</button></li>
                                    <li className="nav-item"><button className="btn dropdown-item w-100" data-bs-dismiss="offcanvas" onClick={() => navigate("/dashboard")}>Dashboard</button></li>
                                    <li className="nav-item"><button className="btn dropdown-item text-danger w-100" data-bs-dismiss="offcanvas" onClick={handleLogout}>Cerrar Sesión</button></li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}
