import React from 'react';
import logo from './logo.svg';
import './App.css';
import HistoryFetch from "./components/HistoryFetch";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <HistoryFetch />
      </header>
    </div>
  );
}

export default App;
