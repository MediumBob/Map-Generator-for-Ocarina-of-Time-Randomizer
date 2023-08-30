/**
 * Ensures we don't map redundant nodes (e.g. "DMC Upper Nearby" and "DMC Lower Nearby" 
 * should both map to the same "Death Mountain Crater" node in our finished graph). 
 * @param {string} regionIn - the region you come from
 * @param {string} doorIn - the door you walk into (used only for clarification on LW bridge - see "Lost Woods" section below)
 * @returns the simplified regionIn name, as well as the updated doorIn (which will only change for owl flights and LW bridge nodes)
 */
function SimplifyNodeNames(regionIn, doorIn){
    // adjust doorIn for owl flights (must do this first, or else we lose this information)
    if (regionIn.includes("Owl Flight")){
        doorIn = regionIn // we need this line to correctly identify owl flights later on, due to how the spoiler documents them
        // console.log("set doorIn to " + doorIn)
    }
    
    // simplify overworld location names
    if (regionIn.includes("KF")){                                               // Kokiri Forest
        regionIn = "Kokiri Forest"
        // console.log("set regionIn to " + regionIn)
    }
    else if (regionIn.includes("LW")){                                          // Lost Woods
        if (regionIn === "LW Bridge"){
            doorIn = doorIn + " (From LW Bridge)" // Lost Woods has two doors to Kokiri Forest - this makes them distinct
        }
        regionIn = "Lost Woods"
        // console.log("set regionIn to " + regionIn)
    }
    else if (regionIn.includes("HF")){                                          // Hyrule Field
        regionIn = "Hyrule Field"
        // console.log("set regionIn to " + regionIn)
    }
    else if (regionIn.includes("Market") && regionIn !== "Market Entrance"){     // Market
        regionIn = "Market"
        // console.log("set regionIn to " + regionIn)
    }
    else if (regionIn.includes("Castle Grounds")){                              // Castle Grounds
        regionIn = "Castle Grounds"
        // console.log("set regionIn to " + regionIn)
    }
    else if (regionIn.includes("ToT")){                                         // Temple of Time Exterior
        regionIn = "Temple of Time Exterior"
        // console.log("set regionIn to " + regionIn)
    }
    else if (regionIn.includes("Kak")){                                         // Kakariko Village
        regionIn = "Kakariko Village"
        // console.log("set regionIn to " + regionIn)
    }
    else if (regionIn.includes("Graveyard")){                                   // Graveyard
        regionIn = "Graveyard"
        // console.log("set regionIn to " + regionIn)
    }
    else if (regionIn.includes("DMT") || regionIn.includes("Death Mountain")){ // Death Mountain Trail
        regionIn = "Death Mountain Trail"
        // console.log("set regionIn to " + regionIn)
    }
    else if (regionIn.includes("DMC")){                                        // Death Mountain Crater
        regionIn = "Death Mountain Crater"
        // console.log("set regionIn to " + regionIn)
    }
    else if (regionIn.includes("GC")){                                         // Goron City
        regionIn = "Goron City"
        // console.log("set regionIn to " + regionIn)
    }
    else if (regionIn.includes("LH")){                                         // Lake Hylia
        regionIn = "Lake Hylia"
        // console.log("set regionIn to " + regionIn)
    }
    else if (regionIn.includes("ZR")){                                         // Zora River
        regionIn = "Zora River"
        // console.log("set regionIn to " + regionIn)
    }
    else if (regionIn.includes("ZD")){                                         // Zoras Domain
        regionIn = "Zoras Domain"
        // console.log("set regionIn to " + regionIn)
    }
    else if (regionIn.includes("ZF")){                                         // Zoras Fountain
        regionIn = "Zoras Fountain"
        // console.log("set regionIn to " + regionIn)
    }
    else if (regionIn.includes("SFM")){                                        // Sacred Forest Meadow
        regionIn = "Sacred Forest Meadow"
        // console.log("set regionIn to " + regionIn)
    }
    else if (regionIn.includes("GV")){                                         // Gerudo Valley
        regionIn = "Gerudo Valley"
        // console.log("set regionIn to " + regionIn)
    }
    else if (regionIn.includes("GF")){                                         // Gerudo Fortress
        regionIn = "Gerudo Fortress"
        // console.log("set regionIn to " + regionIn)
    }
    else if (regionIn.includes("Wasteland")){                                  // Haunted Wasteland
        regionIn = "Haunted Wasteland"
        // console.log("set regionIn to " + regionIn)
    }
    else if (regionIn.includes("Desert Colossus")){                            // Desert Colossus
        regionIn = "Desert Colossus"
        // console.log("set regionIn to " + regionIn)
    }
    else if (regionIn.includes("LLR")){                                        // Lon Lon Ranch
        regionIn = "Lon Lon Ranch"
        // console.log("set regionIn to " + regionIn)
    }
    else{
        // console.log("SimplifyNodeNames made no adjustments")
    }

    // return the simplified regionIn and doorIn (doorIn is only included here for clarification on LW bridge mappings and for owl flights)
    const returnValues = [regionIn, doorIn]
    return returnValues
}


/**
 * Determines the node type for a single spoiler entry
 * @param {string} regionIn - the region you come from
 * @param {string} doorIn - the door you walk into
 * @param {string} regionOut - the region you go to
 * @param {string} currentNodeType - either "overworld" or "interior" - we refine these further here
 * @returns the appropriate node type
 */
function GetNodeType(regionIn, doorIn, regionOut, currentNodeType){
    // at this point, we only know if its an overworld or interior node
    let nodeType = currentNodeType
    
    // check for specific node type based on entry details
    if (regionIn.includes("Boss Door")){
        nodeType = "boss door"
    }
    else if (regionIn.includes("Spawn")){
        nodeType = "spawn"
    }
    else if (regionIn.includes("Warp") && regionIn !== "GC Woods Warp" && regionIn !== "Graveyard Warp Pad Region"){
        nodeType = "song"
    }
    else if (doorIn.includes("Owl Flight")){ // this is why we needed to update doorIn at the top of SimplifyNodeNames - we simplified regionIn already at this point
        nodeType = "owl flight"
    }
    else if (doorIn.includes("Lobby") || doorIn.includes("Beginning") || doorIn.includes("Well") || (doorIn.includes("Temple") && !doorIn.includes("Time"))){
        nodeType = "dungeon"
    }
    else if (regionOut.includes("Grotto") || regionOut === "Deku Theater"){
        nodeType = "grotto"
    }
    else if (regionOut.includes("Grave") && !regionOut.includes("House")){
        nodeType = "grave"
    }
    else if (regionOut.includes("Great Fairy Fountain")){
        nodeType = "great fairy fountain"
    }
    return nodeType
}


/**
 * Generate appropriate node properties based on the node type
 * @param {string} regionIn
 * @param {string} nodeType
 * @returns a dictionary of the node's properties
 */
function DetermineNodeProperties(nodeType){
    // init desired properties
    let nodeShape, nodeColor, nodeSize, edgeColor

    //set node properties
    if (nodeType === 'overworld'){
        nodeShape = 'ellipse'
        nodeColor = '#0081a7' // blue
        nodeSize = 25
    }
    else if (nodeType === 'interior'){
        nodeShape = 'box'
        nodeColor = '#db9f00' // orange
        nodeSize = 20
    }
    else if (nodeType === 'boss door'){
        nodeShape = 'dot'
        nodeColor = 'black'
        nodeSize = 1
    }
    else if (nodeType === 'spawn'){
        nodeShape = 'star'
        nodeColor = 'white'
        nodeSize = 30
    }
    else if (nodeType === 'song'){
        nodeShape = 'star'
        nodeColor = 'blue'
        nodeSize = 20
    }
    else if (nodeType === 'owl flight'){
        nodeShape = 'dot'
        nodeColor = 'black'
        nodeSize = 1
    }
    else if (nodeType === 'dungeon'){
        nodeShape = 'triangleDown'
        nodeColor = 'red'
        nodeSize = 25
    }
    else if (nodeType === 'grotto'){
        nodeShape = 'dot'
        nodeColor = '#a5550a' // brown
        nodeSize = 1
    }
    else if (nodeType === 'grave'){
        nodeShape = 'dot'
        nodeColor = '#9a9a9a' // gray
        nodeSize = 1
    }
    else if (nodeType === 'great fairy fountain'){
        nodeShape = 'dot'
        nodeColor = 'black'
        nodeSize = 1
    }
    edgeColor = nodeColor // default; will change for special cases elsewhere
    
    // update node properties for a single entry from the spoiler
    let nodeProperty = {'node type':nodeType, 'node shape':nodeShape, 'node color':nodeColor, 'node size':nodeSize, 'edge color':edgeColor}
    return nodeProperty
}


/**
 * Builds up the following arrays/dictionaries based on the spoiler data:
 *  1. nodesFrom - all the regions you come from
 *  2. nodesTo - all the regions you go to
 *  3. edgeLabels - all the edge labels (what door you walked into/out of)
 *  4. singleNodeProperties - stores the following node properties for a single entry of the spoiler:
 *     i.   nodeType (overworld, interior, dunegon, grotto, etc.)
 *     ii.  nodeShape
 *     iii. nodeColor
 *     vi.  nodeSize
 *     v.   edgeColor
 *  5. allNodeProperties - associates the values from singleNodeProperties(4) to the appropriate value from nodesFrom(1)
 * This information is used by the Mapper to generate our graph.
 * 
 * @param {object} spoiler - the JSON data from the spoiler file
 * @returns a dictionary storing all the details that the Mapper will need to generate our graph
 */
function Parse(spoiler){
    // init desired variables
    var regionIn, doorIn, regionOut, doorOut, currentNodeType, 
        nodesFrom = [], nodesTo = [], edgeLabels = [], singleNodeProperties = {}, allNodeProperties = {}

    //enumerate through each value of the spoiler json
    for (const [key, value] of Object.entries(spoiler)){
        console.log(key, value); //debug output

        // split the KEY in the KEY:VALUE pair from the spoiler entry
        let split = key.split("->")

        // get the region you come from
        regionIn = split[0].trim()
        //console.log("regionIn: " + regionIn) // debug output

        // get the door you walk into
        doorIn = split[1].trim()
        //console.log("doorIn: " + doorIn) // debug output

        // if the VALUE in the KEY:VALUE pair from the spoiler entry is an object (dictionary), it's an overworld mapping
        if (typeof(value) === "object"){
            // get the region you go to
            regionOut = value["region"]
            //console.log("regionOut: " + regionOut) // debug output

            //get the door you walk out of
            doorOut = value["from"]
            //console.log("doorOut: " + doorOut) // debug output

            // set potential node type
            currentNodeType = "overworld"
            //console.log("currentNodeType: " + currentNodeType) // debug output
        }
        // if the VALUE in the KEY:VALUE pair from the spoiler entry is a string, it's an interior mapping
        else if (typeof(value) === "string"){
            // get the room you walk into
            regionOut = value
            //console.log("regionOut: " + regionOut) // debug output

            // most interior locations only have one door, the front door. we will check for exceptions later
            doorOut = "Front Door"
            //console.log("doorOut: " + doorOut)

            // set potential node type
            currentNodeType = "interior"
            //console.log("currentNodeType: " + currentNodeType) // debug output
            
        }
        // if the VALUE in the KEY:VALUE pair from the spoiler entry is neither an object or a string, we don't know what this is
        else{
            console.log("ERROR PARSING SPOILER: value( " + value + " ) must be either an object or a string, not " + typeof(value)) // debug output
        }

        // fix the region names so we don't map redundant nodes (doorIn only here for clarification - see SimplifyNodeNames())
        let simplifiedNames = SimplifyNodeNames(regionIn, doorIn)
        regionIn = simplifiedNames[0]
        doorIn = simplifiedNames[1]

        // determine what type of node we're looking at
        let nodeType = GetNodeType(regionIn, doorIn, regionOut, currentNodeType)

        // create the edge label
        let edgeLabel = "from [" + regionIn.toUpperCase() + "] : take [" + doorIn + "] door\nfrom [" + regionOut.toUpperCase() + "] : take [" + doorOut + "] door"

        // determine the correct node properties
        singleNodeProperties = DetermineNodeProperties(nodeType)
        
        // store details for this entry
        //console.log("adding " + regionIn + " to nodesFrom")
        nodesFrom.push(regionIn)                                    // node from
        //console.log("adding " + regionOut + " to nodesTo")
        nodesTo.push(regionOut)                                     // node to
        //console.log("adding \n" + edgeLabel + "\nto edgeLabels")
        edgeLabels.push(edgeLabel)                                  // edge label
        allNodeProperties[regionIn] = (singleNodeProperties)        // node properties
        console.log(Object.entries(allNodeProperties))
    }//end for loop

    // gather graph details into an object we can give to the mapper
    const graphDetails = {
        "nodesFrom" : nodesFrom,
        "nodesTo" : nodesTo,
        "edgeLabels" : edgeLabels,
        "nodeProperties" : allNodeProperties
    }
    return graphDetails
}

export { SimplifyNodeNames, GetNodeType, DetermineNodeProperties, Parse }