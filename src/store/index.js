import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import dot from "@/store/modules/dot";

export default new Vuex.Store({
    state: {
        menu_open: false,
        add_point_open: false,
    },
    getters: {
        isMenuOpen: (state, getters, rootState, rootGetters) => {
            return state.menu_open;
        },
        isAddPointOpen: (state, getters, rootState, rootGetters) => {
            return state.add_point_open;
        },
    },
    mutations: {
        setMenuOpen(state, value) {
            state.menu_open = value;
        },
        setAddPointOpen(state, value) {
            state.add_point_open = value;
        },
    },
    actions: {},
    modules: {
        dot,
    },
});
