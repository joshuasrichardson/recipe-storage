const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/api",
    createProxyMiddleware({
      target: `http://localhost:${process.env.SERVER_PORT}`,
      changeOrigin: true,
    })
  );
};
