module.exports = {
  staticFileGlobs: [
    "/",
    "/index.html",
    "/offline",
    "build/static/css/**.css",
    "build/static/js/**.js",
    "build/static/media/**.svg",
    "build/**.svg"
  ],
  swFilePath: "./build/service-worker.js",
  stripPrefix: "build/",
  handleFetch: false,
  runtimeCaching: [
    {
      urlPattern: /https?:\/\/cors-anywhere.+/,
      handler: "fastest"
    },
    {
      urlPattern: /https?:\/\/stackpath.+/,
      handler: "fastest"
    },
    {
      urlPattern: /https?:\/\/use.+/,
      handler: "fastest"
    }
  ],
  navigateFallback: "/offline"
};
