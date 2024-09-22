import { jsx, jsxs } from "react/jsx-runtime";
import { A as Auth } from "./AuthLayout-BmbOURQs.js";
function About() {
  return /* @__PURE__ */ jsx(Auth, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center p-4 bg-white rounded-lg shadow-lg", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: "About" }),
    /* @__PURE__ */ jsx("p", { className: "text-lg", children: "This is a demo application built with Laravel and React." }),
    /* @__PURE__ */ jsx("p", { className: "text-lg", children: "It uses the React Router for client-side routing and the Laravel Sanctum package for authentication." }),
    /* @__PURE__ */ jsx("p", { className: "text-lg", children: "The application is designed to be a simple demonstration of how to use Laravel and React together." })
  ] }) });
}
export {
  About as default
};
