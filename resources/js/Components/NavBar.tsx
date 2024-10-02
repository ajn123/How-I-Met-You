import { Link, useForm } from "@inertiajs/react";
import axios from "axios";
import SignOut from "./SignOut";
import SignUp from "../Pages/SignUp";
import Login from "../Pages/Login";

export default function NavBar({ auth }) {
    const isAuth = auth?.user;
    return (
        <div className="border-b-2 pb-5 mb-4 mt-2 border-black rounded-t-md">
            <Link href="/" className="nav-links">
                Events
            </Link>
            <Link href="/about" className="nav-links">
                About
            </Link>
        </div>
    );
}
