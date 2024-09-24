import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Event from "./Event";
import { router } from "@inertiajs/react";

export default function EventList({}) {
    const [events, setEvents] = useState([]);

    const page = useRef(1);

    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    console.log("Component is scrolled into view");
                    getMoreEvents();
                }
            },
            { threshold: 0.1 },
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref]);

    const getMoreEvents = () => {
        axios
            .get(`/api/events?page=${page.current}`)
            .then((response) => {
                setEvents((prevState) => [...prevState, ...response.data.data]);
            })
            .catch((error) => {
                console.log(error);
            });
        console.log(page.current);
        page.current++;
    };

    return (
        <>
            {events.length > 0 &&
                events.map((event, id) => <Event key={id} event={event} />)}

            <div ref={ref}></div>
            {/*<button*/}
            {/*    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"*/}
            {/*    onClick={getMoreEvents}*/}
            {/*>*/}
            {/*    Load More*/}
            {/*</button>*/}
        </>
    );
}
