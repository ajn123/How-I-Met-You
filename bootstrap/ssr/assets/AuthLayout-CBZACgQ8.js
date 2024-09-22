import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useForm } from "@inertiajs/react";
function SignOut() {
  const { data, setData, post, processing, errors } = useForm({});
  let logout = (e) => {
    e.preventDefault();
    post("/logout");
  };
  return /* @__PURE__ */ jsx("a", { href: "#", className: "mr-2", onClick: (e) => logout(e), children: "Log Out" });
}
function NavBar({ auth }) {
  const isAuth = auth.user;
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "nav justify-items-start gap-1 p-2", children: [
    /* @__PURE__ */ jsx("a", { className: "mr-2", href: "/about", children: "About" }),
    isAuth ? /* @__PURE__ */ jsx(SignOut, {}) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("a", { className: "mr-2", href: "/signup", children: "Signup" }),
      /* @__PURE__ */ jsx("a", { className: "mr-2", href: "/login", children: "Login" })
    ] })
  ] }) });
}
function Auth({
  auth,
  children
}) {
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto p-4", children: [
    /* @__PURE__ */ jsx(NavBar, { auth }),
    /* @__PURE__ */ jsx("div", { children })
  ] });
}
export {
  Auth as A
};
