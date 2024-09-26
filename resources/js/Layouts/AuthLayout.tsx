import NavBar from "../Components/NavBar";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function Auth({
    auth,
    children,
    flash,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        if (flash?.message) {
            toast(flash.message, { type: "success" });
        }
    }, [flash]);

    return (
        <div className={"container mx-auto p-4"}>
            <NavBar auth={auth} />
            <div id={"content"}>{children}</div>
        </div>
    );
}
