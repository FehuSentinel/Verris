import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { getPublicEvents, getFollowingEvents } from "../api/api";
import EventCard from "../components/EventCard"; // Importar el componente de tarjeta de eventos
import "./Home.css"; // Importar los estilos

export default function Home() {
    const { user } = useContext(AuthContext);
    const [publicEvents, setPublicEvents] = useState([]);
    const [followingEvents, setFollowingEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchEvents() {
            try {
                setLoading(true);
                setError(null);

                console.log("📡 Cargando eventos públicos...");
                const publicData = await getPublicEvents();
                setPublicEvents(publicData);
                console.log("✅ Eventos públicos cargados:", publicData);

                if (user?.id) {
                    console.log(`📡 Cargando eventos privados para el usuario ${user.id}...`);
                    const followingData = await getFollowingEvents(user.id);
                    setFollowingEvents(followingData);
                    console.log("✅ Eventos privados cargados:", followingData);
                }
            } catch (err) {
                console.error("❌ Error al cargar eventos:", err);
                setError(err.message || "Error desconocido.");
            } finally {
                setLoading(false);
            }
        }

        fetchEvents();
    }, [user]);

    return (
        <div className="home-container">
            <header className="home-header">
                <div>
                    <h1>Eventos Disponibles</h1>
                    <p>Descubre y únete a los mejores eventos cerca de ti.</p>
                </div>
            </header>

            {loading ? (
                <h2 className="loading-text">Cargando eventos...</h2>
            ) : error ? (
                <h2 className="error-text">Error: {error}</h2>
            ) : (
                <>
                    {/* Eventos Públicos */}
                    <section className="events-section">
                        <h2>Eventos Públicos</h2>
                        <div className="events-grid">
                            {publicEvents.length > 0 ? (
                                publicEvents.map(event => <EventCard key={event.id} event={event} />)
                            ) : (
                                <p>No hay eventos públicos disponibles.</p>
                            )}
                        </div>
                    </section>

                    {/* Eventos de Usuarios Seguidos */}
                    {user?.id && (
                        <section className="events-section">
                            <h2>Eventos de Usuarios que Sigues</h2>
                            <div className="events-grid">
                                {followingEvents.length > 0 ? (
                                    followingEvents.map(event => <EventCard key={event.id} event={event} />)
                                ) : (
                                    <p>No hay eventos de usuarios que sigues.</p>
                                )}
                            </div>
                        </section>
                    )}
                </>
            )}
        </div>
    );
}
