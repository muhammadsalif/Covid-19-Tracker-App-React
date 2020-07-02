import React from "react";
// import { Button } from "@material-ui/core";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";

import NavigationBar from "./components/Navigationbar";

function App() {
  return (
    <div>
      <NavigationBar></NavigationBar>
      Hello from my app.
      {/* <Button variant="contained" color="primary">
        Primary
      </Button> */}
    </div>
  );
}

export default App;
