import { jsx, jsxs } from "react/jsx-runtime";
import { T as Tag } from "./Tag-CfkiokOz.js";
import { A as Auth } from "./AuthLayout-BmWGuR7e.js";
import "react";
import "@inertiajs/react";
import "react-toastify";
function ShowEvent({ event }) {
  const date = new Date(event.date);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    timeZone: "EST"
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return /* @__PURE__ */ jsx(Auth, { children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2", children: [
    /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold col-span-1 ", children: event.name }),
    /* @__PURE__ */ jsx(
      "a",
      {
        href: event.url,
        target: "_blank",
        className: "md:col-span-1 col-span-2 m-1 my-2 p-2 shadow-md border-2 border-black rounded-md bg-blue-300 hover:bg-blue-700 hover:text-white transition-all ease-in text-lg font-bold",
        children: "Website"
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "col-span-2 origin-left py-2 lg:py-0 lg:col-span-1",
        children: event.tags.map((tag) => /* @__PURE__ */ jsx(Tag, { tag }, tag.id))
      }
    ),
    /* @__PURE__ */ jsx("p", { className: "text-lg col-span-2 font-bold", children: formattedDate }),
    /* @__PURE__ */ jsx("p", { className: "text-lg col-span-2", children: event.description })
  ] }) });
}
export {
  ShowEvent as default
};
