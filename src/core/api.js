import axios from "axios";
import router from "@/router";
import store from "@/store";

const API_URL = process.env.VUE_APP_API_URL;

// ADD BY DEFAULT TIMEOUT 10sec
axios.defaults.timeout = 10000;

export class Api {
    constructor() {}

    async get(uri) {
        const url = API_URL + uri;
        console.log(url);
        var self = this;
        return axios
            .get(url, {
                withCredentials: true,
                validateStatus: function (status) {
                    if ([401, 402, 403].includes(status)) {
                        window.location.href =
                            process.env.VUE_APP_IS_APP === "TRUE"
                                ? cordova.file.applicationDirectory +
                                  "www/index.html#/login"
                                : window.window.location.origin +
                                  (process.env.VUE_APP_URL_TYPE == "HASH"
                                      ? "/#"
                                      : "") +
                                  "/login";
                        return false;
                    }
                    if (
                        [503].includes(status) &&
                        process.env.VUE_APP_IS_APP !== "TRUE"
                    ) {
                        return false;
                    }

                    return true;
                },
            })
            .then(function (response) {
                return response.data;
            })
            .catch((error) => {
                //TODO: validate more error messages
                return { status: false, msg: "Error: Network Error" + error };
            });
    }

    async post(uri, params) {
        // axios.defaults.headers.common["Authorization"] = await db_login.getItem(
        //     "token"
        // );

        const oParams = new URLSearchParams();
        Object.keys(params).forEach((key) => {
            oParams.append(key, params[key]);
        });

        const url = API_URL + uri;

        return axios
            .post(url, oParams, {
                withCredentials: true,
                validateStatus: function (status) {
                    if ([401, 402, 403].includes(status)) {
                        window.location.href =
                            process.env.VUE_APP_IS_APP === "TRUE"
                                ? cordova.file.applicationDirectory +
                                  "www/index.html#/login"
                                : window.window.location.origin +
                                  (process.env.VUE_APP_URL_TYPE == "HASH"
                                      ? "/#"
                                      : "") +
                                  "/login";
                        return false;
                    }
                    if (
                        [503].includes(status) &&
                        process.env.VUE_APP_IS_APP !== "TRUE"
                    ) {
                        return false;
                    }

                    return true;
                },
            })
            .then(function (response) {
                return response.data;
            })
            .catch((error) => {
                //TODO: validate more error messages
                return { status: false, msg: "Error: Network Error" + error };
            });
    }

    login(uri, params) {
        const oParams = new URLSearchParams();
        Object.keys(params).forEach((key) => {
            oParams.append(key, params[key]);
        });

        const url = API_URL + uri;
        return axios.post(url, oParams, {}).then(function (response) {
            return response.data;
        });
    }

    async getSession(params) {
        axios.defaults.headers.common["Authorization"] = await db_login.getItem(
            "token"
        );

        const url = API_URL + "init";
        const appVersion = process.env.VUE_APP_VERSION;
        const platform = process.env.VUE_APP_IS_APP == "TRUE" ? 1 : 2;
        const coords = localStorage.device_coords
            ? localStorage.device_coords
            : false;
        const uuid = localStorage.device_uuid
            ? localStorage.device_uuid
            : false;
        const oParams = new URLSearchParams();
        const mq =
            typeof params.mq !== "undefined" && params.mq ? params.mq : null;

        oParams.append("version", appVersion);
        oParams.append("platform", platform);
        oParams.append("mq", mq);

        if (uuid) oParams.append("uuid", uuid);
        if (coords)
            oParams.append(
                "geolocation",
                JSON.parse(coords).latitude + "," + JSON.parse(coords).longitude
            );

        return axios
            .post(url, oParams, {
                validateStatus: function (status) {
                    if ([401, 402, 403].includes(status)) {
                        window.location.href =
                            process.env.VUE_APP_IS_APP === "TRUE"
                                ? cordova.file.applicationDirectory +
                                  "www/index.html#/login"
                                : window.window.location.origin +
                                  (process.env.VUE_APP_URL_TYPE == "HASH"
                                      ? "/#"
                                      : "") +
                                  "/login";
                        return false;
                    }
                    return true;
                },
            })
            .then(function (response) {
                return response.data;
            })
            .catch((error) => {
                //TODO: validate more error messages
                return { status: false, msg: "Error: Network Error" };
            });
    }

    async getFile(uri) {
        // axios.defaults.headers.common['Authorization'] = await db_login.getItem('token')
        delete axios.defaults.headers.common["Authorization"];
        const url = API_URL + uri;
        var self = this;
        return axios
            .get(url, {
                withCredentials: false,
                responseType: "blob",
                validateStatus: function (status) {
                    if ([401, 402, 403].includes(status)) {
                        window.location.href =
                            process.env.VUE_APP_IS_APP === "TRUE"
                                ? cordova.file.applicationDirectory +
                                  "www/index.html#/login"
                                : window.window.location.origin +
                                  (process.env.VUE_APP_URL_TYPE == "HASH"
                                      ? "/#"
                                      : "") +
                                  "/login";
                        return false;
                    }
                    return true;
                },
            })
            .then(function (response) {
                return response.data;
            })
            .catch((error) => {
                //TODO: validate more error messages
                return { status: false, msg: "Error: Network Error" };
            });
    }

    language(lang) {
        const url = API_URL + "lang/" + lang;
        var self = this;
        return axios
            .get(url, {
                validateStatus: function (status) {
                    return true;
                },
            })
            .then(function (response) {
                return response.data;
            });
    }
}
