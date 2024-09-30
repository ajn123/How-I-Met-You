import axios from "axios";
window.axios = axios;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
window.axios.defaults.headers.common["Authorization"] =
    `Bearer ${loadEnv().API_TOKEN};`;

import "react-toastify/dist/ReactToastify.css";
import { loadEnv } from "vite";
