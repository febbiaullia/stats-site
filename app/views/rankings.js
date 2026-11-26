// NationScope rankings: every country ranked by one chosen indicator,
// with the world figure drawn in for scale.

window.NS = window.NS || {};
NS.views = NS.views || {};

NS.views.rankings = function (key) {
  var ind = NS.indicatorByKey(key) || NS.indicatorByKey("population");
  var sorted = NS.COUNTRIES.slice().sort(function (a, b) { return b[ind.key] - a[ind.key]; });

  var selector = NS.INDICATORS.map(function (i) {
    return '<option value="' + i.key + '"' + (i.key === ind.key ? " selected" : "") + ">" + i.label + "</option>";
  }).join("");

  var rows = sorted.map(function (c, i) {
    return {
      label: (i + 1) + ". " + c.name,
      value: c[ind.key],
      display: NS.fmt.value(ind, c[ind.key]),
      href: "#/country/" + c.code,
      highlight: c.code === "IDN",
    };
  });
  rows.push({ label: "World", value: NS.WORLD[ind.key], display: NS.fmt.value(ind, NS.WORLD[ind.key]), color: "#9aa5b1" });

  var top = sorted[0];
  var bottom = sorted[sorted.length - 1];
  var median = sorted[Math.floor(sorted.length / 2)];

  return (
    '<h2 class="page-title">Rankings</h2>' +
    '<p class="page-lede">All ' + NS.COUNTRIES.length + " countries ranked by one indicator, highest first. " +
    "Indonesia is highlighted; the grey bar is the world figure.</p>" +
    '<form class="controls" id="rankings-controls"><label>Indicator <select id="r-key">' + selector + "</select></label></form>" +
    '<section class="stat-grid" aria-label="Ranking summary">' +
    '<div class="stat-card"><p class="stat-label">Highest</p><p class="stat-value">' + NS.fmt.value(ind, top[ind.key]) + '</p><p class="stat-sub">' + top.name + "</p></div>" +
    '<div class="stat-card"><p class="stat-label">Middle country</p><p class="stat-value">' + NS.fmt.value(ind, median[ind.key]) + '</p><p class="stat-sub">' + median.name + "</p></div>" +
    '<div class="stat-card"><p class="stat-label">Lowest</p><p class="stat-value">' + NS.fmt.value(ind, bottom[ind.key]) + '</p><p class="stat-sub">' + bottom.name + "</p></div>" +
    '<div class="stat-card"><p class="stat-label">World · ' + ind.year + '</p><p class="stat-value">' + NS.fmt.value(ind, NS.WORLD[ind.key]) + '</p><p class="stat-sub">' + ind.source + "</p></div>" +
    "</section>" +
    '<section class="card"><h3>' + ind.label + ' <span class="h-sub">' + ind.unit + " · " + ind.year + "</span></h3>" +
    "<p class=\"card-note\">" + ind.blurb + " Source: " + ind.source + ".</p>" +
    NS.charts.barRows(rows, { aria: "Ranking by " + ind.label }) +
    "</section>"
  );
};

NS.views.rankingsMount = function () {
  var sel = document.getElementById("r-key");
  if (sel) sel.addEventListener("change", function () { location.hash = "#/rankings/" + sel.value; });
};
