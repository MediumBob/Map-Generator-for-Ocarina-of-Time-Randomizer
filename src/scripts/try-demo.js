document.getElementById('loadDemoSpoiler').addEventListener('click', loadDemo);

function loadDemo(){
    xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://raw.githubusercontent.com/MediumBob/OoT_RandomizerMappingTool/main/src/assets/demo-spoiler.json', true);

    xhr.onload = function(){
        if(this.status == 200){
            console.log(this.responseText);
        }
    }
    xhr.send();
}