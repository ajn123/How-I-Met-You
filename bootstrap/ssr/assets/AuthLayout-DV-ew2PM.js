import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Link } from "@inertiajs/react";
import { toast } from "react-toastify";
import { useEffect } from "react";
function NavBar({ auth }) {
  const isAuth = auth == null ? void 0 : auth.user;
  return /* @__PURE__ */ jsxs("div", { className: "border-b-2 pb-5 mt-2 border-black rounded-t-md", children: [
    /* @__PURE__ */ jsx(Link, { href: "/", className: "nav-links", children: "Home" }),
    /* @__PURE__ */ jsx(Link, { href: "/about", className: "nav-links", children: "About" }),
    isAuth ? /* @__PURE__ */ jsx(Link, { href: "/logout", className: "nav-links", method: "post", children: "Logout" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(Link, { href: "/signup", className: "nav-links", children: [
        " ",
        "Sign up",
        " "
      ] }),
      /* @__PURE__ */ jsxs(Link, { href: "/login", className: "nav-links", children: [
        " ",
        "Login",
        " "
      ] })
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
