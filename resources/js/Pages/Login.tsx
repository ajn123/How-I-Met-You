import axios from "axios";
import AuthLayout from "../Layouts/AuthLayout";
import { toast } from "react-toastify";

import { usePage, useForm, router } from "@inertiajs/react";
export default function Login({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });

    function submit(e: any) {
        e.preventDefault();
        post("/login");
    }

    return (
        <AuthLayout auth={auth}>
            <div>
                <form
                    className="flex flex-col items-center gap-3"
                    onSubmit={submit}
                >
                    <h1 className="text-2xl font-bold pb-2 0">Login</h1>
                    {errors.email && (
                        <div className={"font-bold text-red-500"}>
                            {errors.email}
                        </div>
                    )}
                    <div className="flex flex-row ">
                        <label className="w-64" htmlFor="email">
                            Email:
                        </label>
                        <input
                            className="border-2 rounded-lg p-2 self-stretch"
                            type="text"
                            id="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                    </div>
                    <div className="flex flex-row items-center">
                        <label className="w-64" htmlFor="password">
                            Password:
                        </label>
                        <input
                            className="border-2 rounded-lg p-2"
                            type="password"
                            id="password"
                            name="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                    </div>
                    <button
                        className="transition-all ease-in bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-4"
                        type="submit"
                    >
                        Log in
                    </button>
                </form>
            </div>
        </AuthLayout>
    );
}
