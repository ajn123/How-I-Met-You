import { jsx, jsxs } from "react/jsx-runtime";
import { A as Auth } from "./AuthLayout-DV-ew2PM.js";
import { useForm } from "@inertiajs/react";
import "react-toastify";
import "react";
function Login({ auth }) {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: ""
  });
  function submit(e) {
    e.preventDefault();
    post("/login");
  }
  return /* @__PURE__ */ jsx(Auth, { auth, children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
    "form",
    {
      className: "flex flex-col items-center gap-3",
      onSubmit: submit,
      children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold pb-2 0", children: "Login" }),
        errors.email && /* @__PURE__ */ jsx("div", { className: "font-bold text-red-500", children: errors.email }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-row ", children: [
          /* @__PURE__ */ jsx("label", { className: "w-64", htmlFor: "email", children: "Email:" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              className: "border-2 rounded-lg p-2 self-stretch",
              type: "text",
              id: "email",
              value: data.email,
              onChange: (e) => setData("email", e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center", children: [
          /* @__PURE__ */ jsx("label", { className: "w-64", htmlFor: "password", children: "Password:" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              className: "border-2 rounded-lg p-2",
              type: "password",
              id: "password",
              name: "password",
              value: data.password,
              onChange: (e) => setData("password", e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "transition-all ease-in bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-4",
            type: "submit",
            children: "Log in"
          }
        )
      ]
    }
  ) }) });
}
export {
  Login as default
};
