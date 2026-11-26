// NationScope home view: world headline figures, population trend,
// featured country, and leaderboard previews.

window.NS = window.NS || {};
NS.views = NS.views || {};

NS.views.home = function () {
  var W = NS.WORLD;
  var featured = NS.countryByCode("IDN");

  function statCard(label, value, sub) {
    return (
      '<div class="stat-card"><p class="stat-label">' + label + '</p>' +
      '<p class="stat-value">' + value + '</p>' +
      '<p class="stat-sub">' + sub + "</p></div>"
    );
  }

  function topList(key, title, n) {
    var ind = NS.indicatorByKey(key);
    var rows = NS.COUNTRIES.slice()
      .sort(function (a, b) { return b[key] - a[key]; })
      .slice(0, n)
      .map(function (c) {
        return { label: c.name, value: c[key], display: NS.fmt.value(ind, c[key]), href: "#/country/" + c.code };
      });
    return (
      '<section class="card"><h3>' + title + '</h3>' +
      NS.charts.barRows(rows, { aria: title }) +
      '<p class="card-link"><a href="#/rankings/' + key + '">Full ranking →</a></p></section>'
    );
  }

  var regionSlices = NS.REGIONS.slice(1).map(function (region) {
    var total = 0;
    NS.COUNTRIES.forEach(function (c) { if (c.region === region) total += c.population; });
    return { label: region, value: total };
  });

  return (
    '<section class="hero">' +
    '<p class="eyebrow">National statistics, made readable</p>' +
    "<h2>The world in numbers</h2>" +
    "<p class=\"hero-lede\">Headline figures for " + NS.COUNTRIES.length + " countries — people, economies, health, " +
    "education, connectivity and carbon — each with its source and year, ready to explore, rank and compare.</p>" +
    '<form class="hero-search" id="home-search"><label class="sr-only" for="home-search-input">Search countries</label>' +
    '<input id="home-search-input" type="search" placeholder="Search a country — try “Indonesia”" autocomplete="off">' +
    '<button type="submit">Search</button></form>' +
    "</section>" +

    '<section class="stat-grid" aria-label="World headline figures">' +
    statCard("World population · 2024", NS.fmt.people(W.population), "8.16 billion people (UN)") +
    statCard("World GDP · 2024", NS.fmt.usdBn(W.gdp), "nominal, market exchange rates (IMF)") +
    statCard("Life expectancy · 2023", NS.fmt.years1(W.lifeExpectancy), "global average at birth (World Bank)") +
    statCard("People online · 2024", NS.fmt.pct1(W.internet), "of humanity uses the internet (ITU)") +
    "</section>" +

    '<div class="grid-2">' +
    '<section class="card"><h3>World population since 1960</h3>' +
    NS.charts.lineChart(NS.WORLD_POP_TREND, { aria: "World population 1960 to 2024, billions", format: function (v) { return v.toFixed(2) + "B"; } }) +
    '<p class="card-note">From 3.03 billion in 1960 to 8.16 billion in 2024 — the UN expects a peak near 10.3 billion in the 2080s. Source: UN World Population Prospects 2024.</p></section>' +

    '<section class="card"><h3>Featured country</h3>' +
    '<div class="featured">' +
    '<span class="code-chip big">' + featured.code + "</span>" +
    "<div><h4>" + featured.name + '</h4><p class="featured-sub">Capital ' + featured.capital + " · " + featured.region + " · " + featured.currency + "</p>" +
    "<p>" + featured.note + "</p></div></div>" +
    '<div class="mini-stats">' +
    "<span><strong>" + NS.fmt.people(featured.population) + "</strong> people</span>" +
    "<span><strong>" + NS.fmt.usdBn(featured.gdp) + "</strong> GDP</span>" +
    "<span><strong>" + NS.fmt.years1(featured.lifeExpectancy) + "</strong> life expectancy</span>" +
    "<span><strong>" + NS.fmt.pct1(featured.internet) + "</strong> online</span>" +
    "</div>" +
    '<p class="card-link"><a href="#/country/' + featured.code + '">Open the full profile →</a></p></section>' +
    "</div>" +

    '<section class="card"><h3>Where the ' + NS.COUNTRIES.length + " countries' people live</h3>" +
    NS.charts.donut(regionSlices, { aria: "Population by region among listed countries", centreTop: NS.fmt.people(regionSlices.reduce(function (a, s) { return a + s.value; }, 0)), centreSub: "people listed" }) +
    '<p class="card-note">Population of the countries on this site, grouped by region. Asia-Pacific dominates because it holds both India and China.</p></section>' +

    '<div class="grid-3">' +
    topList("population", "Most populous", 5) +
    topList("gdp", "Largest economies", 5) +
    topList("lifeExpectancy", "Longest lives", 5) +
    "</div>" +

    '<section class="card cta"><h3>Put two countries side by side</h3>' +
    "<p>Pick any two to four countries and compare every indicator at once — income, health, carbon, connectivity and more.</p>" +
    '<p class="card-link"><a class="button" href="#/compare">Open the comparison tool →</a></p></section>'
  );
};

NS.views.homeMount = function () {
  var form = document.getElementById("home-search");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var q = document.getElementById("home-search-input").value.trim();
    location.hash = "#/countries" + (q ? "?q=" + encodeURIComponent(q) : "");
  });
};
