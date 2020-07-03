// import React from "react";

// export const GlobalData = () => {
//   return <div>This is the Global data</div>;
// };

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
      height: theme.spacing(16),
    },
  },
}));

export default function GlobalData() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={3} style={{ color: "blue" }}>
        Global data
      </Paper>
      <Paper elevation={3} style={{ color: "yellow" }}>
        Active
      </Paper>
      <Paper elevation={3} style={{ color: "green" }}>
        Recovered
      </Paper>
      <Paper elevation={3} style={{ color: "red" }}>
        Fitalities
      </Paper>
    </div>
  );
}
