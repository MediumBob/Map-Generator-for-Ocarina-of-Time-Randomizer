// import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from 'axios';


import { Upload } from "./Upload";
// import ReactDOM from "react-dom";

function App() {
  return (
    <div className="FrontPage">
      <div className="SearchBar FrontPageCommon">
        <h1>This is where the instructions go</h1>
      </div>
      <div className='PrimaryTools'>
        <aside className="Tools FrontPageCommon">
          <h1>This is where the tools (like the search bar and path-finder) go</h1>
        </aside>
        <div className="MapWindow FrontPageCommon">
          <Upload>
            <button>Upload Spoiler File</button>
          </Upload>
        </div>
        <aside className="Info FrontPageCommon">
          <h1>This is where the node details go</h1>
        </aside>
      </div>
      <div className='FrontPageCommon'>
        <h1>Useless section at the bottom</h1>
      </div>
    </div>
  );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);

export default App