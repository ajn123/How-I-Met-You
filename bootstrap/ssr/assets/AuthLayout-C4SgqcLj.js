import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Link } from "@inertiajs/react";
import { toast } from "react-toastify";
import { useEffect } from "react";
function NavBar({ auth }) {
  const isAuth = auth == null ? void 0 : auth.user;
  return /* @__PURE__ */ jsxs("div", { className: "nav justify-items-start gap-1 p-2 bg-gray-200 rounded-t-md", children: [
    /* @__PURE__ */ jsx(Link, { href: "/", className: "mr-2", children: "Home" }),
    /* @__PURE__ */ jsx(Link, { href: "/about", className: "mr-2", children: "About" }),
    isAuth ? /* @__PURE__ */ jsx(Link, { href: "/logout", method: "post", as: "button", children: "Logout" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Link, { href: "/signup", children: " Sign up " }),
      /* @__PURE__ */ jsx(Link, { href: "/login", children: " Login " })
    ] })
  ] });
}
function Auth({
  auth,
  children,
  flash
}) {
  useEffect(() => {
    if (flash == null ? void 0 : flash.message) {
      toast(flash.message, { type: "success" });
    }
  }, [flash]);
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-4", children: [
    /* @__PURE__ */ jsx(NavBar, { auth }),
    /* @__PURE__ */ jsx("div", { id: "content", children })
  ] });
}
export {
  Auth as A
};
