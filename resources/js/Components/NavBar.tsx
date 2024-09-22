import { useForm } from "@inertiajs/react";
import axios from "axios";
import SignOut from "./SignOut";
import SignUp from "../Pages/SignUp";
import Login from "../Pages/Login";

export default function NavBar({ auth }) {
    const isAuth = auth.user;
    return (
        <div>
            <div className="nav justify-items-start gap-1 p-2">
                <a className="mr-2" href="/about">
                    About
                </a>
                {isAuth ? (
                    <SignOut />
                ) : (
                    <>
                        <a className="mr-2" href="/signup">
                            Signup
                        </a>
                        <a className="mr-2" href="/login">
                            Login
                        </a>
                    </>
                )}
            </div>
        </div>
    );
}
