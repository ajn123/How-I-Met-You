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
    /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold col-span-2 lg:col-span-1", children: [
      event.name,
      /* @__PURE__ */ jsx(
        "a",
        {
          href: event.url,
          target: "_blank",
          className: "ml-2 my-2 p-2 shadow-lg rounded-md bg-blue-300 hover:bg-blue-700 hover:text-white transition-all ease-in text-lg font-bold",
          children: "Website"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "col-span-2 lg:col-span-1", children: event.tags.map((tag) => /* @__PURE__ */ jsx(Tag, { tag }, tag.id)) }),
    /* @__PURE__ */ jsx("p", { className: "text-lg col-span-2 font-bold", children: formattedDate }),
    /* @__PURE__ */ jsx("p", { className: "text-lg col-span-2", children: event.description })
  ] });
}
function EventFilter({ setEvents, filterString, setParams }) {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    axios.get("/api/tags").then((response) => {
      setTags(response.data);
    });
  }, []);
  const filter = (filter2) => {
    setParams((prevState) => {
      return {
        ...prevState,
        ...filter2
      };
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center p-4 bg-white rounded-lg shadow-lg my-4 border border-amber-900", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        className: "h-12 p-2",
        type: "search",
        placeholder: "Search",
        onChange: (e) => filter({ searchName: e.target.value })
      }
    ),
    tags.map((tag, key) => /* @__PURE__ */ jsx(
      "div",
      {
        onClick: () => filter(`tags=${tag.name}`),
        className: "flex p-6 mb-4 flex-initial w-32 rounded-md text-center object-center hover:bg-black text-2xl hover:text-white transition-all ease-in justify-center border border-2 mx-4 font-bold" + (filterString.current === `tags=${tag.name}` ? " bg-black text-white" : ""),
        children: tag.name
      },
      key
    )),
    /* @__PURE__ */ jsx(
      "div",
      {
        onClick: () => filter(``),
        className: "flex p-6 mb-4 flex-initial w-48 rounded-md text-center object-center hover:bg-black text-2xl hover:text-white transition-all ease-in justify-center border border-2 mx-4 font-bold",
        children: "Clear Filters"
      }
    )
  ] });
}
function EventList({}) {
  const [events, setEvents] = useState([]);
  const page = useRef(1);
  const ref = useRef(null);
  const maxPages = useRef(Number.POSITIVE_INFINITY);
  const filterString = useRef("");
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
  const [params, setParams] = useState({});
  useEffect(() => {
    getMoreEvents(false);
  }, [params]);
  const getMoreEvents = (getMore = true) => {
    if (!getMore) {
      page.current = 1;
    }
    if (page.current > maxPages.current) {
      toast("No more events.", { error: true });
      return;
    }
    const finalParams = {
      ...params,
      page: page.current
    };
    const urlSearchParams = new URLSearchParams(finalParams);
    console.log(`/api/events?${urlSearchParams.toString()}`);
    axios.get(`/api/events?${urlSearchParams.toString()}`).then((response) => {
      maxPages.current = response.data.last_page;
      setEvents((prevState) => [...prevState, ...response.data.data]);
    });
    page.current++;
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(EventFilter, { setEvents, filterString }),
    events.length > 0 && /* @__PURE__ */ jsx(EventFilter, { setEvents, setParams }) && events.map((event, id) => /* @__PURE__ */ jsx(Event, { event }, id)),
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
