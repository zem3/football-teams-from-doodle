var browserFactory = require("browser-factory"),
    proxyFactory = require("proxy-factory");

var urlToVisit = 'https://github.com/viltgroup/minium-developer/',
    visitsByCountry = {
      'BR': 1,
      'DE': 2,
      'US': 3
    };

for (var countryCode in visitsByCountry) {
  var proxies = proxyFactory.getProxiesFromCountry(countryCode);

  for (var i = 0; i < visitsByCountry[countryCode] && i < proxies.length; i++) {
    var proxy = proxies[i].ipAddress + ":" + proxies[i].port;
    var browserWithProxy = browserFactory.createBrowserWithProxy(proxy);
    browserWithProxy.get(urlToVisit);
    browserWithProxy.quit();
  }
}
