export const tempData = [
  {
    confirmed: {
      value: 10302867,
      detail: "https://covid19.mathdro.id/api/confirmed",
    },
    recovered: {
      value: 5235908,
      detail: "https://covid19.mathdro.id/api/recovered",
    },
    deaths: {
      value: 505518,
      detail: "https://covid19.mathdro.id/api/deaths",
    },
    dailySummary: "https://covid19.mathdro.id/api/daily",
    dailyTimeSeries: {
      pattern: "https://covid19.mathdro.id/api/daily/[dateString]",
      example: "https://covid19.mathdro.id/api/daily/2-14-2020",
    },
    image: "https://covid19.mathdro.id/api/og",
    source: "https://github.com/mathdroid/covid19",
    countries: "https://covid19.mathdro.id/api/countries",
    countryDetail: {
      pattern: "https://covid19.mathdro.id/api/countries/[country]",
      example: "https://covid19.mathdro.id/api/countries/USA",
    },
    lastUpdate: "2020-06-30T06:02:43.000Z",
  },
];
