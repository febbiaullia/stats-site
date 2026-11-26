// NationScope countries view: search, region filter, sortable table and
// card grid for all 32 countries.

window.NS = window.NS || {};
NS.views = NS.views || {};

NS.views.countries = function (params) {
  var q = (params.q || "").toLowerCase();
  var region = params.region || "All regions";
  var sortKey = params.sort || "population";
  var dir = params.dir === "asc" ? 1 : -1;
  var view = params.view === "cards" ? "cards" : "table";

  var list = NS.COUNTRIES.filter(function (c) {
    if (region !== "All regions" && c.region !== region) return false;
    if (q && (c.name + " " + c.capital + " " + c.code).toLowerCase().indexOf(q) < 0) return false;
    return true;
  });
  list.sort(function (a, b) {
    if (sortKey === "name") return dir * a.name.localeCompare(b.name);
    return dir * (a[sortKey] - b[sortKey]);
  });

  var regionOptions = NS.REGIONS.map(function (r) {
    return '<option value="' + r + '"' + (r === region ? " selected" : "") + ">" + r + "</option>";
  }).join("");

  var sortOptions = [{ key: "name", label: "Name" }].concat(NS.INDICATORS).map(function (ind) {
    return '<option value="' + ind.key + '"' + (ind.key === sortKey ? " selected" : "") + ">" + ind.label + "</option>";
  }).join("");

  function th(key, label) {
    var active = sortKey === key;
    var arrow = active ? (dir === 1 ? " ↑" : " ↓") : "";
    return '<th><button type="button" class="th-sort" data-sort="' + key + '">' + label + arrow + "</button></th>";
  }

  var tableHtml = "";
  if (view === "table") {
    var rows = list.map(function (c) {
      return (
        "<tr>" +
        '<td><a class="country-link" href="#/country/' + c.code + '"><span class="code-chip">' + c.code + "</span> " + c.name + "</a></td>" +
        "<td>" + c.region + "</td>" +
        "<td class=\"num\">" + NS.fmt.people(c.population) + "</td>" +
        "<td class=\"num\">" + NS.fmt.usdBn(c.gdp) + "</td>" +
        "<td class=\"num\">" + NS.fmt.usd(c.gdpPerCapita) + "</td>" +
        "<td class=\"num\">" + NS.fmt.years1(c.lifeExpectancy) + "</td>" +
        "<td class=\"num\">" + NS.fmt.pct1(c.internet) + "</td>" +
        "<td class=\"num\">" + NS.fmt.tonnes1(c.co2PerCapita) + "</td>" +
        "</tr>"
      );
    }).join("");
    tableHtml =
      '<div class="table-wrap"><table class="data-table"><thead><tr>' +
      th("name", "Country") + "<th>Region</th>" +
      th("population", "Population") + th("gdp", "GDP") + th("gdpPerCapita", "GDP / capita") +
      th("lifeExpectancy", "Life exp.") + th("internet", "Online") + th("co2PerCapita", "CO₂ / cap.") +
      "</tr></thead><tbody>" + rows + "</tbody></table></div>";
  } else {
    tableHtml = '<div class="country-grid">' + list.map(function (c) {
      return (
        '<a class="country-card" href="#/country/' + c.code + '">' +
        '<span class="code-chip">' + c.code + "</span>" +
        "<h4>" + c.name + "</h4>" +
        '<p class="country-card-sub">' + c.capital + " · " + c.region + "</p>" +
        '<p class="country-card-stats"><span>' + NS.fmt.people(c.population) + " people</span>" +
        "<span>" + NS.fmt.usd(c.gdpPerCapita) + " / capita</span>" +
        "<span>" + NS.fmt.years1(c.lifeExpectancy) + "</span></p></a>"
      );
    }).join("") + "</div>";
  }

  if (!list.length) {
    tableHtml = '<p class="empty">No country matches that search. Try a shorter name, or clear the region filter.</p>';
  }

  return (
    "<h2 class=\"page-title\">Countries</h2>" +
    '<p class="page-lede">All ' + NS.COUNTRIES.length + " countries on NationScope. Search by name or capital, filter by region, " +
    "and sort by any indicator. Tap a country for its full profile.</p>" +
    '<form class="controls" id="countries-controls">' +
    '<label>Search <input type="search" id="c-q" value="' + NS.escapeHtml(params.q || "") + '" placeholder="Name or capital"></label>' +
    '<label>Region <select id="c-region">' + regionOptions + "</select></label>" +
    '<label>Sort by <select id="c-sort">' + sortOptions + "</select></label>" +
    '<label>Direction <select id="c-dir"><option value="desc"' + (dir === -1 ? " selected" : "") + '>High → low</option>' +
    '<option value="asc"' + (dir === 1 ? " selected" : "") + ">Low → high</option></select></label>" +
    '<span class="view-toggle" role="group" aria-label="View">' +
    '<button type="button" data-view="table" class="' + (view === "table" ? "is-active" : "") + '">Table</button>' +
    '<button type="button" data-view="cards" class="' + (view === "cards" ? "is-active" : "") + '">Cards</button></span>' +
    "</form>" +
    '<p class="result-count">Showing ' + list.length + " of " + NS.COUNTRIES.length + " countries</p>" +
    tableHtml +
    '<p class="card-note">Population 2024 (UN) · GDP 2024 (IMF) · Life expectancy 2023 (World Bank) · Internet use 2024 (ITU) · CO₂ per capita 2023 (Global Carbon Budget). Full sources on the <a href="#/about">About page</a>.</p>'
  );
};

NS.views.countriesMount = function (params) {
  function go(next) {
    var p = {
      q: document.getElementById("c-q").value.trim(),
      region: document.getElementById("c-region").value,
      sort: document.getElementById("c-sort").value,
      dir: document.getElementById("c-dir").value,
      view: params.view || "table",
    };
    Object.keys(next || {}).forEach(function (k) { p[k] = next[k]; });
    var qs = Object.keys(p).filter(function (k) { return p[k] !== "" && p[k] !== "All regions"; })
      .map(function (k) { return k + "=" + encodeURIComponent(p[k]); }).join("&");
    location.hash = "#/countries" + (qs ? "?" + qs : "");
  }
  ["c-q", "c-region", "c-sort", "c-dir"].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener("change", function () { go(); });
  });
  var q = document.getElementById("c-q");
  if (q) q.addEventListener("input", function () { go(); });
  document.querySelectorAll(".view-toggle button").forEach(function (btn) {
    btn.addEventListener("click", function () { go({ view: btn.getAttribute("data-view") }); });
  });
  document.querySelectorAll(".th-sort").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var key = btn.getAttribute("data-sort");
      var nextDir = params.sort === key && params.dir !== "asc" ? "asc" : "desc";
      go({ sort: key, dir: nextDir });
    });
  });
};
