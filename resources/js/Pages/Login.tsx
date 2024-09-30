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
        post("login");

        router.post("/login", data);
    }

    return (
        <AuthLayout auth={auth}>
            <div>
                <form
                    className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg justify-evenly"
                    onSubmit={submit}
                >
                    <h1 className="text-2xl font-bold pb-2">Login</h1>
                    {errors.email && <div>{errors.email}</div>}
                    <div className="flex flex-row items-center">
                        <label className="mr-2" htmlFor="email">
                            Email:
                        </label>
                        <input
                            className="border-2 rounded-lg p-2"
                            type="text"
                            id="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                    </div>
                    <div className="flex flex-row items-center">
                        <label className="mr-2" htmlFor="password">
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
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-4"
                        type="submit"
                    >
                        Log in
                    </button>
                </form>
            </div>
        </AuthLayout>
    );
}
