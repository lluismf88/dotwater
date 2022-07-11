const version = require("./package.json").version; // set this however you want to.

module.exports = {
    runtimeCompiler: true,

    transpileDependencies: true,

    css: {
        loaderOptions: {
            sass: {
                data: `
                @import "@/../public/css/variables.scss";
        `,
            },
        },
        extract:
            process.env.NODE_ENV !== "production"
                ? undefined
                : {
                      filename: `css/[name].[contenthash:8].${version}.css`,
                      chunkFilename: `css/[name].[contenthash:8].${version}.css`,
                  },
    },

    chainWebpack: (config) => {
        if (config.store.get("mode") == "production") {
            config.output
                .filename(`js/[name].[contenthash:8].${version}.js`)
                .chunkFilename(`js/[name].[contenthash:8].${version}.js`);
        }
    },
};

require("events").EventEmitter.defaultMaxListeners = 0;
