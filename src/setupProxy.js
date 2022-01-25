const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://book-bots-manager.kurbezz.ru',
            changeOrigin: true,
            pathRewrite: {'^/api' : ''}
        })
    );
};