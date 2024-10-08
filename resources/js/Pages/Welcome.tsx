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
            <div className="h-96 bg-cyan-200 flex flex-col justify-center items-center rounded-b-md shadow-2xl">
                <h1 className="text-6xl font-bold">Find Events</h1>
                <p className="text-2xl mx-4 text-center">
                    Scroll down to see upcoming events or use the search bar.
                </p>
            </div>
            <div>{<EventList />}</div>
        </AuthLayout>
    );
}
