import { Link, useForm } from "@inertiajs/react";
import axios from "axios";
import SignOut from "./SignOut";
import SignUp from "../Pages/SignUp";
import Login from "../Pages/Login";

export default function NavBar({ auth }) {
    const isAuth = auth?.user;
    return (
        <div className="nav justify-items-start gap-1 p-2">
            <Link href="/about" className="mr-2">
                About
            </Link>
            {isAuth ? (
                <Link href="/logout" method="post" as="button">
                    Logout
                </Link>
            ) : (
                <>
                    <Link href="/signup"> Sign up </Link>

                    <Link href="/login"> Login </Link>
                </>
            )}
        </div>
    );
}
