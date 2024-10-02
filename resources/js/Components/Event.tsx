import Tag from "../Elements/Tag";
import { Link } from "@inertiajs/react";

export default function Event({ event }) {
    const date = new Date(event.date);

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        timeZone: "EST",
    };

    const formattedDate = date.toLocaleDateString("en-US", options);

    return (
        <Link
            href={`/events/${event.id}`}
            data={{ event: event }}
            preserveState
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 p-4 bg-white rounded-lg shadow-lg my-4 border border-amber-900 hover:bg-blue-200 transition-all ease-in">
                <p className="text-2xl font-bold col-span-2 lg:col-span-1">
                    {event.name}
                </p>
                <div className={"col-span-2 lg:col-span-1"}>
                    {event.tags.map((tag) => (
                        <Tag tag={tag} key={tag.id} />
                    ))}
                </div>
                <p className="text-lg col-span-2 font-bold">{formattedDate}</p>

                <p className="text-lg col-span-2">{event.description}</p>
            </div>
        </Link>
    );
}
