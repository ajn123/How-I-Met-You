import { useEffect, useState } from "react";

export default function Tag({ tag }) {
    let [color, setColor] = useState("red");

    useEffect(() => {
        let x = Math.floor(Math.random() * 3);
        console.log(x);
        if (x === 0) {
            setColor("red");
        } else if (x === 1) {
            setColor("blue");
        } else if (x === 2) {
            setColor("green");
        } else {
            setColor("yellow");
        }
    }, []);

    console.log(color);
    return (
        <>
            <button
                className={`py-2 my-2 px-4 text-black shadow-md no-underline rounded-full bg-${color}-300 font-sans font-semibold text-sm border-${color} btn-primary hover:text-white hover:bg-${color}-600 transition-all ease-in focus:outline-none active:shadow-none mr-2`}
            >
                {tag.name}
            </button>
        </>
    );
}
