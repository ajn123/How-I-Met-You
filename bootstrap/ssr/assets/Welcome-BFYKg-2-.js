import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { A as Auth } from "./AuthLayout-BMSTr6NK.js";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "@inertiajs/react";
function Event({ event }) {
  return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 p-4 bg-white rounded-lg shadow-lg my-4 border border-amber-900", children: [
    /* @__PURE__ */ jsx("p", { className: "text-lg font-bold left-0", children: event.name }),
    /* @__PURE__ */ jsx("p", { className: "text-lg font-bold right-0", children: event.date }),
    /* @__PURE__ */ jsx("p", { className: "text-lg col-span-2", children: event.description })
  ] });
}
function EventList({}) {
  const [events, setEvents] = useState([]);
  const page = useRef(1);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log("Component is scrolled into view");
          getMoreEvents();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);
  const getMoreEvents = () => {
    axios.get(`/api/events?page=${page.current}`).then((response) => {
      setEvents((prevState) => [...prevState, ...response.data.data]);
    }).catch((error) => {
      console.log(error);
    });
    console.log(page.current);
    page.current++;
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    events.length > 0 && events.map((event, id) => /* @__PURE__ */ jsx(Event, { event }, id)),
    /* @__PURE__ */ jsx("div", { ref })
  ] });
}
function Welcome({ auth, message }) {
  useEffect(() => {
    if (message) {
      toast(message);
    }
  }, []);
  return /* @__PURE__ */ jsxs(Auth, { auth, children: [
    /* @__PURE__ */ jsxs("div", { className: " h-screen bg-cyan-500 flex flex-col justify-center items-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-6xl font-bold", children: "Welcome to Laravel React" }),
      /* @__PURE__ */ jsx("p", { className: "text-2xl", children: "This is a demo application." }),
      /* @__PURE__ */ jsx("p", { className: "text-2xl", children: "It uses the React Router for client-side routing and the Laravel Sanctum package for authentication." })
    ] }),
    /* @__PURE__ */ jsx("div", { children: (auth == null ? void 0 : auth.user) && /* @__PURE__ */ jsx(EventList, {}) })
  ] });
}
export {
  Welcome as default
};
