import { jsx, jsxs } from "react/jsx-runtime";
import { A as Auth } from "./AuthLayout-BmWGuR7e.js";
import "@inertiajs/react";
import "react-toastify";
import "react";
function About({ auth }) {
  return /* @__PURE__ */ jsx(Auth, { auth, children: /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center p-4 bg-white rounded-lg shadow-lg", children: /* @__PURE__ */ jsxs("p", { className: "text-lg max-w-96", children: [
    "This is an application built with love by Alex Norton. If you are interested in building community or starting your own, feel free",
    " ",
    /* @__PURE__ */ jsx(
      "a",
      {
        className: "font-bold hover:underline",
        href: "mailto:ajn123@vt.edu",
        children: "to reach out"
      }
    ),
    ". The source code can be found on GitHub."
  ] }) }) });
}
export {
  About as default
};
