import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { A as Auth } from "./AuthLayout-BmWGuR7e.js";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { T as Tag } from "./Tag-CfkiokOz.js";
import { Link } from "@inertiajs/react";
import { toast } from "react-toastify";
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
  return /* @__PURE__ */ jsx(
    Link,
    {
      href: `/events/${event.id}`,
      data: { event },
      preserveState: true,
      children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 p-4 bg-white rounded-lg shadow-lg my-4 border border-amber-900 hover:bg-blue-200 transition-all ease-in", children: [
        /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold col-span-2 lg:col-span-1", children: event.name }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2 lg:col-span-1", children: event.tags.map((tag) => /* @__PURE__ */ jsx(Tag, { tag }, tag.id)) }),
        /* @__PURE__ */ jsx("p", { className: "text-lg col-span-2 font-bold", children: formattedDate }),
        /* @__PURE__ */ jsx("p", { className: "text-lg col-span-2", children: event.description })
      ] })
    }
  );
}
function EventFilter({ setParams, params, eventsTotal }) {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    axios.get("/api/tags").then((response) => {
      setTags(response.data);
    }).catch((error) => {
      toast(error.response.data.message, { type: "error" });
    });
  }, []);
  const [searchValue, getSearchValue] = useState("");
  const filter = (filter2) => {
    if (filter2 == null) {
      setParams({});
    } else {
      setParams((prevState) => {
        var _a, _b, _c;
        if (filter2["tags"]) {
          let queryTerm = (_a = filter2["tags"]) == null ? void 0 : _a[0];
          if (((_b = prevState["tags"]) == null ? void 0 : _b.includes(queryTerm)) && filter2["tags"].includes(queryTerm)) {
            filter2["tags"] = (_c = filter2["tags"]) == null ? void 0 : _c.filter(
              (elem) => elem !== queryTerm
            );
            if (filter2["tags"].length == 0) {
              delete filter2["tags"];
            }
          } else if (prevState["tags"] && filter2["tags"]) {
            filter2["tags"] = [
              ...filter2["tags"],
              ...prevState["tags"]
            ];
          }
        }
        return {
          ...filter2
        };
      });
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center p-4 bg-white rounded-lg shadow-lg my-4 border border-amber-900", children: [
    tags.map((tag, key) => {
      var _a;
      return /* @__PURE__ */ jsx(
        "div",
        {
          onClick: () => filter({ tags: [tag.name] }),
          className: "flex p-6 mb-4 flex-initial w-32 rounded-md text-center object-center hover:bg-black text-2xl hover:text-white transition-all ease-in justify-center  border-4 mx-4 font-bold" + (((_a = params["tags"]) == null ? void 0 : _a.includes(tag.name)) ? " bg-black text-white" : ""),
          children: tag.name
        },
        key
      );
    }),
    /* @__PURE__ */ jsx(
      "div",
      {
        onClick: () => {
          filter(null);
          getSearchValue("");
        },
        className: "flex p-6 mb-4 flex-initial w-48 rounded-md text-center object-center hover:bg-black text-2xl hover:text-white transition-all ease-in justify-center border-4 mx-4 font-bold",
        children: "Clear Filters"
      }
    ),
    /* @__PURE__ */ jsx(
      "input",
      {
        className: "h-12 p-2",
        type: "search",
        placeholder: "Search",
        value: searchValue,
        onChange: (e) => {
          filter({ searchName: e.target.value });
          getSearchValue(e.target.value);
        }
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "flex p-6 mb-4 flex-initial w-48 rounded-md text-center object-center text-2xl transition-all ease-in justify-center mx-4 font-bold",
        children: [
          "Events:oeuoeu ",
          eventsTotal
        ]
      }
    )
  ] });
}
function EventList({}) {
  const [events, setEvents] = useState([]);
  const [params, setParams] = useState({});
  const [eventTotal, setEventTotal] = useState(0);
  const page = useRef(1);
  const ref = useRef(null);
  const maxPages = useRef(Number.POSITIVE_INFINITY);
  useRef("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          getMoreEvents(true);
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
  }, [ref, params]);
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
    console.log(`finalParams: ${JSON.stringify(finalParams)}`);
    const urlSearchParams = new URLSearchParams(finalParams);
    console.log(`/api/events?${urlSearchParams.toString()}`);
    axios.get(`/api/events?${urlSearchParams.toString()}`).then((response) => {
      maxPages.current = response.data.last_page;
      if (!getMore) {
        setEvents(response.data.data);
        setEventTotal(response.data.total);
      } else {
        setEvents((prevState) => [
          ...prevState,
          ...response.data.data
        ]);
      }
    });
    page.current++;
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      EventFilter,
      {
        setParams,
        params,
        eventsTotal: eventTotal
      }
    ),
    events.length > 0 && events.map((event, id) => /* @__PURE__ */ jsx(Event, { event }, id)),
    /* @__PURE__ */ jsx("div", { ref })
  ] });
}
function Welcome({ auth, flash }) {
  return /* @__PURE__ */ jsxs(Auth, { auth, flash, children: [
    /* @__PURE__ */ jsxs("div", { className: "h-96 bg-cyan-200 flex flex-col justify-center items-center rounded-b-md shadow-2xl", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-6xl font-bold", children: "Find Events" }),
      /* @__PURE__ */ jsx("p", { className: "text-2xl mx-4 text-center", children: "Scroll down to see upcoming events or use the search bar." })
    ] }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(EventList, {}) })
  ] });
}
export {
  Welcome as default
};
