import React from 'react';
import './App.css';
import {getData} from "./services/api/api";
function App() {
  return (
    <div className="App">
      hello
        <div onClick={() => getData("http://localhost:3005/api/data")}>click</div>
    </div>
  );
}

export default App;
