// NationScope about page: what the site is, where every figure comes
// from, how to read the numbers, and honest caveats.

window.NS = window.NS || {};
NS.views = NS.views || {};

NS.views.about = function () {
  var sourceRows = NS.INDICATORS.map(function (ind) {
    return (
      "<tr><td><strong>" + ind.label + "</strong><span class=\"td-sub\">" + ind.blurb + "</span></td>" +
      "<td>" + ind.unit + "</td><td>" + ind.year + "</td><td>" + ind.source + "</td></tr>"
    );
  }).join("");

  return (
    '<h2 class="page-title">About &amp; sources</h2>' +
    '<p class="page-lede">NationScope puts the headline statistics of ' + NS.COUNTRIES.length + " countries in one " +
    "readable place — no accounts, no tracking, and everything works offline from the site's own files.</p>" +

    '<section class="card"><h3>Where the figures come from</h3>' +
    "<p>Each indicator is a rounded value from the public release named below. Years differ because each source " +
    "publishes on its own cycle; the year travels with the figure everywhere it appears on the site.</p>" +
    '<div class="table-wrap"><table class="data-table"><thead><tr><th>Indicator</th><th>Unit</th><th>Year</th><th>Source</th></tr></thead>' +
    "<tbody>" + sourceRows + "</tbody></table></div></section>" +

    '<section class="card"><h3>How to read the numbers</h3>' +
    "<ul class=\"plain-list\">" +
    "<li><strong>GDP (nominal)</strong> uses market exchange rates, so it moves with currencies. It measures economic size, not living standards — for that, look at GDP per capita, and even then only as a rough yardstick.</li>" +
    "<li><strong>Life expectancy</strong> is a period measure: it assumes today's mortality rates stay fixed. It is excellent for comparing health systems, less so for predicting any one person's lifespan.</li>" +
    "<li><strong>Unemployment</strong> counts people without work who are actively looking. Definitions vary; informal work is common in many countries and is not captured here.</li>" +
    "<li><strong>CO₂ per capita</strong> counts fossil-fuel emissions produced inside a country's borders, not the carbon embedded in what it imports.</li>" +
    "<li><strong>Ranks</strong> on this site are among the " + NS.COUNTRIES.length + " listed countries only, highest value first — not world ranks.</li>" +
    "</ul></section>" +

    '<section class="card"><h3>Caveats, honestly</h3>' +
    "<ul class=\"plain-list\">" +
    "<li>Figures are rounded for readability. For decisions that matter, use the source release or the national statistics office of the country concerned.</li>" +
    "<li>Some values are modelled estimates (notably unemployment and literacy), because not every country measures them the same way every year.</li>" +
    "<li>Population figures include all residents. A few countries' totals depend on how expatriate workers are counted.</li>" +
    "<li>The country notes are one-line orientation, not analysis. They are written to help a first-time reader place each country, nothing more.</li>" +
    "</ul></section>" +

    '<section class="card"><h3>About this site</h3>' +
    "<p>NationScope is a static site: plain HTML, CSS and JavaScript with hand-drawn SVG charts and no external " +
    "requests. It was built by an AI agent for make.fun's “Make the best national statistics site” bounty. " +
    "The dataset lives in a single readable file (<code>app/data.js</code>) so every figure can be checked against its source.</p>" +
    '<p class="card-link"><a href="#/countries">Browse the countries →</a></p></section>'
  );
};
