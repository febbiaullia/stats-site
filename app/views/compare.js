// NationScope comparison tool: pick two to four countries and see every
// indicator side by side, with a bar chart per indicator.

window.NS = window.NS || {};
NS.views = NS.views || {};

NS.views.compare = function (params) {
  var picks = [params.a, params.b, params.c, params.d]
    .filter(function (x) { return x && NS.countryByCode(x); });
  if (picks.length < 2) picks = ["IDN", "USA"];
  picks = picks.slice(0, 4);
  var chosen = picks.map(function (code) { return NS.countryByCode(code); });

  function picker(slot, value) {
    var options = NS.COUNTRIES.map(function (c) {
      return '<option value="' + c.code + '"' + (c.code === value ? " selected" : "") + ">" + c.name + "</option>";
    }).join("");
    var none = slot >= 2 ? '<option value=""' + (!value ? " selected" : "") + ">— none —</option>" : "";
    return '<label>Country ' + (slot + 1) + ' <select class="compare-pick" data-slot="' + slot + '">' + none + options + "</select></label>";
  }

  var pickers =
    '<form class="controls" id="compare-controls">' +
    picker(0, picks[0]) + picker(1, picks[1]) + picker(2, picks[2]) + picker(3, picks[3]) +
    "</form>";

  var head = "<tr><th>Indicator</th>" + chosen.map(function (c) {
    return '<th><a class="country-link" href="#/country/' + c.code + '"><span class="code-chip">' + c.code + "</span> " + c.name + "</a></th>";
  }).join("") + "<th>World</th></tr>";

  var body = NS.INDICATORS.map(function (ind) {
    var best = null;
    if (ind.better === "high") best = Math.max.apply(null, chosen.map(function (c) { return c[ind.key]; }));
    if (ind.better === "low") best = Math.min.apply(null, chosen.map(function (c) { return c[ind.key]; }));
    var cells = chosen.map(function (c) {
      var mark = best !== null && c[ind.key] === best && chosen.length > 1 ? ' <span class="best-mark" title="Best of the compared countries">●</span>' : "";
      return '<td class="num">' + NS.fmt.value(ind, c[ind.key]) + mark + "</td>";
    }).join("");
    return (
      "<tr><td>" + ind.label + '<span class="td-sub">' + ind.year + " · " + ind.source + "</span></td>" +
      cells + '<td class="num muted">' + NS.fmt.value(ind, NS.WORLD[ind.key]) + "</td></tr>"
    );
  }).join("");

  var charts = NS.INDICATORS.filter(function (ind) {
    return ["population", "gdpPerCapita", "lifeExpectancy", "internet", "co2PerCapita", "unemployment"].indexOf(ind.key) >= 0;
  }).map(function (ind) {
    var rows = chosen.map(function (c, i) {
      return { label: c.name, value: c[ind.key], display: NS.fmt.value(ind, c[ind.key]), color: NS.charts.color(i) };
    });
    rows.push({ label: "World", value: NS.WORLD[ind.key], display: NS.fmt.value(ind, NS.WORLD[ind.key]), color: "#9aa5b1" });
    return '<section class="card"><h3>' + ind.label + ' <span class="h-sub">' + ind.year + "</span></h3>" + NS.charts.barRows(rows, { aria: ind.label + " compared" }) + "</section>";
  }).join("");

  return (
    '<h2 class="page-title">Compare countries</h2>' +
    '<p class="page-lede">Choose two to four countries. Every indicator lines up side by side, ' +
    "with the world figure for reference and a dot marking the best of the group where “best” is clear.</p>" +
    pickers +
    '<section class="card"><div class="table-wrap"><table class="data-table"><thead>' + head + "</thead><tbody>" + body + "</tbody></table></div>" +
    '<p class="card-note">● marks the best value among the compared countries for indicators where higher or lower is clearly better. It is a guide, not a verdict — see <a href="#/about">About &amp; sources</a>.</p></section>' +
    '<div class="grid-2">' + charts + "</div>"
  );
};

NS.views.compareMount = function () {
  document.querySelectorAll(".compare-pick").forEach(function (sel) {
    sel.addEventListener("change", function () {
      var values = [];
      document.querySelectorAll(".compare-pick").forEach(function (s) { values.push(s.value); });
      var keys = ["a", "b", "c", "d"];
      var qs = values.map(function (v, i) { return v ? keys[i] + "=" + v : null; }).filter(Boolean).join("&");
      location.hash = "#/compare" + (qs ? "?" + qs : "");
    });
  });
};
