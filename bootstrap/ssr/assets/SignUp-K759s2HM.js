import { jsx, jsxs } from "react/jsx-runtime";
import { useForm } from "@inertiajs/react";
import { A as Auth } from "./AuthLayout-BmbOURQs.js";
function SignUp() {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  function submit(e) {
    e.preventDefault();
    post("/signup");
  }
  return /* @__PURE__ */ jsx(Auth, { children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
    "form",
    {
      className: "flex flex-col items-center p-4 bg-white rounded-lg shadow-lg justify-evenly",
      onSubmit: submit,
      children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold pb-2", children: "Signup" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center", children: [
          /* @__PURE__ */ jsx("label", { className: "mr-2", htmlFor: "email", children: "Name:" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              className: "border-2 rounded-lg p-2",
              type: "text",
              id: "email",
              value: data.name,
              onChange: (e) => setData("name", e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center", children: [
          /* @__PURE__ */ jsx("label", { className: "mr-2", htmlFor: "email", children: "Email:" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              className: "border-2 rounded-lg p-2",
              type: "text",
              id: "email",
              value: data.email,
              onChange: (e) => setData("email", e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center", children: [
          /* @__PURE__ */ jsx("label", { className: "mr-2", htmlFor: "password", children: "Password:" }),
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
        /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center", children: [
          /* @__PURE__ */ jsx("label", { className: "mr-2", htmlFor: "password", children: "Password Confirmation:" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              className: "border-2 rounded-lg p-2",
              type: "password",
              id: "password_confirmation",
              name: "password_confirmation",
              value: data.password_confirmation,
              onChange: (e) => setData("password_confirmation", e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-4",
            type: "submit",
            children: "Sign up"
          }
        )
      ]
    }
  ) }) });
}
export {
  SignUp as default
};
