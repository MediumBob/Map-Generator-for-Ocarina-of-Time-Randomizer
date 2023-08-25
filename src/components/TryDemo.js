import { func } from "prop-types";
import demoSpoiler from "../assets/Demo_Spoiler.json";
import Parse from "./Parser"

function TryDemo(){
    //console.log(demoSpoiler)
    let entrances = demoSpoiler["entrances"]
    //console.log(entrances)
    Parse(entrances)
  }

  export default TryDemo