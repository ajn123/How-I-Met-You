import axios from "axios";
import { toast } from "react-toastify";

export default function EventFilter({ setEvents, filterString }) {
    const filter = (filter) => {
        console.log(`filtering ${filter}`);
        axios
            .get(`/api/events?${filter}`)
            .then((response) => {
                console.log(response.data.data);
                setEvents(response.data.data);
                setEvents((prevState) => [...response.data.data]);
                filterString.current = filter;
            })
            .catch((error) => {
                toast("There was an error getting the events.", {
                    error: true,
                });
            });
    };

    return (
        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg my-4 border border-amber-900">
            <div
                onClick={() => filter("tags=free")}
                className="text-2xl font-bold col-span-2 lg:col-span-1"
            >
                Free
            </div>
        </div>
    );
}
