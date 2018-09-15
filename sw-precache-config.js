module.exports = {
  staticFileGlobs: [
    "build/static/css/**.css",
    "build/static/js/**.js",
    "build/static/media/**.svg",
    "build/**.svg",
    "/offline"
  ],
  swFilePath: "./build/service-worker.js",
  stripPrefix: "build/",
  handleFetch: true,
  runtimeCaching: [
    {
      urlPattern: /http?:\/\/api.+/,
      handler: "fastest"
    },
    {
      urlPattern: /https?:\/\/cors-anywhere.+/,
      handler: "fastest"
    }
  ],
  navigateFallback: "/offline"
};
