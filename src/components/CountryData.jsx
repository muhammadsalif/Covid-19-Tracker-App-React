import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CountUp from "react-countup";
import BarChart from "../charts/BarChart";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: "23%",
      height: "8rem",
    },
  },
}));

export default function CountryData({ code }) {
  const classes = useStyles();
  let [globalData, setGlobalData] = useState(1000);
  let [isFetching, setFetching] = useState(false);

  useEffect(() => {
    if (code) {
      async function apiCall() {
        setFetching(true);
        const response = await fetch(
          `https://api.thevirustracker.com/free-api?countryTotal=${code}`
        );
        const responseJson = await response.json();

        setGlobalData(responseJson);
        setFetching(false);
      }
      apiCall();
    }
  }, [code]);

  const countryData = {
    title:
      globalData &&
      globalData.countrydata &&
      globalData.countrydata[0].info.title,
    totalCases:
      globalData &&
      globalData.countrydata &&
      globalData.countrydata[0].total_cases,
    active:
      globalData &&
      globalData.countrydata &&
      globalData.countrydata[0].total_active_cases,
    recovered:
      globalData &&
      globalData.countrydata &&
      globalData.countrydata[0].total_recovered,
    fitalities:
      globalData &&
      globalData.countrydata &&
      globalData.countrydata[0].total_deaths,
  };

  const totalCases = countryData.totalCases ? countryData.totalCases : 0;
  const totalActive = countryData.active ? countryData.active : 0;
  const totalRecovered = countryData.recovered ? countryData.recovered : 0;
  const totalFitalities = countryData.fitalities ? countryData.fitalities : 0;

  if (!code) return null;
  if (isFetching) return <h2>Loading....</h2>;
  return (
    <>
      <div className={classes.root}>
        <Paper
          elevation={3}
          style={{ color: "blue", borderBottom: "8px solid blue" }}
        >
          <h2>Total Cases</h2>
          <h2>
            <CountUp
              start={0}
              end={totalCases}
              duration={2}
              separator=","
            ></CountUp>
          </h2>
        </Paper>
        <Paper
          elevation={3}
          style={{ color: "gold", borderBottom: "8px solid gold" }}
        >
          <h2>Active</h2>
          <h2>
            <CountUp
              start={0}
              end={totalActive}
              duration={2}
              separator=","
            ></CountUp>
          </h2>
        </Paper>
        <Paper
          elevation={3}
          style={{ color: "green", borderBottom: "8px solid green" }}
        >
          <h2>Recovered</h2>
          <h2>
            <CountUp
              start={0}
              end={totalRecovered}
              duration={2}
              separator=","
            ></CountUp>
          </h2>
        </Paper>
        <Paper
          elevation={3}
          style={{
            color: "red",
            borderBottom: "8px solid red",
          }}
        >
          <h2>Fitalities</h2>
          <h2>
            <CountUp
              start={0}
              end={totalFitalities}
              duration={2}
              separator=","
            ></CountUp>
          </h2>
        </Paper>
      </div>
      <BarChart
        cases={countryData.totalCases}
        active={countryData.active}
        recovered={countryData.recovered}
        deaths={countryData.fitalities}
      ></BarChart>
    </>
  );
}
