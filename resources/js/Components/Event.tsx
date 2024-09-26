import Tag from "../Elements/Tag";

export default function Event({ event }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 p-4 bg-white rounded-lg shadow-lg my-4 border border-amber-900">
            <p className="text-lg font-bold left-0">{event.name}</p>
            <div className={"col-span-2"}>
                {event.tags.map((tag) => (
                    <Tag tag={tag} key={tag.id} />
                ))}
            </div>
            <p className="text-lg font-bold right-0">{event.date}</p>
            <p className="text-lg lg:col-span-2">{event.description}</p>
        </div>
    );
}
