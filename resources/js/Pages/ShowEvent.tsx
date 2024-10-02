import Tag from "../Elements/Tag";

import AuthLayout from "../Layouts/AuthLayout";
export default function ({ event }) {
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
        <AuthLayout>
            <div className={"grid grid-cols-2"}>
                <p className="text-2xl font-bold col-span-1 ">{event.name}</p>
                <a
                    href={event.url}
                    target={"_blank"}
                    className="md:col-span-1 col-span-2 m-1 my-2 p-2 shadow-md border-2 border-black rounded-md bg-blue-300 hover:bg-blue-700 hover:text-white transition-all ease-in text-lg font-bold"
                >
                    Website
                </a>
                <div
                    className={
                        "col-span-2 origin-left py-2 lg:py-0 lg:col-span-1"
                    }
                >
                    {event.tags.map((tag) => (
                        <Tag tag={tag} key={tag.id} />
                    ))}
                </div>
                <p className="text-lg col-span-2 font-bold">{formattedDate}</p>

                <p className="text-lg col-span-2">{event.description}</p>
            </div>
        </AuthLayout>
    );
}
