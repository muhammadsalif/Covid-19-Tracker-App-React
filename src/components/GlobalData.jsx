import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import NumberFormat from "react-number-format";
import "fontsource-roboto";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: "22%",
      height: "8rem",
    },
  },
  heading: {
    fontSize: "2rem",
    textTransform: "capitalize",
    letterSpacing: "1px",
    color: "black",
    fontFamily: "roboto",
  },
  paper: {
    transition: "0.3s linear",
    "&:hover": {
      cursor: "pointer",
      background: "#90a4ae",
      color: "white",
      width: "23%",
      height: "8.2rem",
    },
  },
}));

export default function GlobalData({ selectedCountry }) {
  const classes = useStyles();
  let [globalData, setGlobalData] = useState(1000);
  let [isFetching, setFetching] = useState(false);

  useEffect(() => {
    async function apiCall() {
      setFetching(true);
      const response = await fetch(
        "https://api.thevirustracker.com/free-api?global=stats"
      );
      const responseJson = await response.json();

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
