import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export default function EventFilter({ setParams, params, eventsTotal }) {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        axios.get("/api/tags").then((response) => {
            setTags(response.data);
        });
    }, []);

    const [searchValue, getSearchValue] = useState("");
    const filter = (filter) => {
        if (filter == null) {
            setParams({});
        } else {
            setParams((prevState) => {
                // add the tags to the query
                if (filter["tags"]) {
                    let queryTerm: string = filter["tags"]?.[0];
                    if (
                        prevState["tags"]?.includes(queryTerm) &&
                        filter["tags"].includes(queryTerm)
                    ) {
                        filter["tags"] = filter["tags"]?.filter(
                            (elem) => elem !== queryTerm,
                        );
                        if (filter["tags"].length == 0) {
                            delete filter["tags"];
                        }
                    } else if (prevState["tags"] && filter["tags"]) {
                        filter["tags"] = [
                            ...filter["tags"],
                            ...prevState["tags"],
                        ];
                    }
                }

                return {
                    ...filter,
                };
            });
        }
    };

    return (
        <div className="flex flex-wrap items-center p-4 bg-white rounded-lg shadow-lg my-4 border border-amber-900">
            <input
                className={"h-12 p-2"}
                type="search"
                placeholder="Search"
                value={searchValue}
                onChange={(e) => {
                    filter({ searchName: e.target.value });
                    getSearchValue(e.target.value);
                }}
            />

            {tags.map((tag, key) => (
                <div
                    key={key}
                    onClick={() => filter({ tags: [tag.name] })}
                    className={
                        "flex p-6 mb-4 flex-initial w-32 rounded-md text-center object-center hover:bg-black text-2xl hover:text-white transition-all ease-in justify-center  border-4 mx-4 font-bold" +
                        (params["tags"]?.includes(tag.name)
                            ? " bg-black text-white"
                            : "")
                    }
                >
                    {tag.name}
                </div>
            ))}
            <div
                onClick={() => {
                    filter(null);
                    getSearchValue("");
                }}
                className={
                    "flex p-6 mb-4 flex-initial w-48 rounded-md text-center object-center hover:bg-black text-2xl hover:text-white transition-all ease-in justify-center border-4 mx-4 font-bold"
                }
            >
                Clear Filters
            </div>

            <div
                className={
                    "flex p-6 mb-4 flex-initial w-48 rounded-md text-center object-center text-2xl transition-all ease-in justify-center mx-4 font-bold"
                }
            >
                Events: {eventsTotal}
            </div>
        </div>
    );
}
