// See more in https://github.com/ktquez/vuepress-theme-ktquez#configuration
const path = require("path");
const head = require("./config/head");
const themeConfig = require("./config/themeConfig");
const resolve = (pathName) => path.join(__dirname, pathName);

module.exports = {
  head,
  themeConfig,
  base: "/",
  title: `ELITE GAMERS`,
  ga: `G-0VR3Q1WH8K`,
  evergreen: true, // For modern browsers
  serviceWorker: true,
  locales: {
    "/": {
      lang: "en",
    },
  },
  configureWebpack() {
    return {
      resolve: {
        alias: {
          "@public": resolve("./public"),
        },
      },
    };
  },

};
