import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Event from "./Event";
import { router } from "@inertiajs/react";
import { toast } from "react-toastify";
import EventFilter from "./EventFilter";

export default function EventList({}) {
    const [events, setEvents] = useState([]);

    const [params, setParams] = useState({});
    const [eventTotal, setEventTotal] = useState(0);

    const page = useRef(1);

    const ref = useRef(null);
    const maxPages = useRef(Number.POSITIVE_INFINITY);

    const filterString = useRef("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    getMoreEvents(true);
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
    }, [ref, params]);

    useEffect(() => {
        getMoreEvents(false);
    }, [params]);

    const getMoreEvents = (getMore = true) => {
        if (!getMore) {
            page.current = 1;
        }
        if (page.current > maxPages.current) {
            toast("No more events.", { error: true });
            return;
        }

        const finalParams = {
            ...params,
            page: page.current,
        };

        console.log(`finalParams: ${JSON.stringify(finalParams)}`);
        const urlSearchParams = new URLSearchParams(finalParams);

        console.log(`/api/events?${urlSearchParams.toString()}`);
        axios
            .get(`/api/events?${urlSearchParams.toString()}`)
            .then((response) => {
                maxPages.current = response.data.last_page;
                if (!getMore) {
                    setEvents(response.data.data);
                    setEventTotal(response.data.total);
                } else {
                    setEvents((prevState) => [
                        ...prevState,
                        ...response.data.data,
                    ]);
                }
            });
        page.current++;
    };

    return (
        <>
            <EventFilter
                setParams={setParams}
                params={params}
                eventsTotal={eventTotal}
            />
            {events.length > 0 &&
                events.map((event, id) => <Event key={id} event={event} />)}

            <div ref={ref}></div>
        </>
    );
}
