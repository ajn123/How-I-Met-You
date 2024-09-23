import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Link } from "@inertiajs/react";
function NavBar({ auth }) {
  const isAuth = auth == null ? void 0 : auth.user;
  return /* @__PURE__ */ jsxs("div", { className: "nav justify-items-start gap-1 p-2", children: [
    /* @__PURE__ */ jsx(Link, { href: "/about", className: "mr-2", children: "About" }),
    isAuth ? /* @__PURE__ */ jsx(Link, { href: "/logout", method: "post", as: "button", children: "Logout" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Link, { href: "/signup", children: " Sign up " }),
      /* @__PURE__ */ jsx(Link, { href: "/login", children: " Login " })
    ] })
  ] });
}
function Auth({
  auth,
  children
}) {
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-4", id: "below", children: [
    /* @__PURE__ */ jsx(NavBar, { auth }),
    /* @__PURE__ */ jsx("div", { id: "content", children })
  ] });
}
export {
  Auth as A
};
