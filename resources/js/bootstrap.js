import axios from "axios";
window.axios = axios;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

import "react-toastify/dist/ReactToastify.css";

if (!window.axios.defaults.headers.common["Authorization"]) {
    axios.get("/api/tokens/create").then((response) => {
        console.log(response);
        window.axios.defaults.headers.common["Authorization"] =
            `Bearer ${response.data.token}`;
    });
}
