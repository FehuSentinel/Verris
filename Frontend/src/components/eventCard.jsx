export default function EventCard({ event }) {
    return (
        <div className="card mb-3 event-card">
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={event.image || "default-image.jpg"} className="img-fluid rounded-start" alt={event.title} />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{event.title}</h5>
                        <p className="card-text">{event.description}</p>
                        <p className="card-text"><small className="text-body-secondary">📅 {event.date}</small></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
