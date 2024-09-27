import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { A as Auth } from "./AuthLayout-DV-ew2PM.js";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "@inertiajs/react";
function Tag({ tag }) {
  let [color, setColor] = useState("red");
  useEffect(() => {
    let x = Math.floor(Math.random() * 3);
    console.log(x);
    if (x === 0) {
      setColor("red");
    } else if (x === 1) {
      setColor("blue");
    } else if (x === 2) {
      setColor("green");
    } else {
      setColor("yellow");
    }
  }, []);
  console.log(color);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    "button",
    {
      className: `py-2 my-2 px-4 text-black shadow-md no-underline rounded-full bg-${color}-300 font-sans font-semibold text-sm border-${color} btn-primary hover:text-white hover:bg-${color}-600 transition-all ease-in focus:outline-none active:shadow-none mr-2`,
      children: tag.name
    }
  ) });
}
function Event({ event }) {
  const date = new Date(event.date);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    timeZone: "EST"
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 p-4 bg-white rounded-lg shadow-lg my-4 border border-amber-900", children: [
    /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold col-span-2 lg:col-span-1", children: event.name }),
    /* @__PURE__ */ jsx("div", { className: "col-span-2 lg:col-span-1", children: event.tags.map((tag) => /* @__PURE__ */ jsx(Tag, { tag }, tag.id)) }),
    /* @__PURE__ */ jsx("p", { className: "text-lg col-span-2 font-bold", children: formattedDate }),
    /* @__PURE__ */ jsx("p", { className: "text-lg col-span-2", children: event.description })
  ] });
}
function EventFilter({ setEvents }) {
  const filter = (url) => {
    axios.get(url).then((response) => {
      setEvents(response.data.data);
    }).catch((error) => {
      toast("There was an error getting the events.", {
        error: true
      });
    });
  };
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center p-4 bg-white rounded-lg shadow-lg my-4 border border-amber-900", children: /* @__PURE__ */ jsx(
    "div",
    {
      onClick: () => filter("/api/events?tags=free"),
      className: "text-2xl font-bold col-span-2 lg:col-span-1",
      children: "Free"
    }
  ) });
}
function EventList({}) {
  const [events, setEvents] = useState([]);
  const page = useRef(1);
  const ref = useRef(null);
  const maxPages = useRef(Number.POSITIVE_INFINITY);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          getMoreEvents();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);
  const getMoreEvents = () => {
    if (page.current > maxPages.current) {
      toast("No more events.", { error: true });
      return;
    }
    axios.get(`/api/events?page=${page.current}`).then((response) => {
      maxPages.current = response.data.last_page;
      setEvents((prevState) => [...prevState, ...response.data.data]);
    });
    page.current++;
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(EventFilter, { setEvents }),
    events.length > 0 && /* @__PURE__ */ jsx(EventFilter, { setEvents }) && events.map((event, id) => /* @__PURE__ */ jsx(Event, { event }, id)),
    /* @__PURE__ */ jsx("div", { ref })
  ] });
}
function Welcome({ auth, flash }) {
  return /* @__PURE__ */ jsxs(Auth, { auth, flash, children: [
    /* @__PURE__ */ jsxs("div", { className: "h-96 bg-cyan-200 flex flex-col justify-center items-center rounded-b-md shadow-2xl", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-6xl font-bold", children: "Find Events" }),
      /* @__PURE__ */ jsx("p", { className: "text-2xl mx-4 text-center", children: "Scroll down to see upcoming events or use the search bar." })
    ] }),
    /* @__PURE__ */ jsx("div", { children: (auth == null ? void 0 : auth.user) && /* @__PURE__ */ jsx(EventList, {}) })
  ] });
}
export {
  Welcome as default
};
