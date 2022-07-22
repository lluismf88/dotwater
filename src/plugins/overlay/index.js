import Template from "./overlay.vue";
// import i18n from '@/i18n'

const getDefaultState = () => {
    return {
        type: "default",
        show: false,
        closable: true,
        loading: false,
        color: "000000cc",
        message: "",
        blocking: false,
        dPrint: {},
        styles: {},
        typeImage: false,
        timeoutActive: false,
        timeout: {
            timing: 90000,
            autoredirect: false,
            action: {
                // actionText: i18n.t('assets.overlay.timeout.actionText'),
                // message: i18n.t('assets.overlay.timeout.message'),
                show: false,
                url: "/home",
                callAction: function () {},
            },
        },
        callClick: null,
    };
};

let globalOptions = getDefaultState();

let instance;

const Init = function (config = {}) {
    let Tpl = this.extend(Template);

    if (!instance) instance = new Tpl();
    config = {
        ...globalOptions,
        ...instance.$data,
        ...config,
    };
    for (let key in config) {
        if (config.hasOwnProperty(key)) {
            instance.$data[key] = config[key];
        }
    }
};

const Show = function (config = {}) {
    Init.call(this, config);

    instance.$data.show = true;
    document.body.style.overflow = "hidden";
    document.body.appendChild(instance.$mount().$el);
};

const Loading = function (config = {}) {
    config = {
        ...{ loading: true, closable: false },
        ...config,
    };
    Show.call(this, config);
};

const Printing = function (config = {}) {
    config = {
        ...{
            type: "print",
            loading: false,
            closable: true,
        },
        ...config,
    };
    Show.call(this, config);
};

const Hide = function () {
    if (typeof instance != "undefined") {
        Object.assign(instance.$data, getDefaultState());
        // instance.$data.message = ''
        // instance.$data.blocking = false
        // instance.$data.loading = false
        // instance.$data.show = false
        // instance.$data.timeout.action.show = false
        clearTimeout(instance.$data.timeoutActive);
    }
};

export default {
    install(Vue) {
        Vue.prototype.$overlay = Init.bind(Vue);
        Vue.prototype.$overlay.show = Show.bind(Vue);
        Vue.prototype.$overlay.open = Show.bind(Vue);
        Vue.prototype.$overlay.loading = Loading.bind(Vue);
        Vue.prototype.$overlay.printing = Printing.bind(Vue);
        Vue.prototype.$overlay.hide = Hide.bind(Vue);
        Vue.prototype.$overlay.close = Hide.bind(Vue);
    },
};
