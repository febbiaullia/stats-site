// NationScope dataset: 32 countries, headline national indicators.
//
// Every figure is a rounded value from a public release named in INDICATORS
// (World Bank World Development Indicators, UN World Population Prospects,
// IMF World Economic Outlook, ITU). Years differ by indicator because each
// source publishes on its own cycle; the year shown travels with the figure
// everywhere the site displays it. Treat values as reference-grade, not
// official: national statistics offices remain the authority for their own
// country.

window.NS = window.NS || {};

NS.INDICATORS = [
  { key: "population", label: "Population", unit: "people", year: 2024, source: "UN World Population Prospects 2024", better: "none", fmt: "people", blurb: "Total resident population at mid-year." },
  { key: "gdp", label: "GDP (nominal)", unit: "US$ billion", year: 2024, source: "IMF World Economic Outlook, Oct 2025", better: "high", fmt: "usdBn", blurb: "Gross domestic product at market exchange rates." },
  { key: "gdpPerCapita", label: "GDP per capita", unit: "US$", year: 2024, source: "IMF World Economic Outlook, Oct 2025", better: "high", fmt: "usd", blurb: "GDP divided by population; a rough income yardstick." },
  { key: "lifeExpectancy", label: "Life expectancy", unit: "years", year: 2023, source: "World Bank WDI", better: "high", fmt: "years1", blurb: "Years a newborn would live at current mortality rates." },
  { key: "literacy", label: "Adult literacy", unit: "% of adults", year: 2023, source: "UNESCO via World Bank WDI", better: "high", fmt: "pct1", blurb: "Share of people aged 15+ who can read and write." },
  { key: "internet", label: "Internet users", unit: "% of population", year: 2024, source: "ITU Facts and Figures 2024", better: "high", fmt: "pct1", blurb: "Share of people who used the internet in the last 3 months." },
  { key: "co2PerCapita", label: "CO₂ per capita", unit: "tonnes / person", year: 2023, source: "Global Carbon Budget via Our World in Data", better: "low", fmt: "tonnes1", blurb: "Fossil CO₂ emissions divided by population." },
  { key: "unemployment", label: "Unemployment", unit: "% of labour force", year: 2024, source: "ILO modelled estimates via World Bank WDI", better: "low", fmt: "pct1", blurb: "People without work who are actively looking, as a share of the labour force." },
  { key: "medianAge", label: "Median age", unit: "years", year: 2024, source: "UN World Population Prospects 2024", better: "none", fmt: "years1", blurb: "Half the population is younger, half older." },
  { key: "urban", label: "Urban population", unit: "% of population", year: 2024, source: "UN World Urbanization Prospects", better: "none", fmt: "pct1", blurb: "Share of people living in urban areas." },
  { key: "area", label: "Land area", unit: "km²", year: 2024, source: "World Bank WDI", better: "none", fmt: "km2", blurb: "Total land area excluding inland water." },
  { key: "density", label: "Population density", unit: "people / km²", year: 2024, source: "Computed: UN population ÷ World Bank land area", better: "none", fmt: "perKm2", blurb: "People per square kilometre of land." },
];

NS.WORLD = {
  population: 8160000000,
  gdp: 110600,
  gdpPerCapita: 13550,
  lifeExpectancy: 73.3,
  literacy: 87.4,
  internet: 67.9,
  co2PerCapita: 4.7,
  unemployment: 5.0,
  medianAge: 30.6,
  urban: 57.5,
  area: 129733000,
  density: 62.9,
};

// World population anchors, UN World Population Prospects (billions).
NS.WORLD_POP_TREND = [
  { year: 1960, value: 3.03 }, { year: 1970, value: 3.70 },
  { year: 1980, value: 4.46 }, { year: 1990, value: 5.32 },
  { year: 2000, value: 6.14 }, { year: 2010, value: 6.96 },
  { year: 2015, value: 7.39 }, { year: 2020, value: 7.84 },
  { year: 2024, value: 8.16 },
];

// population in people; gdp in US$ billion; area in km². density computed.
NS.COUNTRIES = [
  { code: "IDN", name: "Indonesia", capital: "Jakarta", region: "Asia-Pacific", currency: "Rupiah (IDR)", population: 283500000, gdp: 1370, gdpPerCapita: 4960, lifeExpectancy: 71.7, literacy: 96.0, internet: 66.5, co2PerCapita: 2.3, unemployment: 4.8, medianAge: 29.9, urban: 58.6, area: 1904569, note: "The world's largest archipelago nation: 17,000+ islands, the fourth-largest population, and a median age under 30." },
  { code: "USA", name: "United States", capital: "Washington, D.C.", region: "Americas", currency: "US dollar (USD)", population: 340100000, gdp: 29180, gdpPerCapita: 85800, lifeExpectancy: 78.5, literacy: 99.0, internet: 93.0, co2PerCapita: 13.8, unemployment: 4.0, medianAge: 38.9, urban: 83.0, area: 9833517, note: "The largest economy on earth by nominal GDP, with the third-largest population." },
  { code: "CHN", name: "China", capital: "Beijing", region: "Asia-Pacific", currency: "Yuan (CNY)", population: 1408900000, gdp: 18270, gdpPerCapita: 12970, lifeExpectancy: 78.2, literacy: 97.2, internet: 78.6, co2PerCapita: 8.0, unemployment: 5.1, medianAge: 39.5, urban: 66.5, area: 9596961, note: "Second-largest economy and, until 2023, the most populous country; its population is now slowly shrinking." },
  { code: "IND", name: "India", capital: "New Delhi", region: "Asia-Pacific", currency: "Rupee (INR)", population: 1451000000, gdp: 3890, gdpPerCapita: 2680, lifeExpectancy: 70.6, literacy: 76.3, internet: 55.3, co2PerCapita: 2.0, unemployment: 4.2, medianAge: 28.8, urban: 36.9, area: 3287263, note: "The most populous country since 2023 and the fastest-growing major economy, with the world's largest youth cohort." },
  { code: "JPN", name: "Japan", capital: "Tokyo", region: "Asia-Pacific", currency: "Yen (JPY)", population: 123800000, gdp: 4020, gdpPerCapita: 32480, lifeExpectancy: 84.0, literacy: 99.0, internet: 85.0, co2PerCapita: 8.5, unemployment: 2.5, medianAge: 49.9, urban: 92.0, area: 377930, note: "The oldest population among large nations — median age near 50 — and one of the longest life expectancies anywhere." },
  { code: "DEU", name: "Germany", capital: "Berlin", region: "Europe", currency: "Euro (EUR)", population: 83500000, gdp: 4660, gdpPerCapita: 55800, lifeExpectancy: 81.1, literacy: 99.0, internet: 92.5, co2PerCapita: 6.0, unemployment: 3.4, medianAge: 47.4, urban: 78.0, area: 357588, note: "Europe's largest economy and a manufacturing export powerhouse with a rapidly ageing population." },
  { code: "GBR", name: "United Kingdom", capital: "London", region: "Europe", currency: "Pound sterling (GBP)", population: 69200000, gdp: 3640, gdpPerCapita: 52600, lifeExpectancy: 81.3, literacy: 99.0, internet: 96.4, co2PerCapita: 5.0, unemployment: 4.3, medianAge: 40.1, urban: 84.6, area: 242495, note: "A services-led economy centred on London's financial markets; near-universal internet use." },
  { code: "FRA", name: "France", capital: "Paris", region: "Europe", currency: "Euro (EUR)", population: 66500000, gdp: 3160, gdpPerCapita: 47500, lifeExpectancy: 82.9, literacy: 99.0, internet: 86.8, co2PerCapita: 4.2, unemployment: 7.4, medianAge: 42.3, urban: 81.8, area: 551695, note: "The most visited country in the world, with low-carbon electricity from a large nuclear fleet." },
  { code: "BRA", name: "Brazil", capital: "Brasília", region: "Americas", currency: "Real (BRL)", population: 216400000, gdp: 2170, gdpPerCapita: 10040, lifeExpectancy: 75.8, literacy: 94.7, internet: 84.2, co2PerCapita: 2.2, unemployment: 6.6, medianAge: 33.6, urban: 88.0, area: 8515767, note: "South America's giant: the Amazon basin, a huge agricultural sector, and a highly urban population." },
  { code: "NGA", name: "Nigeria", capital: "Abuja", region: "Africa", currency: "Naira (NGN)", population: 232700000, gdp: 188, gdpPerCapita: 810, lifeExpectancy: 54.6, literacy: 62.0, internet: 45.4, co2PerCapita: 0.6, unemployment: 3.1, medianAge: 18.1, urban: 54.5, area: 923768, note: "Africa's most populous country with one of the youngest populations on earth — median age just 18." },
  { code: "EGY", name: "Egypt", capital: "Cairo", region: "Africa", currency: "Egyptian pound (EGP)", population: 116500000, gdp: 380, gdpPerCapita: 3260, lifeExpectancy: 71.4, literacy: 74.5, internet: 72.2, co2PerCapita: 2.3, unemployment: 6.5, medianAge: 24.5, urban: 43.5, area: 1002450, note: "Over 100 million people concentrated along the Nile valley and delta — a narrow green strip in a vast desert." },
  { code: "AUS", name: "Australia", capital: "Canberra", region: "Asia-Pacific", currency: "Australian dollar (AUD)", population: 26700000, gdp: 1770, gdpPerCapita: 66300, lifeExpectancy: 83.1, literacy: 99.0, internet: 96.2, co2PerCapita: 15.1, unemployment: 4.1, medianAge: 38.5, urban: 86.7, area: 7692024, note: "A continent-sized country of 27 million people — among the lowest population densities on earth." },
  { code: "CAN", name: "Canada", capital: "Ottawa", region: "Americas", currency: "Canadian dollar (CAD)", population: 41300000, gdp: 2240, gdpPerCapita: 54300, lifeExpectancy: 81.7, literacy: 99.0, internet: 94.6, co2PerCapita: 14.3, unemployment: 6.4, medianAge: 40.6, urban: 81.8, area: 9984670, note: "The second-largest country by area, with most people living within 200 km of the US border." },
  { code: "KOR", name: "South Korea", capital: "Seoul", region: "Asia-Pacific", currency: "Won (KRW)", population: 51700000, gdp: 1870, gdpPerCapita: 36100, lifeExpectancy: 83.4, literacy: 97.9, internet: 97.6, co2PerCapita: 11.5, unemployment: 2.8, medianAge: 45.6, urban: 81.5, area: 100210, note: "One of the most connected societies on earth — internet use above 97% — with the world's lowest birth rate." },
  { code: "MEX", name: "Mexico", capital: "Mexico City", region: "Americas", currency: "Peso (MXN)", population: 130900000, gdp: 1850, gdpPerCapita: 14120, lifeExpectancy: 75.1, literacy: 95.3, internet: 81.2, co2PerCapita: 3.6, unemployment: 2.5, medianAge: 29.7, urban: 81.7, area: 1964375, note: "The largest Spanish-speaking country and a manufacturing hub tightly linked to the US economy." },
  { code: "TUR", name: "Türkiye", capital: "Ankara", region: "Europe", currency: "Lira (TRY)", population: 85700000, gdp: 1320, gdpPerCapita: 15460, lifeExpectancy: 77.2, literacy: 97.6, internet: 86.5, co2PerCapita: 5.7, unemployment: 8.7, medianAge: 34.0, urban: 77.3, area: 783562, note: "Straddling Europe and Asia, with Istanbul — a city of 16 million — as its economic heart." },
  { code: "SAU", name: "Saudi Arabia", capital: "Riyadh", region: "Middle East", currency: "Riyal (SAR)", population: 33900000, gdp: 1070, gdpPerCapita: 31600, lifeExpectancy: 77.9, literacy: 99.0, internet: 99.0, co2PerCapita: 18.0, unemployment: 3.5, medianAge: 29.6, urban: 85.0, area: 2149690, note: "The world's top oil exporter, now spending heavily to diversify beyond hydrocarbons under Vision 2030." },
  { code: "POL", name: "Poland", capital: "Warsaw", region: "Europe", currency: "Złoty (PLN)", population: 36600000, gdp: 915, gdpPerCapita: 25000, lifeExpectancy: 78.6, literacy: 99.8, internet: 88.4, co2PerCapita: 7.1, unemployment: 3.0, medianAge: 42.7, urban: 60.4, area: 312696, note: "Central Europe's largest economy, with near-full employment and a fast-growing tech sector." },
  { code: "VNM", name: "Vietnam", capital: "Hanoi", region: "Asia-Pacific", currency: "Đồng (VND)", population: 101000000, gdp: 476, gdpPerCapita: 4720, lifeExpectancy: 74.6, literacy: 95.8, internet: 78.1, co2PerCapita: 3.5, unemployment: 2.3, medianAge: 33.0, urban: 39.5, area: 331212, note: "One of Asia's fastest-growing economies, shifting from agriculture to electronics manufacturing." },
  { code: "PHL", name: "Philippines", capital: "Manila", region: "Asia-Pacific", currency: "Peso (PHP)", population: 115800000, gdp: 462, gdpPerCapita: 3990, lifeExpectancy: 69.7, literacy: 96.3, internet: 83.8, co2PerCapita: 1.3, unemployment: 3.8, medianAge: 26.1, urban: 48.3, area: 300000, note: "An archipelago of 7,600 islands with a young, English-speaking workforce and a large overseas diaspora." },
  { code: "THA", name: "Thailand", capital: "Bangkok", region: "Asia-Pacific", currency: "Baht (THB)", population: 71700000, gdp: 526, gdpPerCapita: 7340, lifeExpectancy: 79.6, literacy: 94.1, internet: 88.0, co2PerCapita: 3.8, unemployment: 1.1, medianAge: 40.1, urban: 52.8, area: 513120, note: "Southeast Asia's second-largest economy, ageing quickly as fertility falls well below replacement." },
  { code: "NLD", name: "Netherlands", capital: "Amsterdam", region: "Europe", currency: "Euro (EUR)", population: 18300000, gdp: 1230, gdpPerCapita: 67200, lifeExpectancy: 81.9, literacy: 99.0, internet: 97.1, co2PerCapita: 7.5, unemployment: 3.7, medianAge: 42.7, urban: 92.6, area: 41865, note: "A dense, low-lying trading nation — a third of the country sits below sea level." },
  { code: "SWE", name: "Sweden", capital: "Stockholm", region: "Europe", currency: "Krona (SEK)", population: 10600000, gdp: 610, gdpPerCapita: 57500, lifeExpectancy: 83.3, literacy: 99.0, internet: 95.4, co2PerCapita: 3.6, unemployment: 8.4, medianAge: 41.1, urban: 88.8, area: 450295, note: "High income with some of the lowest per-capita emissions in the rich world, thanks to hydro and nuclear power." },
  { code: "KEN", name: "Kenya", capital: "Nairobi", region: "Africa", currency: "Shilling (KES)", population: 57000000, gdp: 118, gdpPerCapita: 2070, lifeExpectancy: 62.0, literacy: 87.0, internet: 40.8, co2PerCapita: 0.4, unemployment: 5.7, medianAge: 20.1, urban: 30.7, area: 580367, note: "East Africa's economic hub and a pioneer of mobile money — M-Pesa moves a large share of GDP." },
  { code: "ARG", name: "Argentina", capital: "Buenos Aires", region: "Americas", currency: "Peso (ARS)", population: 47500000, gdp: 633, gdpPerCapita: 13330, lifeExpectancy: 77.3, literacy: 99.1, internet: 89.2, co2PerCapita: 3.8, unemployment: 6.4, medianAge: 32.6, urban: 92.5, area: 2780400, note: "A vast, highly urban country — over 90% city-dwellers — famous for beef, wine and football." },
  { code: "ZAF", name: "South Africa", capital: "Pretoria", region: "Africa", currency: "Rand (ZAR)", population: 64000000, gdp: 400, gdpPerCapita: 6250, lifeExpectancy: 66.2, literacy: 95.0, internet: 74.7, co2PerCapita: 7.3, unemployment: 32.1, medianAge: 28.3, urban: 68.8, area: 1219090, note: "Africa's most industrialised economy, but with the highest unemployment rate in this dataset." },
  { code: "PAK", name: "Pakistan", capital: "Islamabad", region: "Asia-Pacific", currency: "Rupee (PKR)", population: 251300000, gdp: 374, gdpPerCapita: 1490, lifeExpectancy: 66.1, literacy: 58.0, internet: 45.7, co2PerCapita: 0.9, unemployment: 5.5, medianAge: 20.6, urban: 38.4, area: 881913, note: "The fifth-most populous country, with a very young population and literacy still below 60%." },
  { code: "BGD", name: "Bangladesh", capital: "Dhaka", region: "Asia-Pacific", currency: "Taka (BDT)", population: 173600000, gdp: 450, gdpPerCapita: 2590, lifeExpectancy: 74.0, literacy: 79.0, internet: 44.5, co2PerCapita: 0.6, unemployment: 3.4, medianAge: 27.5, urban: 41.9, area: 147570, note: "One of the most densely populated large countries, and the world's second-biggest garment exporter." },
  { code: "RUS", name: "Russia", capital: "Moscow", region: "Europe", currency: "Ruble (RUB)", population: 143800000, gdp: 2160, gdpPerCapita: 15020, lifeExpectancy: 73.3, literacy: 99.7, internet: 90.4, co2PerCapita: 11.8, unemployment: 2.3, medianAge: 41.3, urban: 75.2, area: 17098242, note: "The largest country on earth by land area — eleven time zones from Kaliningrad to Kamchatka." },
  { code: "ITA", name: "Italy", capital: "Rome", region: "Europe", currency: "Euro (EUR)", population: 58900000, gdp: 2380, gdpPerCapita: 40400, lifeExpectancy: 83.4, literacy: 99.2, internet: 86.2, co2PerCapita: 5.4, unemployment: 6.0, medianAge: 48.2, urban: 71.7, area: 301340, note: "One of the world's oldest populations — median age above 48 — and a byword for longevity." },
  { code: "ESP", name: "Spain", capital: "Madrid", region: "Europe", currency: "Euro (EUR)", population: 48800000, gdp: 1720, gdpPerCapita: 35250, lifeExpectancy: 83.9, literacy: 98.4, internet: 94.5, co2PerCapita: 4.7, unemployment: 10.6, medianAge: 45.5, urban: 81.4, area: 505990, note: "Among the highest life expectancies in the world, paired with persistently high unemployment." },
  { code: "SGP", name: "Singapore", capital: "Singapore", region: "Asia-Pacific", currency: "Singapore dollar (SGD)", population: 6040000, gdp: 547, gdpPerCapita: 90600, lifeExpectancy: 83.0, literacy: 97.5, internet: 94.3, co2PerCapita: 8.4, unemployment: 2.0, medianAge: 42.8, urban: 100.0, area: 734, note: "A city-state of 6 million on 734 km² — the highest GDP per capita and density in this dataset." },
];

NS.COUNTRIES.forEach(function (c) { c.density = Math.round((c.population / c.area) * 10) / 10; });

NS.REGIONS = ["All regions", "Asia-Pacific", "Europe", "Americas", "Africa", "Middle East"];

NS.countryByCode = function (code) {
  for (var i = 0; i < NS.COUNTRIES.length; i++) {
    if (NS.COUNTRIES[i].code === code) return NS.COUNTRIES[i];
  }
  return null;
};

NS.indicatorByKey = function (key) {
  for (var i = 0; i < NS.INDICATORS.length; i++) {
    if (NS.INDICATORS[i].key === key) return NS.INDICATORS[i];
  }
  return null;
};

// Rank of a country for one indicator among the 32 (1 = highest value).
NS.rankOf = function (code, key) {
  var sorted = NS.COUNTRIES.slice().sort(function (a, b) { return b[key] - a[key]; });
  for (var i = 0; i < sorted.length; i++) {
    if (sorted[i].code === code) return i + 1;
  }
  return null;
};
