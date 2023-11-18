import {Parse} from './parser.js';
import {GenerateGraph} from './mapper.js';


// URL for demo spoiler (from the github repo) 
const demoSpoilerURL = 'https://raw.githubusercontent.com/MediumBob/OoT_RandomizerMappingTool/main/assets/demo-spoiler.json';

// event listener for when the user clicks the "Try Demo!" button on the main page
document.getElementById('loadDemoSpoiler').addEventListener('click', function () {
    // load the demo spoiler
    loadDemo(demoSpoilerURL, function(demoSpoiler){
        // parse the entrance data and update the main page
        Generate(demoSpoiler);
    })
});

// event listener for when the user clicks the "Upload" button on the main page
document.getElementById('spoilerUpload').addEventListener('change', function(event) {
    let file = event.target.files[0];

    // Check if the file is a JSON file
    if (file.type !== 'application/json') {
        alert('Invalid spoiler - please upload a JSON file.');
        return;
    }
    
    let reader = new FileReader();
    
    reader.onload = function() {
        // store user json as a JSON object
        let userSpoiler = JSON.parse(reader.result);    

        // parse the entrance data and update the main page
        Generate(userSpoiler);
    };
    
   reader.readAsText(file);
});


/**
 * 
 * @param {*} spoiler 
 */
function Generate(spoiler){
    // check if 'entrances' key exists in the JSON object
    if (!spoiler.hasOwnProperty('entrances')) {
        alert('The JSON file does not contain an \'entrances\' array. \nNOTE: This is unexpected behavior! Are you sure the spoiler generated properly?');
    }
    // check if it's empty
    if (Object.keys(spoiler['entrances']).length === 0){
        alert("The JSON file does not contain any shuffled entrance data - the map should be vanilla.")
    }

    // show version number
    RenderVersion(spoiler[':version'])

    // show seed hash
    RenderSeedHash(spoiler['file_hash'])

    // parse the entrance info
    const entranceData = Parse(spoiler['entrances'])
    
    // generate the graph
    const map = GenerateGraph(entranceData)

    // update the DOM
    const div = d3.select("#map-window");
    div.node().appendChild(map);
}


/**
 * async function to display the version number from the selected spoiler json
 * @param {string} version - the version number (format: "x.x.x Release")
 */
function RenderVersion(version){
    // get DOM element for displaying version number
    let versionNumber = document.getElementById('version')

    // clear the window
    while (versionNumber.firstChild){
        versionNumber.removeChild(versionNumber.firstChild);
    }

    // update the window with the version number
    versionNumber.innerHTML = "Version: " + version

    // init variables for checking version validity
    const urlPrefix = 'https://github.com/MediumBob/OoT_RandomizerMappingTool/blob/main/assets/images/' // for checkmark/warning icons
    let iconPath;
    let icon = document.createElement('img')
    const split = version.split('.')

    // check if version is valid (7.1 or greater)
    if ((parseInt(split[0]) < 7) && (parseInt(split[1] < 1))){
        // if version prior to 7.1.x, show warning
        versionNumber.style.color = "#e8b300" // orange
        iconPath = `${urlPrefix}warning.png?raw=true`
    }
    else{
        // if version 7.1 or newer, show checkmark
        versionNumber.style.color = "#49ff00" //green
        iconPath = `${urlPrefix}checkmark.png?raw=true`
    }
    icon.src = decodeURI(iconPath)
    versionNumber.appendChild(icon)
}


/**
 * 
 * @param {*} hash 
 */
function RenderSeedHash(hash){
    // URL where hash images are located
    const urlPrefix = 'https://github.com/MediumBob/OoT_RandomizerMappingTool/blob/main/assets/images/seed-hash/'
    
    // get DOM element for displaying seed hash
    let hashImages = document.getElementById('seed-hash')

    // clear any previous images (if user clicked upload multiple times)
    while (hashImages.firstChild){
        hashImages.removeChild(hashImages.firstChild);
    }

    // append images to DOM
    hashImages.innerHTML = "Seed Hash: "
    for (let i=0; i < hash.length; i++){
        let image = document.createElement('img')
        let imagePath = `${urlPrefix}${hash[i]}.png?raw=true`
        image.src = decodeURI(imagePath)
        hashImages.appendChild(image)
    }
}


/**
 * send an http GET request to the specified path
 * @param {string} path - target URL for the GET request
 * @param {function} callback - function to execute on the response
 */
function loadDemo(path, callback){
    const request = new XMLHttpRequest();
    request.open('GET', path, true);
    request.onload = function(){
        if (this.status === 200){
            const response = JSON.parse(this.responseText)
            callback(response);
        }
    }
    request.send();
}