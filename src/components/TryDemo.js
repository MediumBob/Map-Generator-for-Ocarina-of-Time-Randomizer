import demoSpoiler from "../assets/Demo_Spoiler.json";
import Parse from "./Parser"
import CreateGraph from "./Mapper"

/**
 * Builds the graph from the demo spoiler if the user clicks the "Try Demo!" button on the main page
 */
function TryDemo(){
    // load entrance data from the demo spoiler
    let entrances = demoSpoiler["entrances"]

    // derive graph details from the demo spoiler's entrance data
    let graphDetails = Parse(entrances)

    // create graph object from the details returned from the parser
    let graph = CreateGraph(graphDetails)

    // 
    alert(graph)
  }

  export default TryDemo