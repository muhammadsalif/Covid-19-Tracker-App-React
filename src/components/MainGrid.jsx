import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import GlobalData from "./GlobalData";
import CountrySelect from "./CountrySelect";
import BarChart from "../charts/BarChart";
import LineChart from "../charts/LineChart";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function MainGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          sm={10}
          lg={8}
          style={{ margin: "0 auto", marginTop: "8px" }}
        >
          <Paper className={classes.paper}>
            <GlobalData></GlobalData>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={10} lg={8} style={{ margin: "0 auto" }}>
          <Paper className={classes.paper} style={{ margin: "0 auto" }}>
            <CountrySelect></CountrySelect>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={10} lg={8} style={{ margin: "0 auto" }}>
          <Paper className={classes.paper} style={{ margin: "0 auto" }}>
            <LineChart></LineChart>
          </Paper>
        </Grid>
        {/* 
        <Grid item xs={12} sm={10} lg={8} style={{ margin: "0 auto" }}>
          <Paper className={classes.paper} style={{ margin: "0 auto" }}>
            <BarChart></BarChart>
          </Paper>
        </Grid> */}
      </Grid>
    </div>
  );
}
