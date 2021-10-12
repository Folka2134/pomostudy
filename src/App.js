import React from "react"; //  useContext

import PomoBar from "./components/pomobar/pomobar.component";
// import Countdown from "./components/countdown/countdown.component";
// import { SettingContext } from "./context/settings-context";

import "./App.css";

const App = () => {
  // const { pomodoro } = useContext(SettingContext);
  return (
    <div className="App">
      <div>
        <PomoBar />
      </div>
    </div>
  );
};

export default App;
