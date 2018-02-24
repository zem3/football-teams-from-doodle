module.exports = {
  getProxiesFromCountry: function(countryCode) {
    return freeProxyListPage
            .load()
            .proxyTable()
            .filterByCountryCode(countryCode)
            .filterByAnonymity('elite proxy')
            .proxies();
  }
};

var freeProxyListPage = (function() {
  return {
    load: function () {
      browser.get("https://free-proxy-list.net/");
      return this;
    },
    proxyTable: function() {
      return proxyTable;
    }
  };
})();

var proxyTable = (function() {
  var elems = { root: $("#proxylisttable_wrapper") };
  elems.headers = elems.root.find("thead th");
  elems.proxyRows = elems.root.find("tbody tr");
  elems.cells = elems.proxyRows.find("td");
  elems.ipAddresses = elems.cells.below(elems.headers.withText("IP Address"));
  elems.ports = elems.cells.below(elems.headers.withText("Port"));
  elems.filters = elems.root.find("tfoot th");
  elems.countryCodeSelector = elems.filters.below(elems.headers.withText("Code")).find("select");
  elems.anonymitySelector = elems.filters.below(elems.headers.withText("Anonymity")).find("select");

  function getProxy($proxyRow) {
    return {
      ipAddress: $proxyRow.find(elems.ipAddresses).text(),
      port: $proxyRow.find(elems.ports).text()
    };
  }
  
  return {
    filterByAnonymity: function(level) {
      elems.anonymitySelector.select(level);
      return this;
    },
    filterByCountryCode: function(countryCode) {
      elems.countryCodeSelector.select(countryCode);
      return this;
    },
    proxies: function() {
      var proxies = [];
      for (var i = 0; i < elems.proxyRows.size(); i++) proxies.push(getProxy(elems.proxyRows.eq(i)));
      return proxies;
    }
  };
})();