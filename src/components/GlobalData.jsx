import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
// import CountUp from "react-countup";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    // border: "2px solid blue",
    // backgroundColor: "black",
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
      height: theme.spacing(16),
    },
  },
}));

export default function GlobalData({ countryCode }) {
  const classes = useStyles();
  // setData is not using that's why didn't declared here.
  let [isData] = useState(true);
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
      // console.log("Your response JSON: ", responseJson);

      setGlobalData(responseJson);
      setFetching(false);
    }
    apiCall();
  }, [isData]);

  if (isFetching) return <h2>Loading....</h2>;
  const casesNumber =
    globalData && globalData.results && globalData.results[0].total_cases;

  return (
    <div className={classes.root}>
      <Paper
        elevation={3}
        style={{ color: "blue", borderBottom: "8px solid blue" }}
      >
        <h2>Total Cases</h2>
        <h2>
          {/* <CountUp
            start={0}
            end={casesNumber}
            duration={2.5}
            separator=","
          ></CountUp> */}
          {casesNumber}
        </h2>
      </Paper>
      <Paper
        elevation={3}
        style={{ color: "gold", borderBottom: "8px solid gold" }}
      >
        <h2>Active</h2>
        <h2>
          {" "}
          {globalData &&
            globalData.results &&
            globalData.results[0].total_active_cases}
        </h2>
      </Paper>
      <Paper
        elevation={3}
        style={{ color: "green", borderBottom: "8px solid green" }}
      >
        <h2>Recovered</h2>
        <h2>
          {" "}
          {globalData &&
            globalData.results &&
            globalData.results[0].total_recovered}
        </h2>
      </Paper>
      <Paper
        elevation={3}
        style={{
          color: "red",
          borderBottom: "8px solid red",
          // borderTop: "2px solid black",
        }}
      >
        <h2>Fitalities</h2>
        <h2>
          {" "}
          {globalData &&
            globalData.results &&
            globalData.results[0].total_deaths}
        </h2>
      </Paper>
    </div>
  );
}
