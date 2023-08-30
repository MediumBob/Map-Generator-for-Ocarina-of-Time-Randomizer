$(document).ready(function(){
    $("#spoilerUpload").on("change", UploadSpoiler);
});

let spoiler;

function UploadSpoiler(event){
    let spoilerUpload = event.target;
    let files = spoilerUpload.files;

    let demoSpoiler = files[0]
    let fileReader = new FileReader();

    fileReader.onload = function(event){
        let fileContents = event.target.result;
        //$("#preview").text(fileContents);
        spoiler = JSON.parse(fileContents)
        console.log(spoiler)
    }
    fileReader.readAsText(demoSpoiler);

}