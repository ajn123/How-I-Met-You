import { jsx, jsxs } from "react/jsx-runtime";
import { A as Auth } from "./AuthLayout-BSPYXXPh.js";
import "@inertiajs/react";
function Welcome({ auth }) {
  return /* @__PURE__ */ jsx(Auth, { auth, children: /* @__PURE__ */ jsxs("div", { className: " h-screen bg-cyan-500 flex flex-col justify-center items-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-6xl font-bold", children: "Welcome to Laravel React" }),
    /* @__PURE__ */ jsx("p", { className: "text-2xl", children: "This is a demo application." }),
    /* @__PURE__ */ jsx("p", { className: "text-2xl", children: "It uses the React Router for client-side routing and the Laravel Sanctum package for authentication." })
  ] }) });
}
export {
  Welcome as default
};
