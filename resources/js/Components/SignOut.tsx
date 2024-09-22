import { useForm } from "@inertiajs/react";
import axios from "axios";

function SignOut() {
    const { data, setData, post, processing, errors } = useForm({});

    let logout = (e) => {
        e.preventDefault();
        post("/logout");
    };

    return (
        <a href="#" className="mr-2" onClick={(e) => logout(e)}>
            Log Out
        </a>
    );
}

export default SignOut;
