function SimplifyNodeNames(regionIn, doorIn){
    
}

function Parser(spoiler){
    // init desired variables
    let regionIn = "NULL"
    let doorIn = "NULL"
    let regionOut = "NULL"
    let doorOut = "NULL"
    let currentNodeType = "NULL"

    //enumerate through each value of the spoiler json
    for (const [key, value] of Object.entries(spoiler)){
        console.log(key, value); //debug output

        // split the KEY in the KEY:VALUE pair from the spoiler entry
        let split = key.split("->")

        // get the region you come from
        regionIn = split[0].trim()
        console.log("regionIn: " + regionIn) // debug output

        // get the door you walk into
        doorIn = split[1].trim()
        console.log("doorIn: " + doorIn) // debug output

        if (typeof(value) === "object"){ //overworld mapping
            // get the region you go into
            regionOut = value["region"]
            console.log("regionOut: " + regionOut) // debug output

            //get the door you walk out of
            doorOut = value["from"]
            console.log("doorOut: " + doorOut) // debug output

            // set potential node type
            currentNodeType = "overworld"
            console.log("currentNodeType: " + currentNodeType) // debug output
        }
        else if (typeof(value) === "string"){ //interior mapping
            // get the room you walk into
            regionOut = value
            console.log("regionOut: " + regionOut) // debug output

            // set potential node type
            currentNodeType = "interior"
            console.log("currentNodeType: " + currentNodeType) // debug output
            
        }
        else{ // neither overworld or interior - we don't know what this is
            console.log("ERROR PARSING SPOILER: value( " + value + " ) must be either an object or a string, not " + typeof(value)) // debug output
        }
    }
}

export default Parser