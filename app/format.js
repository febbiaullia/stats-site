// NationScope number formatting: one place that turns raw values into the
// short, readable figures shown across the site.

window.NS = window.NS || {};

NS.fmt = (function () {
  function withCommas(n) {
    var s = String(Math.round(n));
    return s.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function trimZero(s) {
    return s.indexOf(".") >= 0 ? s.replace(/0+$/, "").replace(/\.$/, "") : s;
  }

  // 283500000 -> "283.5M"; 8160000000 -> "8.16B"; 6040000 -> "6.04M"
  function people(n) {
    if (n >= 1e9) return trimZero((n / 1e9).toFixed(2)) + "B";
    if (n >= 1e6) return trimZero((n / 1e6).toFixed(1)) + "M";
    if (n >= 1e3) return trimZero((n / 1e3).toFixed(1)) + "K";
    return withCommas(n);
  }

  function peopleFull(n) {
    return withCommas(n);
  }

  // value is in US$ billions: 29180 -> "$29.2T"; 1370 -> "$1.37T"; 476 -> "$476B"
  function usdBn(bn) {
    if (bn >= 1000) return "$" + trimZero((bn / 1000).toFixed(2)) + "T";
    return "$" + trimZero(bn.toFixed(0)) + "B";
  }

  function usd(n) {
    return "$" + withCommas(n);
  }

  function pct1(n) {
    return trimZero(n.toFixed(1)) + "%";
  }

  function years1(n) {
    return trimZero(n.toFixed(1)) + " yrs";
  }

  function tonnes1(n) {
    return trimZero(n.toFixed(1)) + " t";
  }

  function km2(n) {
    return withCommas(n) + " km²";
  }

  function perKm2(n) {
    return withCommas(n) + "/km²";
  }

  function value(indicator, n) {
    var f = { people: people, usdBn: usdBn, usd: usd, pct1: pct1, years1: years1, tonnes1: tonnes1, km2: km2, perKm2: perKm2 }[indicator.fmt];
    return f ? f(n) : String(n);
  }

  // "+12% vs world" / "−4% vs world" for a value against the world figure.
  function vsWorld(v, w) {
    if (!w) return "";
    var pct = Math.round(((v - w) / w) * 100);
    if (pct === 0) return "at the world figure";
    return (pct > 0 ? "+" : "−") + Math.abs(pct) + "% vs world";
  }

  return { withCommas: withCommas, people: people, peopleFull: peopleFull, usdBn: usdBn, usd: usd, pct1: pct1, years1: years1, tonnes1: tonnes1, km2: km2, perKm2: perKm2, value: value, vsWorld: vsWorld };
})();

NS.escapeHtml = function (s) {
  return String(s).replace(/[&<>"']/g, function (ch) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
  });
};
