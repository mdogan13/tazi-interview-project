import React from 'react';
import './App.css';
import ConfigList from './components/ConfigList/ConfigList';

let userConfigData={
  schema1:['a','b','c'],
  schema2:['d','e','f']
}
function App() {
  return (
    <div className="App">
      <header className="App-header">
    <ConfigList configData={userConfigData}/>
      </header>
    </div>
  );
}

export default App;
