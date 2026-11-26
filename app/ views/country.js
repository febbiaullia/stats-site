// NationScope country profile: headline figures with ranks, a
// country-vs-world chart, the full indicator table with sources, and
// similar countries.

window.NS = window.NS || {};
NS.views = NS.views || {};

NS.views.country = function (code) {
  var c = NS.countryByCode(code);
  if (!c) {
    return '<h2 class="page-title">Country not found</h2><p class="page-lede">That country code is not on NationScope yet. <a href="#/countries">Browse all countries →</a></p>';
  }
  var W = NS.WORLD;
  var total = NS.COUNTRIES.length;

  function headline(key) {
    var ind = NS.indicatorByKey(key);
    // Totals (population, GDP) read better as a share of the world total
    // than as a percentage difference against it.
    var rel = (key === "population" || key === "gdp")
      ? ((c[key] / W[key]) * 100).toFixed(1) + "% of world total"
      : NS.fmt.vsWorld(c[key], W[key]);
    return (
      '<div class="stat-card"><p class="stat-label">' + ind.label + " · " + ind.year + "</p>" +
      '<p class="stat-value">' + NS.fmt.value(ind, c[key]) + "</p>" +
      '<p class="stat-sub">#' + NS.rankOf(c.code, key) + " of " + total + " · " + rel + "</p></div>"
    );
  }

  var vsKeys = ["gdpPerCapita", "lifeExpectancy", "literacy", "internet", "co2PerCapita", "unemployment", "urban", "medianAge"];
  var vsRows = vsKeys.map(function (key) {
    var ind = NS.indicatorByKey(key);
    return { label: ind.label, value: c[key], world: W[key], display: NS.fmt.value(ind, c[key]), worldDisplay: NS.fmt.value(ind, W[key]) };
  });

  var tableRows = NS.INDICATORS.map(function (ind) {
    return (
      "<tr><td>" + ind.label + '<span class="td-sub">' + ind.blurb + "</span></td>" +
      '<td class="num"><strong>' + NS.fmt.value(ind, c[ind.key]) + "</strong></td>" +
      '<td class="num">' + NS.fmt.value(ind, W[ind.key]) + "</td>" +
      '<td class="num">#' + NS.rankOf(c.code, ind.key) + "</td>" +
      "<td>" + ind.year + " · " + ind.source + "</td></tr>"
    );
  }).join("");

  var similar = NS.COUNTRIES
    .filter(function (o) { return o.code !== c.code; })
    .map(function (o) {
      var d =
        Math.abs(Math.log(o.population / c.population)) +
        Math.abs(Math.log(o.gdpPerCapita / c.gdpPerCapita)) +
        Math.abs(o.lifeExpectancy - c.lifeExpectancy) / 10;
      return { country: o, distance: d };
    })
    .sort(function (a, b) { return a.distance - b.distance; })
    .slice(0, 4)
    .map(function (s) {
      return (
        '<a class="country-card" href="#/country/' + s.country.code + '">' +
        '<span class="code-chip">' + s.country.code + "</span><h4>" + s.country.name + "</h4>" +
        '<p class="country-card-sub">' + s.country.region + "</p>" +
        '<p class="country-card-stats"><span>' + NS.fmt.people(s.country.population) + " people</span>" +
        "<span>" + NS.fmt.usd(s.country.gdpPerCapita) + " / capita</span></p></a>"
      );
    }).join("");

  return (
    '<p class="breadcrumb"><a href="#/countries">Countries</a> / ' + c.name + "</p>" +
    '<div class="country-head"><span class="code-chip big">' + c.code + "</span>" +
    "<div><h2 class=\"page-title\">" + c.name + "</h2>" +
    '<p class="country-meta">Capital <strong>' + c.capital + "</strong> · " + c.region + " · Currency <strong>" + c.currency + "</strong></p>" +
    '<p class="country-note">' + c.note + "</p></div></div>" +

    '<section class="stat-grid" aria-label="Headline figures">' +
    headline("population") + headline("gdp") + headline("gdpPerCapita") + headline("lifeExpectancy") +
    "</section>" +

    '<section class="card"><h3>' + c.name + " vs the world</h3>" +
    "<p class=\"card-note\">Bars stretch right when " + c.name + " is above the world figure and left when below (log scale, so a bar twice as long means roughly twice the ratio).</p>" +
    NS.charts.vsWorldBars(vsRows) + "</section>" +

    '<section class="card"><h3>Every indicator, with its source</h3>' +
    '<div class="table-wrap"><table class="data-table"><thead><tr><th>Indicator</th><th>' + c.name + '</th><th>World</th><th>Rank</th><th>Year · Source</th></tr></thead>' +
    "<tbody>" + tableRows + "</tbody></table></div>" +
    '<p class="card-note">Rank is among the ' + total + " countries on this site, highest value first. Figures are rounded from the named public releases; see <a href=\"#/about\">About &amp; sources</a> for definitions and caveats.</p></section>" +

    '<section class="card"><h3>Similar countries</h3>' +
    '<p class="card-note">Closest matches on population, income per person and life expectancy.</p>' +
    '<div class="country-grid">' + similar + "</div>" +
    '<p class="card-link"><a href="#/compare?a=' + c.code + '">Compare ' + c.name + " with another country →</a></p></section>"
  );
};
