import {Parse} from './parser.js';

/**
 * @typedef {string} JSON - define json object
 * @typedef {function(JSON): Processor} - processes valid json data
 */

/**
 * send an http GET request to the specified path
 * @param {string} path - target URL for the GET request
 * @param {Processor} callback - processes the json file (parses required fields, generates associated graph)
 */
function loadDemo(path, callback){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', path, true);
    xhr.onload = function(){
        if (this.status === 200){
            const response = JSON.parse(this.responseText)
            callback(response);
        }
    }
    xhr.send();
}

// store url for demo spoiler from the github repo 
const demoSpoilerURL = 'https://raw.githubusercontent.com/MediumBob/OoT_RandomizerMappingTool/main/src/assets/demo-spoiler.json';

// add event listener to the "Try Demo!" button on the main page
document.getElementById('loadDemoSpoiler').addEventListener('click', function () {
    // load the demo spoiler
    loadDemo(demoSpoilerURL, function(demoSpoiler){
        // parse the entrance info
        const entranceData = Parse(demoSpoiler)
        
        // generate the graph

        // update the DOM

    })
});

