import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { A as Auth } from "./AuthLayout-BE_wCmr5.js";
import axios from "axios";
import { useState } from "react";
import "@inertiajs/react";
function Event({ event }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center p-4 bg-white rounded-lg shadow-lg", children: [
    /* @__PURE__ */ jsx("p", { className: "text-lg", children: event.name }),
    /* @__PURE__ */ jsx("p", { className: "text-lg", children: event.description }),
    /* @__PURE__ */ jsx("p", { className: "text-lg", children: "The application is designed to be a simple demonstration of how to use Laravel and React together." })
  ] });
}
function EventList({ e }) {
  const [events, setEvents] = useState([]);
  axios.get("/api/events").then((response) => {
    setEvents(response.data);
  });
  return /* @__PURE__ */ jsx(Fragment, { children: events.map((event) => /* @__PURE__ */ jsx(Event, { event }, event.id)) });
}
function Welcome({ auth }) {
  axios.get("/api/events").then((response) => {
    console.log(response.data);
  }).catch((error) => {
    console.log(error);
  });
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
