import React from "react";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// import components
import NavigationBar from "./components/Navigationbar";
import MainGrid from "./components/MainGrid";

function App() {
  return (
    <div>
      <NavigationBar></NavigationBar>
      <MainGrid></MainGrid>
    </div>
  );
}

export default App;
