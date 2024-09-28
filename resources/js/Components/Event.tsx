import Tag from "../Elements/Tag";

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
        <div className="grid grid-cols-1 lg:grid-cols-2 p-4 bg-white rounded-lg shadow-lg my-4 border border-amber-900">
            <p className="text-2xl font-bold col-span-2 lg:col-span-1">
                {event.name}
                <a
                    href={event.url}
                    target={"_blank"}
                    className="ml-2 my-2 p-2 shadow-lg rounded-md bg-blue-300 hover:bg-blue-700 hover:text-white transition-all ease-in text-lg font-bold"
                >
                    Website
                </a>
            </p>
            <div className={"col-span-2 lg:col-span-1"}>
                {event.tags.map((tag) => (
                    <Tag tag={tag} key={tag.id} />
                ))}
            </div>
            <p className="text-lg col-span-2 font-bold">{formattedDate}</p>

            <p className="text-lg col-span-2">{event.description}</p>
        </div>
    );
}
