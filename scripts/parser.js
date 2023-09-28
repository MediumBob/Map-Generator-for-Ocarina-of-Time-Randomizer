/**
 * Ensures we don't map redundant nodes (e.g. "DMC Upper Nearby" and "DMC Lower Nearby" 
 * should both map to the same "Death Mountain Crater" node in our finished graph). 
 * @param {string} regionIn - the region you come from
 * @returns the simplified regionIn name
 */
function AdjustNodeNames(regionIn){ 
    // simplify overworld location names
    if (regionIn.includes("KF")){                                               // Kokiri Forest
        regionIn = "Kokiri Forest"
    }
    else if (regionIn.includes("LW")){                                          // Lost Woods
        regionIn = "Lost Woods"
    }
    else if (regionIn.includes("HF")){                                          // Hyrule Field
        regionIn = "Hyrule Field"
    }
    else if (regionIn.includes("Market") && regionIn !== "Market Entrance"){     // Market
        regionIn = "Market"
    }
    else if (regionIn.includes("Castle Grounds")){                              // Castle Grounds
        regionIn = "Castle Grounds"
    }
    else if (regionIn.includes("ToT")){                                         // Temple of Time Exterior
        regionIn = "Temple of Time Exterior"
    }
    else if (regionIn.includes("Kak")){                                         // Kakariko Village
        regionIn = "Kakariko Village"
    }
    else if (regionIn.includes("Graveyard")){                                   // Graveyard
        regionIn = "Graveyard"
    }
    else if (regionIn.includes("DMT") || regionIn.includes("Death Mountain")){ // Death Mountain Trail
        regionIn = "Death Mountain Trail"
    }
    else if (regionIn.includes("DMC")){                                        // Death Mountain Crater
        regionIn = "Death Mountain Crater"
    }
    else if (regionIn.includes("GC")){                                         // Goron City
        regionIn = "Goron City"
    }
    else if (regionIn.includes("LH")){                                         // Lake Hylia
        regionIn = "Lake Hylia"
    }
    else if (regionIn.includes("ZR")){                                         // Zora River
        regionIn = "Zora River"
    }
    else if (regionIn.includes("ZD")){                                         // Zoras Domain
        regionIn = "Zoras Domain"
    }
    else if (regionIn.includes("ZF")){                                         // Zoras Fountain
        regionIn = "Zoras Fountain"
    }
    else if (regionIn.includes("SFM")){                                        // Sacred Forest Meadow
        regionIn = "Sacred Forest Meadow"
    }
    else if (regionIn.includes("GV")){                                         // Gerudo Valley
        regionIn = "Gerudo Valley"
    }
    else if (regionIn.includes("GF")){                                         // Gerudo Fortress
        regionIn = "Gerudo Fortress"
    }
    else if (regionIn.includes("Wasteland")){                                  // Haunted Wasteland
        regionIn = "Haunted Wasteland"
    }
    else if (regionIn.includes("Desert Colossus")){                            // Desert Colossus
        regionIn = "Desert Colossus"
    }
    else if (regionIn.includes("LLR")){                                        // Lon Lon Ranch
        regionIn = "Lon Lon Ranch"
    }
    else{
        console.log("no adjustments")
    }
    return regionIn
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
function GenerateNodeProperties(nodeType){
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

function ReadSpoilerEntry(key, value){
    console.log(key, value); //debug output
    let regionIn, doorIn, regionOut, doorOut, currentNodeType

    // split the KEY in the KEY:VALUE pair from the spoiler entry (key format: "Region -> Door")
    const split = key.split("->")

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

        //get the door you walk out of
        doorOut = value["from"]

        // set potential node type
        currentNodeType = "overworld"
    }
    // if the VALUE in the KEY:VALUE pair from the spoiler entry is a string, it's an interior mapping
    else if (typeof(value) === "string"){
        // get the room you walk into
        regionOut = value

        // most interior locations only have one door (the front door). we will check for exceptions later
        doorOut = "Front Door"

        // set potential node type
        currentNodeType = "interior"
    }
    // if the VALUE in the KEY:VALUE pair from the spoiler entry is neither an object or a string, we don't know what this is
    else{
        console.log("ERROR PARSING ENTRANCES: value( " + value + " ) must be either an object or a string, not " + typeof(value)) // debug output
    }
    return [regionIn, doorIn, regionOut, doorOut, currentNodeType]
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
    console.log("inside parse");
    // init desired variables
    let regionIn, doorIn, regionOut, doorOut, currentNodeType;
    let graphDetails = {
        nodes: [], 
        links: []
    };

    //enumerate through each value of the spoiler json's entrance data - for each entry:
    for (const [key, value] of Object.entries(spoiler['entrances'])){
        // get the region you come from/go to, the door you walk into/out of, and note if this is an overworld or interior mapping
        [regionIn, doorIn, regionOut, doorOut, currentNodeType] = ReadSpoilerEntry(key,value);

        // check for owl flights
        if (regionIn.includes("Owl Flight")){
            doorIn = regionIn 
        }

        // specify LW Bridge exits
        if (regionIn.includes("LW") && regionIn === "LW Bridge"){
            doorIn = doorIn + " (From LW Bridge)" // Lost Woods has two doors to Kokiri Forest - this makes them distinct
        }

        // fix the region names so we don't map redundant nodes
        regionIn = AdjustNodeNames(regionIn);

        // check for boss rooms and adjust for boss doors (spoiler notation is backwards - the LHS of the "->" is the door and the RHS is the region. Makes sense when you're reading it, but opposite to the rest of the spoiler log)

        // determine node type
        let nodeType = GetNodeType(regionIn, doorIn, regionOut, currentNodeType);

        // create the edge label
        let edgeLabel = "from [" + regionIn.toUpperCase() + "] : take [" + doorIn + "] door\nfrom [" + regionOut.toUpperCase() + "] : take [" + doorOut + "] door";

        // determine the correct node properties
        //singleNodeProperties = GenerateNodeProperties(nodeType)
        
        // if regionIn is not in the nodes array, add it
        let existingElement = graphDetails.nodes.find(node => node.id === regionIn);
        if (!existingElement){
            graphDetails.nodes.push({id:regionIn, type:nodeType});
        }
        // if regionOut is not in the nodes array, add it (if it's not an overworld mapping)
        existingElement = graphDetails.nodes.find(node => node.id === regionOut)
        if (!existingElement && nodeType != 'overworld'){
            //regionOut = AdjustNodeNames(regionOut)
            graphDetails.nodes.push({id:regionOut, type:nodeType});
        }
        

        
        // FIXME: This is probably where we need to determine if the edge properties (if it's strictly or conditionally directed, if it's an owl flight, etc)
        graphDetails.links.push({source:regionIn, target:regionOut, label:edgeLabel});
        // console.log("adding " + regionOut + " to nodesTo")
        // nodesTo.push(regionOut)                                     // node to
        // console.log("adding \n" + edgeLabel + "\nto edgeLabels")
        // edgeLabels.push(edgeLabel)                                  // edge label
        // allNodeProperties[regionIn] = (singleNodeProperties)        // node properties
        //console.log(Object.entries(graphDetails))
    }//end for loop
    console.log(graphDetails.nodes);
    console.log(graphDetails.links);
    return graphDetails;
}

export { AdjustNodeNames, GetNodeType, GenerateNodeProperties, ReadSpoilerEntry, Parse };