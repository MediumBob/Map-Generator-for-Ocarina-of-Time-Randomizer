import * as Parser from './parser.js';

document.getElementById('loadDemoSpoiler').addEventListener('click', loadDemo);

/**
 * 
 */
function loadDemo(){
    let demoSpoiler;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://raw.githubusercontent.com/MediumBob/OoT_RandomizerMappingTool/main/src/assets/demo-spoiler.json', true);

    xhr.onload = function(){
        if(this.status == 200){
            console.log(this.responseText);
            demoSpoiler = this.responseText
        }
    }
    xhr.send();
    console.log(typeof demoSpoiler)
    //const ret = Parser.Parse(JSON.parse(demoSpoiler))
    //console.log(ret)
    //alert(1)
}

