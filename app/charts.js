// NationScope charts: small hand-written SVG builders. No library, no
// network — every chart is a string of SVG the views drop into the page.

window.NS = window.NS || {};

NS.charts = (function () {
  var PALETTE = ["#0b6e4f", "#1463a8", "#e07a1f", "#8a3ffc", "#c2255c", "#0f7a8c", "#7a6a12", "#4c6ef5"];

  function color(i) {
    return PALETTE[i % PALETTE.length];
  }

  // Horizontal ranked bars. rows: [{label, value, display, href, highlight}]
  function barRows(rows, opts) {
    opts = opts || {};
    var max = 0;
    rows.forEach(function (r) { if (r.value > max) max = r.value; });
    if (!max) max = 1;
    var html = '<div class="bar-rows" role="img" aria-label="' + NS.escapeHtml(opts.aria || "Bar chart") + '">';
    rows.forEach(function (r, i) {
      var pct = Math.max(1.5, (r.value / max) * 100);
      var label = r.href
        ? '<a class="bar-label" href="' + r.href + '">' + NS.escapeHtml(r.label) + "</a>"
        : '<span class="bar-label">' + NS.escapeHtml(r.label) + "</span>";
      html +=
        '<div class="bar-row' + (r.highlight ? " is-highlight" : "") + '">' +
        label +
        '<span class="bar-track"><span class="bar-fill" style="width:' + pct.toFixed(1) + "%;background:" + (r.color || color(i)) + '"></span></span>' +
        '<span class="bar-value">' + NS.escapeHtml(r.display) + "</span>" +
        "</div>";
    });
    return html + "</div>";
  }

  // Line chart with dots + labels. points: [{year, value}], value formatted by fn.
  function lineChart(points, opts) {
    opts = opts || {};
    var W = 640, H = 240, padL = 44, padR = 14, padT = 16, padB = 30;
    var min = Infinity, max = -Infinity;
    points.forEach(function (p) { min = Math.min(min, p.value); max = Math.max(max, p.value); });
    var span = (max - min) || 1;
    min -= span * 0.12; max += span * 0.12; span = max - min;
    function x(i) { return padL + (i / (points.length - 1)) * (W - padL - padR); }
    function y(v) { return padT + (1 - (v - min) / span) * (H - padT - padB); }
    var path = "", area = "", dots = "", labels = "";
    points.forEach(function (p, i) {
      path += (i === 0 ? "M" : "L") + x(i).toFixed(1) + " " + y(p.value).toFixed(1) + " ";
      dots += '<circle cx="' + x(i).toFixed(1) + '" cy="' + y(p.value).toFixed(1) + '" r="3.2" fill="#0b6e4f"/>';
      if (i % 2 === 0 || i === points.length - 1) {
        labels += '<text x="' + x(i).toFixed(1) + '" y="' + (H - 8) + '" text-anchor="middle" class="chart-axis">' + p.year + "</text>";
      }
      if (i === 0 || i === points.length - 1) {
        labels += '<text x="' + x(i).toFixed(1) + '" y="' + (y(p.value) - 9).toFixed(1) + '" text-anchor="middle" class="chart-point">' + (opts.format ? opts.format(p.value) : p.value) + "</text>";
      }
    });
    area = path + "L" + x(points.length - 1).toFixed(1) + " " + (H - padB) + " L" + x(0).toFixed(1) + " " + (H - padB) + " Z";
    return (
      '<svg class="line-chart" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + NS.escapeHtml(opts.aria || "Line chart") + '">' +
      '<path d="' + area + '" fill="rgba(11,110,79,0.12)"/>' +
      '<path d="' + path + '" fill="none" stroke="#0b6e4f" stroke-width="2.4" stroke-linejoin="round"/>' +
      dots + labels + "</svg>"
    );
  }

  // Donut of shares. slices: [{label, value}] with legend beside it.
  function donut(slices, opts) {
    opts = opts || {};
    var total = 0;
    slices.forEach(function (s) { total += s.value; });
    if (!total) total = 1;
    var R = 62, C = 2 * Math.PI * R, acc = 0, arcs = "", legend = "";
    slices.forEach(function (s, i) {
      var frac = s.value / total;
      var len = frac * C;
      arcs +=
        '<circle cx="80" cy="80" r="' + R + '" fill="none" stroke="' + color(i) + '" stroke-width="24" ' +
        'stroke-dasharray="' + len.toFixed(1) + " " + (C - len).toFixed(1) + '" stroke-dashoffset="' + (-acc).toFixed(1) + '" transform="rotate(-90 80 80)"/>';
      acc += len;
      legend +=
        '<li><span class="swatch" style="background:' + color(i) + '"></span>' + NS.escapeHtml(s.label) +
        ' <strong>' + (frac * 100).toFixed(1) + "%</strong></li>";
    });
    return (
      '<div class="donut-wrap"><svg viewBox="0 0 160 160" class="donut" role="img" aria-label="' + NS.escapeHtml(opts.aria || "Donut chart") + '">' +
      arcs +
      '<text x="80" y="76" text-anchor="middle" class="donut-centre">' + NS.escapeHtml(opts.centreTop || "") + "</text>" +
      '<text x="80" y="94" text-anchor="middle" class="donut-centre-sub">' + NS.escapeHtml(opts.centreSub || "") + "</text>" +
      '</svg><ul class="donut-legend">' + legend + "</ul></div>"
    );
  }

  // Diverging bars: country value vs world figure, centred on the world.
  // rows: [{label, value, world, display, worldDisplay}]
  function vsWorldBars(rows) {
    var html = '<div class="vs-rows">';
    rows.forEach(function (r) {
      var ratio = r.world ? r.value / r.world : 1;
      // log-ish scale so 0.25x..4x fits the track
      var t = Math.max(-1, Math.min(1, Math.log2(Math.max(0.05, ratio)) / 2));
      var pct = Math.abs(t) * 50;
      var side = t >= 0 ? "right" : "left";
      var fillStyle = side === "right"
        ? "left:50%;width:" + pct.toFixed(1) + "%"
        : "right:50%;width:" + pct.toFixed(1) + "%";
      html +=
        '<div class="vs-row">' +
        '<span class="vs-label">' + NS.escapeHtml(r.label) + "</span>" +
        '<span class="vs-track"><span class="vs-mid"></span><span class="vs-fill vs-' + side + '" style="' + fillStyle + '"></span></span>' +
        '<span class="vs-value">' + NS.escapeHtml(r.display) + ' <span class="vs-world">world ' + NS.escapeHtml(r.worldDisplay) + "</span></span>" +
        "</div>";
    });
    return html + "</div>";
  }

  return { color: color, barRows: barRows, lineChart: lineChart, donut: donut, vsWorldBars: vsWorldBars };
})();
