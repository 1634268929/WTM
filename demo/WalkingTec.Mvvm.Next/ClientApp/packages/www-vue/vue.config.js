
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const path = require('path');
const fs = require('fs');
const moment = require('moment');
const createThemeColorReplacerPlugin = require('./config/plugin.config');
const createFonts = require('./config/createFonts');
process.env.VUE_APP_VERSION = moment().format('YYYY-MM-DD HH:mm:ss');
createFonts();
module.exports = {
    outputDir: "build",
    runtimeCompiler: true,
    productionSourceMap: false,
    configureWebpack: {
        plugins: [
            new MomentLocalesPlugin({ localesToKeep: ['es-us', 'zh-cn'] }),
            createThemeColorReplacerPlugin()
        ]
    },
    chainWebpack: (config) => {
        // 修复 public node_modules 重复
        // const rootPath = path.resolve(path.dirname(path.dirname(process.cwd())), 'node_modules');
        // config.resolve.modules.add(rootPath).prepend(rootPath);
    },
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    // modifyVars: modifyVars,
                    javascriptEnabled: true
                }
            }
        }
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:5555/',
                changeOrigin: true,
                logLevel: "debug",
            },
            '/swagger': {
                target: 'http://localhost:5555/',
                changeOrigin: true,
                logLevel: "debug",
            },
        }
    }
}