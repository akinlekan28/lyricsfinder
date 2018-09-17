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
  handleFetch: true,
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
    },
    {
      urlPattern: /https?:\/\/stackpath.bootstrapcdn.+/,
      handler: "fastest"
    },
    {
      urlPattern: /https?:\/\/use.fontawesome.+/,
      handler: "fastest"
    }
  ],
  navigateFallback: "/offline"
};
