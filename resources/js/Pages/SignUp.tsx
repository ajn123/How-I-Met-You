import { useForm } from "@inertiajs/react";
import axios from "axios";
import AuthLayout from "../Layouts/AuthLayout";

export default function SignUp() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    function submit(e: any) {
        e.preventDefault();
        post("/signup");
    }

    return (
        <AuthLayout>
            <div>
                <form
                    className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg justify-evenly"
                    onSubmit={submit}
                >
                    <h1 className="text-2xl font-bold pb-2">Signup</h1>
                    <div className="flex flex-row items-center">
                        <label className="mr-2" htmlFor="email">
                            Name:
                        </label>
                        <input
                            className="border-2 rounded-lg p-2"
                            type="text"
                            id="email"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                    </div>
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

                    <div className="flex flex-row items-center">
                        <label className="mr-2" htmlFor="password">
                            Password Confirmation:
                        </label>
                        <input
                            className="border-2 rounded-lg p-2"
                            type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                        />
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-4"
                        type="submit"
                    >
                        Sign up
                    </button>
                </form>
            </div>
        </AuthLayout>
    );
}
