import React from "react";
import { Line } from "react-chartjs-2";
import { useEffect } from "react";
import { useState } from "react";

export default function LineChart() {
  const [dailyData, setDailyData] = useState([]);
  const [isFetching, setFetching] = useState(false);

  useEffect(() => {
    async function fetchDailyData() {
      setFetching(true);
      const response = await fetch("https://covid19.mathdro.id/api/daily");
      const responseJson = await response.json();
      setDailyData(responseJson);
      setFetching(false);
    }
    fetchDailyData();
  }, []);

  const lineChart = !isFetching ? (
    <Line
      data={{
        labels: dailyData?.map(({ reportDate }) => reportDate),
        datasets: [
          {
            label: "Infected",
            fill: false,
            borderColor: "rgba(75,192,192,1)",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "yellow",
            pointHoverBorderWidth: 2,
            pointRadius: 5,
            pointHitRadius: 10,
            data: dailyData?.map(({ totalConfirmed }) => totalConfirmed),
          },
          {
            label: "Deaths",
            fill: false,
            borderColor: "rgba(255, 99, 132,1)",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(255, 99, 132,1)",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(255,0,0,1)",
            pointHoverBorderColor: "rgba(0,0,0,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 5,
            pointHitRadius: 10,
            data: dailyData?.map(({ deaths }) => deaths.total),
          },
        ],
      }}
    />
  ) : (
    <h2>Loading...</h2>
  );

  return (
    <div>
      <h2>Global Statistics</h2>
      {lineChart}
    </div>
  );
}
