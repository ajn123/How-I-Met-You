import { jsx, jsxs } from "react/jsx-runtime";
function NavBar({ auth }) {
  auth.user;
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "nav justify-items-start gap-1 p-2", children: /* @__PURE__ */ jsx("a", { className: "mr-2", href: "/about", children: "About" }) }) });
}
function Auth({
  auth,
  children
}) {
  return /* @__PURE__ */ jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsx(NavBar, { auth }),
    /* @__PURE__ */ jsx("div", { children })
  ] });
}
export {
  Auth as A
};
