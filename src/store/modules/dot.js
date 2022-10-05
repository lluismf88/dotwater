import { Api } from "@/core/api";
const api = new Api();

const state = {
    currentPoint: false,
    list: [],
};

const getters = {
    getCurrentPoint: (state, getters, rootState, rootGetters) => {
        return state.currentPoint;
    },

    getList: (state, getters, rootState, rootGetters) => {
        return state.list;
    },
};

const mutations = {
    setCurrentPoint(state, value) {
        state.currentPoint = value;
    },

    setDotList(state, list) {
        state.list = list;
    },

    addPoint(state, dot) {
        let list = structuredClone(state.list);
        list.push(dot);

        state.list = list;
    },
};

const actions = {
    loadDotList(context, params) {
        api.get("dot").then((response) => {
            if (response.status) {
                context.commit("setDotList", response.data);
            }
        });
    },

    addPoint(context, params) {
        const dot = {
            lat: params.lat,
            lng: params.lng,
        };
        api.post("dot/add", dot).then((response) => {
            if (response.status) {
                context.commit("addPoint", response.data);
            }
        });
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
