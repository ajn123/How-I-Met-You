import { useState } from "react";
import axios from "axios";
import Event from "./Event";

export default function EventList({ e }) {
    const [events, setEvents] = useState([]);

    axios.get("/api/events").then((response) => {
        setEvents(response.data);
    });

    return (
        <>
            {events.map((event) => (
                <Event key={event.id} event={event} />
            ))}
        </>
    );
}
