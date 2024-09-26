import { Head } from "@inertiajs/react";
import NavBar from "../Components/NavBar";
import AuthLayout from "../Layouts/AuthLayout";
import axios from "axios";
import EventList from "../Components/EventList";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useRef } from "react";

export default function Welcome({ auth, flash }) {
    return (
        <AuthLayout auth={auth} flash={flash}>
            <div className=" h-screen bg-cyan-500 flex flex-col justify-center items-center">
                <h1 className="text-6xl font-bold">Welcome to Laravel React</h1>
                <p className="text-2xl">This is a demo application.</p>
                <p className="text-2xl">
                    It uses the React Router for client-side routing and the
                    Laravel Sanctum package for authentication.
                </p>
            </div>
            <div>{auth?.user && <EventList />}</div>
        </AuthLayout>
    );
}
