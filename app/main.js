// NationScope router: hash routes render one view into #app, keep the
// nav highlight in sync, and run each view's mount hook for its controls.

window.NS = window.NS || {};

NS.parseRoute = function () {
  var hash = location.hash.replace(/^#/, "") || "/";
  var qIndex = hash.indexOf("?");
  var path = qIndex >= 0 ? hash.slice(0, qIndex) : hash;
  var params = {};
  if (qIndex >= 0) {
    hash.slice(qIndex + 1).split("&").forEach(function (pair) {
      var kv = pair.split("=");
      if (kv[0]) params[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1] || "");
    });
  }
  return { path: path, params: params };
};

NS.render = function () {
  var route = NS.parseRoute();
  var app = document.getElementById("app");
  var html = "", mount = null, title = "NationScope — National Statistics, Made Readable", navKey = "home";

  if (route.path === "/" || route.path === "") {
    html = NS.views.home();
    mount = NS.views.homeMount;
    navKey = "home";
  } else if (route.path === "/countries") {
    html = NS.views.countries(route.params);
    mount = function () { NS.views.countriesMount(route.params); };
    title = "Countries — NationScope";
    navKey = "countries";
  } else if (route.path.indexOf("/country/") === 0) {
    var code = route.path.slice("/country/".length).toUpperCase();
    html = NS.views.country(code);
    var c = NS.countryByCode(code);
    title = (c ? c.name + " — NationScope" : "Country — NationScope");
    navKey = "countries";
  } else if (route.path === "/compare") {
    html = NS.views.compare(route.params);
    mount = NS.views.compareMount;
    title = "Compare countries — NationScope";
    navKey = "compare";
  } else if (route.path.indexOf("/rankings") === 0) {
    var key = route.path.split("/")[2] || "population";
    html = NS.views.rankings(key);
    mount = NS.views.rankingsMount;
    title = "Rankings — NationScope";
    navKey = "rankings";
  } else if (route.path === "/about") {
    html = NS.views.about();
    title = "About & sources — NationScope";
    navKey = "about";
  } else {
    html = '<h2 class="page-title">Page not found</h2><p class="page-lede">That page does not exist on NationScope. <a href="#/">Go to the home page →</a></p>';
  }

  app.innerHTML = html;
  document.title = title;
  document.querySelectorAll("#main-nav a").forEach(function (a) {
    a.classList.toggle("is-active", a.getAttribute("data-route") === navKey);
  });
  if (mount) mount();
  window.scrollTo(0, 0);
};

window.addEventListener("hashchange", NS.render);
document.addEventListener("DOMContentLoaded", NS.render);
