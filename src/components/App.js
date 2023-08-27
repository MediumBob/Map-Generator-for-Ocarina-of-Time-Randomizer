import '../assets/css/App.css';
import React from 'react';
import { Upload } from "./Upload";
import TryDemo from './TryDemo';
import SeedHash from "./SeedHash";

function App() {
  return (
    <div className='page-container'>
      <section className="top-page-container">
        <header className="instructions">
          <h1>instructions</h1>
        </header>
      </section>
      <section className='center-page-container'>
        <aside className="map-tools">
          <div className='node-lookup-search-bar'>
          <h1>search bar</h1>
          </div>
          <div className='path-finder-container'>
            <div className='path-finder-search-bars'>
              <h1>node from</h1>
            </div>
            <div className='path-finder-search-bars'>
              <h1>node to</h1>
            </div>
            <div className='number-of-paths-entry'>
              <h1>num paths</h1>
            </div>
            <div className='path-finder-search-button'>
              <button>find path(s)</button>
            </div>
            <div className='path-finder-clear-button'>
              <button>clear</button>
            </div>
          </div>

          
        </aside>
        <section className='map-container'>
          <div className='map-header'>
            <div className='version'>
              <h1>version</h1>
            </div>
            <div className='seed-hash'>
              <h1>seed hash</h1>
            </div>
          </div>
          <div>
            <Upload>
              <button>Upload Spoiler File</button>
            </Upload>
            <button onClick={TryDemo}>Try Demo!</button>
          </div>
        </section>
        <aside className="map-details">
          <h1>This is where the node details go</h1>
        </aside>
      </section>
      <section className='bottom-page-container'>
        <h1>henlo</h1>
      </section>
    </div>
  );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);

export default App