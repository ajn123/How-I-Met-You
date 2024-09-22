import { jsx } from "react/jsx-runtime";
import axios from "axios";
import { hydrateRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { StrictMode } from "react";
window.axios = axios;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
async function resolvePageComponent(path, pages) {
  for (const p of Array.isArray(path) ? path : [path]) {
    const page = pages[p];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
const appName = "Laravel";
createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(
    `./Pages/${name}.tsx`,
    /* @__PURE__ */ Object.assign({ "./Pages/About.tsx": () => import("./assets/About-DGZgMkDz.js"), "./Pages/Login.tsx": () => import("./assets/Login-CNIKIMZy.js"), "./Pages/SignUp.tsx": () => import("./assets/SignUp-K759s2HM.js"), "./Pages/Welcome.tsx": () => import("./assets/Welcome-DOpcTea5.js") })
  ),
  setup({ el, App, props }) {
    hydrateRoot(
      el,
      /* @__PURE__ */ jsx(StrictMode, { children: /* @__PURE__ */ jsx(App, { ...props }) })
    );
  },
  progress: {
    color: "#4B5563"
  }
});
