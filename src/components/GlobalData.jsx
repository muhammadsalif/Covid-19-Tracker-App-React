import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
// import CountUp from "react-countup";
import NumberFormat from "react-number-format";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    display: "flex",
    flexWrap: "wrap",
    margin: "0 auto",
    // border: "2px dotted blue",
    "& > *": {
      margin: theme.spacing(1),
      width: "23%",
      height: theme.spacing(16),
    },
    paper: {
      margin: "0 auto",
    },
  },
}));

export default function GlobalData({ selectedCountry }) {
  const classes = useStyles();
  // setData is not using that's why didn't declared here.
  let [globalData, setGlobalData] = useState(1000);
  let [isFetching, setFetching] = useState(false);

  useEffect(() => {
    async function apiCall() {
      setFetching(true);
      const response = await fetch(
        "https://api.thevirustracker.com/free-api?global=stats"
      );
      // console.log("Your Response is :", response);
      const responseJson = await response.json();
      console.log("Your Global response JSON: ", responseJson);

      setGlobalData(responseJson);
      setFetching(false);
    }
    apiCall();
  }, []);

  const casesNumber =
    globalData && globalData.results && globalData.results[0].total_cases;

  if (isFetching) return <h2>Loading....</h2>;
  return (
    <div className={classes.root}>
      <Paper
        className={classes.paper}
        elevation={3}
        style={{ color: "blue", borderBottom: "8px solid blue" }}
      >
        <h2>Total Cases</h2>
        <h2>
          <NumberFormat
            value={casesNumber}
            displayType={"text"}
            thousandSeparator={true}
          />
          {/* <CountUp
            start={0}
            end={casesNumber}
            duration={2.5}
            separator=","
          ></CountUp> */}
        </h2>
      </Paper>
      <Paper
        elevation={3}
        style={{ color: "gold", borderBottom: "8px solid gold" }}
      >
        <h2>Active</h2>
        <h2>
          <NumberFormat
            value={
              globalData &&
              globalData.results &&
              globalData.results[0].total_active_cases
            }
            displayType={"text"}
            thousandSeparator={true}
          />{" "}
        </h2>
      </Paper>
      <Paper
        elevation={3}
        style={{ color: "green", borderBottom: "8px solid green" }}
      >
        <h2>Recovered</h2>
        <h2>
          <NumberFormat
            value={
              globalData &&
              globalData.results &&
              globalData.results[0].total_recovered
            }
            displayType={"text"}
            thousandSeparator={true}
          />{" "}
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
          <NumberFormat
            value={
              globalData &&
              globalData.results &&
              globalData.results[0].total_deaths
            }
            displayType={"text"}
            thousandSeparator={true}
          />{" "}
        </h2>
      </Paper>
    </div>
  );
}
