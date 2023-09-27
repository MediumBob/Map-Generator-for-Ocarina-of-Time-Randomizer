import {Parse} from './parser.js';

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
/**
 * async function to display the version number from the selected spoiler json
 * @param {string} version - the version number (format: "x.x.x Release")
 */
function RenderVersion(version){
    // get DOM element for displaying version number
    let versionNumber = document.getElementById('version')

    // update the DOM with the version number
    versionNumber.innerHTML += version

    // init variables for checking version validity
    const urlPrefix = 'https://github.com/MediumBob/OoT_RandomizerMappingTool/blob/main/assets/images/' // for checkmark/warning icons
    let iconPath;
    let icon = document.createElement('img')
    const split = version.split('.')

    // check if version is valid (7.1 or greater)
    if ((parseInt(split[0]) < 7) && (parseInt(split[1] < 1))){
        versionNumber.style.color = "#e8b300" // orange
        iconPath = `${urlPrefix}warning.png?raw=true`
    }
    else{
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
    const urlPrefix = 'https://github.com/MediumBob/OoT_RandomizerMappingTool/blob/main/assets/images/Seed%20Hash/'
    
    // get DOM element for displaying seed hash
    let hashImages = document.getElementById('seed-hash')

    // append images to DOM
    for (let i=0; i < hash.length; i++){
        let image = document.createElement('img')
        let imagePath = `${urlPrefix}${hash[i]}.png?raw=true`
        image.src = decodeURI(imagePath)
        hashImages.appendChild(image)
    }
}

// URL for demo spoiler (from the github repo) 
const demoSpoilerURL = 'https://raw.githubusercontent.com/MediumBob/OoT_RandomizerMappingTool/main/assets/demo-spoiler.json';

// add event listener to the "Try Demo!" button on the main page
document.getElementById('loadDemoSpoiler').addEventListener('click', function () {
    // load the demo spoiler
    loadDemo(demoSpoilerURL, function(demoSpoiler){
        // show version number
        RenderVersion(demoSpoiler[':version'])

        // show seed hash
        RenderSeedHash(demoSpoiler['file_hash'])

        // parse the entrance info
        const entranceData = Parse(demoSpoiler)
        
        // generate the graph

        // update the DOM

    })
});

