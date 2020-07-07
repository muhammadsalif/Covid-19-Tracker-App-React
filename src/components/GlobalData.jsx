import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
// import CountUp from "react-countup";
import NumberFormat from "react-number-format";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    // border: "2px dotted blue",
    "& > *": {
      margin: theme.spacing(1),
      width: "23%",
      // height: theme.spacing(16),
      height: "8rem",
    },
  },
  heading: {
    fontSize: "2rem",
    textTransform: "capitalize",
    letterSpacing: "1px",
  },
  paper: {
    transition: "0.3s linear",
    // border: "2px solid peru",
    "&:hover": {
      cursor: "pointer",
      background: "#90a4ae",
      color: "white",
      width: "24%",
      height: "8.2rem",
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
    <div>
      <h2 className={classes.heading}>Global Data</h2>
      <div className={classes.root}>
        <Paper
          elevation={3}
          style={{ color: "blue", borderBottom: "8px solid blue" }}
          className={classes.paper}
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
          className={classes.paper}
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
          className={classes.paper}
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
          className={classes.paper}
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
    </div>
  );
}
