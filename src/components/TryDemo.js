import { func } from "prop-types";
import demoSpoiler from "../assets/Demo_Spoiler.json";

function TryDemo(){
    //console.log(demoSpoiler)
    let entrances = demoSpoiler["entrances"]
    console.log(entrances)
    for (const [key, value] of Object.entries(entrances)){
        console.log(key, value);
        //console.log(typeof(value))
        if (typeof(value) === "object"){
            console.log("overworld")
        }
        else if (typeof(value) === "string"){
            console.log("interior")
        }
        else{
            console.log("wut")
        }
    }
    // Object.keys(entrances).forEach(function(key){
    //     if (typeof(entrances[key] === Object)){
    //         console.log("overworld")
    //     }
    //     else{
    //     console.log("interior")
    //     }
    // });
    alert("Balls Mahoney")
  }

  export default TryDemo