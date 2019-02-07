import React from "react";

import Calendar from "./components/Calendar";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="og-timeline">
        <main>
          <Calendar />
        </main>
      </div>
    );
  }
}

export default App;