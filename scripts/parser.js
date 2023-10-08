/**
 * Ensures we don't map redundant nodes (e.g. "DMC Upper Nearby" and "DMC Lower Nearby" 
 * should both map to the same "Death Mountain Crater" node in our finished graph). 
 * @param {string} region - the region to be adjusted
 * @returns the simplified regionIn name
 */
function AdjustNodeNames(region){ 
    // simplify dungeon names
    if (region.includes("Boss Door") || region.includes("Beginning")){
        region = region.slice(0,-10);
    }
    else if (region.includes("Entryway")){
        region = region.slice(0,-9);
    }
    else if (region.includes("Lobby") || region.includes("Lower")){
        region = region.slice(0,-6);
    }

    // simplify overworld location names
    if (region.includes("KF")){                                                // Kokiri Forest
        region = "Kokiri Forest";
    }
    else if (region.includes("LW")){                                                // Lost Woods
        region = "Lost Woods";
    }
    else if (region.includes("HF")){                                                // Hyrule Field
        region = "Hyrule Field";
    }
    else if (region.includes("Market") && region !== "Market Entrance"){            // Market
        region = "Market";
    }
    else if (region.includes("Castle Grounds")){                                    // Castle Grounds
        region = "Castle Grounds";
    }
    else if (region.includes("ToT")){                                               // Temple of Time Exterior
        region = "Temple of Time Exterior";
    }
    else if (region.includes("Kak")){                                               // Kakariko Village
        region = "Kakariko Village";
    }
    else if (region.includes("Graveyard")){                                         // Graveyard
        region = "Graveyard";
    }
    else if (region.includes("DMT") || region.includes("Death Mountain")){          // Death Mountain Trail
        region = "Death Mountain Trail";
    }
    else if (region.includes("DMC")){                                               // Death Mountain Crater
        region = "Death Mountain Crater";
    }
    else if (region.includes("GC")){                                                // Goron City
        region = "Goron City";
    }
    else if (region.includes("LH")){                                                // Lake Hylia
        region = "Lake Hylia";
    }
    else if (region.includes("ZR")){                                                // Zora River
        region = "Zora River";
    }
    else if (region.includes("ZD")){                                                // Zoras Domain
        region = "Zoras Domain";
    }
    else if (region.includes("ZF")){                                                // Zoras Fountain
        region = "Zoras Fountain";
    }
    else if (region.includes("SFM")){                                               // Sacred Forest Meadow
        region = "Sacred Forest Meadow";
    }
    else if (region.includes("GV")){                                                // Gerudo Valley
        region = "Gerudo Valley";
    }
    else if (region.includes("GF")){                                                // Gerudo Fortress
        region = "Gerudo Fortress";
    }
    else if (region.includes("Wasteland")){                                         // Haunted Wasteland
        region = "Haunted Wasteland";
    }
    else if (region.includes("Desert Colossus")){                                   // Desert Colossus
        region = "Desert Colossus";
    }
    else if (region.includes("LLR")){                                               // Lon Lon Ranch
        region = "Lon Lon Ranch";
    }
    else{
        //console.log("no adjustments");
    }
    return region
}


/**
 * Determines the node type for a single spoiler entry
 * @param {string} regionIn - the region you come from
 * @param {string} tentativeNodeType - either "overworld" or "interior" - we refine these further here
 * @returns the appropriate node type
 */
function GetNodeType(regionIn, tentativeNodeType){
    // at this point, we only know if its an overworld or interior node
    let nodeType = tentativeNodeType
    
    // check for specific node type based on entry details
    if (nodeType === 'overworld'){
        if (regionIn.includes("Boss Door") || regionIn.includes("Lobby") || regionIn.includes("Beginning") || regionIn === "Ice Cavern" || regionIn === "Gerudo Training Ground"){
            nodeType = "dungeon"
        }
        // else if (doorIn.includes("Lobby") || doorIn.includes("Beginning") || doorIn.includes("Well") || (doorIn.includes("Temple") && !doorIn.includes("Time"))){
        //     nodeType = "dungeon"
        // }
    }
    else if (nodeType === 'interior'){
        if (regionIn.includes("Grotto") || regionIn === "Deku Theater"){
            nodeType = "grotto"
        }
        else if (regionIn.includes("Grave") && !regionIn.includes("House")){
            nodeType = "grave"
        }
        else if (regionIn.includes("Great Fairy Fountain")){
            nodeType = "great fairy fountain"
        }
    }
    else {
        // should throw an error here or something - nodeType should always be either overworld or interior at this point
    }
    if (regionIn.includes("Spawn")){
        nodeType = "spawn"
    }
    if (regionIn.includes("Warp") && regionIn !== "GC Woods Warp" && regionIn !== "Graveyard Warp Pad Region"){
        nodeType = "song"
    }
    return nodeType
}


/**
 * 
 * @param {*} key 
 * @param {*} value 
 * @returns 
 */
function ReadSpoilerEntry(key, value){
    console.log(key, value); //debug output
    let regionIn, doorIn, regionOut, doorOut, tentativeNodeType

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
        tentativeNodeType = "overworld"
    }
    // if the VALUE in the KEY:VALUE pair from the spoiler entry is a string, it's an interior mapping
    else if (typeof(value) === "string"){
        // get the room you walk into
        regionOut = value

        // most interior locations only have one door (the front door). we will check for exceptions later
        doorOut = "Front Door"

        // set potential node type
        tentativeNodeType = "interior"
    }
    // if the VALUE in the KEY:VALUE pair from the spoiler entry is neither an object or a string, we don't know what this is
    else{
        console.log("ERROR PARSING ENTRANCES: value( " + value + " ) must be either an object or a string, not " + typeof(value)) // debug output
    }
    return [regionIn, doorIn, regionOut, doorOut, tentativeNodeType]
}


/**
 * Extracts relevant data from the spoiler that the mapper needs to 
 * generate the network graph.
 * @param {object} spoiler - the JSON data from the spoiler file
 * @returns 
 */
function Parse(spoiler){
    console.log("inside parse");
    // init desired variables
    let regionIn, doorIn, regionOut, doorOut, tentativeNodeType;
    let graphDetails = {
        nodes: [], 
        links: []
    };

    //enumerate through each value of the spoiler json's entrance data - for each entry:
    for (const [key, value] of Object.entries(spoiler['entrances'])){
        // get the region you come from/go to, the door you walk into/out of, and note if this is an overworld or interior mapping
        [regionIn, doorIn, regionOut, doorOut, tentativeNodeType] = ReadSpoilerEntry(key,value);

        // check for exceptions before we do anything else:
        // check for owl flights
        if (regionIn.includes("Owl Flight")){
            doorIn = regionIn 
        }

        // specify LW Bridge exits
        if (regionIn === "LW Bridge"){
            doorIn = doorIn + " (From LW Bridge)" // Lost Woods has two doors to Kokiri Forest - this makes them distinct
        }

        // determine node type
        let nodeType = GetNodeType(regionIn, tentativeNodeType);
        
        // simplify the region names so we don't map redundant nodes
        let regionInAdjusted = AdjustNodeNames(regionIn); 
        let regionOutAdjusted = AdjustNodeNames(regionOut);

        // create the edge label
        let edgeLabel = "from [" + regionInAdjusted.toUpperCase() + "] : take [" + doorIn + "] door\nfrom [" + AdjustNodeNames(regionOutAdjusted).toUpperCase() + "] : take [" + doorOut + "] door";
        
        console.log("RegionIn: " + regionIn)
        console.log("RegionInAdjusted: " + regionInAdjusted)
        console.log("regionOut: " + regionOut)
        console.log("regionOutAdjusted: " + regionOutAdjusted)
        console.log("nodeType: " + nodeType)

        // node details will change depending on a few factors.
        // 1. is this an overworld mapping?
        if (tentativeNodeType === "overworld"){

        }

        console.log("checking graphDetails.nodes for " + regionInAdjusted)
        // if regionInAdjusted is not in the nodes array, add it
        let existingElement = graphDetails.nodes.find(node => node.id === regionInAdjusted);
        if (!existingElement){
            if (nodeType === "dungeon"){
                graphDetails.nodes.push({id:regionInAdjusted, type:nodeType, boss:regionOut.slice(0,-10)});
            }
            else {
                graphDetails.nodes.push({id:regionInAdjusted, type:nodeType});
            }
        }
        // if this is an overworld mapping, add regionOutAdjusted to the nodes array (if it's not already included)
        if (tentativeNodeType === "overworld" && nodeType != "dungeon"){
            existingElement = graphDetails.nodes.find(node => node.id === AdjustNodeNames(regionOut));
            if (!existingElement){
                graphDetails.nodes.push({id:regionOutAdjusted, type:GetNodeType(regionOutAdjusted, tentativeNodeType)});
            }
        }
        // if this is an interior mapping, add the raw regionOut to the nodes array (if it's not already included)
        if (tentativeNodeType === "interior"){
            existingElement = graphDetails.nodes.find(node => node.id === regionOut);
            if (!existingElement){
                graphDetails.nodes.push({id:regionOut, type:GetNodeType(regionOut, tentativeNodeType)});
            }
        }
        

        // if regionOut is not in the nodes array (and it's a node we want to add), add it
        // console.log("checking graphDetails.nodes for " + AdjustNodeNames(regionOut))
        // existingElement = graphDetails.nodes.find(node => node.id === AdjustNodeNames(regionOut));
        // if (!(nodeType === "dungeon") && !existingElement){
        //     graphDetails.nodes.push({id:AdjustNodeNames(regionOut), type:"skipping for now"});
        // }

        // if this is an interior mapping? OUTDATED:(if regionOut is not in the nodes array, add it (if it's not an overworld mapping))
        // existingElement = graphDetails.nodes.find(node => node.id === regionOut)
        // if (!existingElement && nodeType === 'interior'){
        //     //regionOut = AdjustNodeNames(regionOut)
        //     graphDetails.nodes.push({id:regionOut, type:nodeType});
        //     console.log(regionOut + " not in nodes array - appending")
        // }
        
        // FIXME: This is probably where we need to determine if the edge properties (if it's strictly or conditionally directed, if it's an owl flight, etc)
        if (tentativeNodeType === "interior"){
            graphDetails.links.push({source:regionInAdjusted, target:regionOut, label:edgeLabel})
        }
        else if (tentativeNodeType === "overworld"){
            if (!regionOut.includes("Boss Room")){
                graphDetails.links.push({source:regionInAdjusted, target:regionOutAdjusted, label:edgeLabel});
            }
        }

    }//end for loop
    console.log(graphDetails.nodes);
    console.log(graphDetails.links);
    return graphDetails;
}

export { AdjustNodeNames, GetNodeType, ReadSpoilerEntry, Parse };