import React from "react";
import { Bar } from "react-chartjs-2";

export default function BarChart({ cases, active, recovered, deaths }) {
  const data = {
    labels: ["Total Cases", "Active", "Recovered", "Deaths"],
    datasets: [
      {
        label: "Total Cases",
        backgroundColor: "rgba(0,0,255,0.2)",
        borderColor: "rgba(0,0,255,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [cases],
      },
      {
        label: "Active",
        backgroundColor: "rgba(255,215,0,0.2)",
        borderColor: "rgba(255,215,0,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [active],
      },

      {
        label: "Recovered",
        backgroundColor: "rgba(0,255,0,0.2)",
        borderColor: "rgba(0,255,0,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [recovered],
      },
      {
        label: "Deaths",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [deaths],
      },
    ],
  };

  if (cases === "") return null;
  return (
    <div>
      <>
        <h2>Chart Statistics</h2>
        <Bar
          data={data}
          width={100}
          height={80}
          options={{
            maintainAspectRatio: false,
          }}
        />
      </>
    </div>
  );
}
