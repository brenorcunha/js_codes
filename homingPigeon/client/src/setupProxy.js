const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://localhost:3333",
            changeOrigin: true,
        })
    )
}
//The HTTPOnly approach only works if the React APP and the back are in the same domain.
//CONTINUE FROM "Data services" head.