const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: `${process.env.REACT_APP_SERVER_URL}`,
            changeOrigin: true,
        })
    )
}
//The HTTPOnly approach only works if the React APP and the back are in the same domain.