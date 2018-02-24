module.exports = {
  createBrowserWithProxy: function(proxy) {
    return minium.newBrowser({
      desiredCapabilities: {
        proxy: {
          proxyType: 'manual',
          httpProxy: proxy,
          sslProxy: proxy
        }
      }
    });
  }
};
