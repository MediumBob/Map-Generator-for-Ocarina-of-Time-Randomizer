function GenerateGraph(data){
    // clear the window
    let map = document.getElementById("map-window");
    while (map.firstChild){                 // while the map still elements in it
        map.removeChild(map.firstChild);    // remove the first element
    }

    // specify zoom functionality
    function zoomed({transform}) {
        node.attr("transform", transform);
        link.attr("transform", transform);
        text.attr("transform", transform);
      }
    const zoom = d3.zoom()
    .scaleExtent([1, 40])
    .on("zoom", zoomed);

    // Specify the dimensions of the chart.
    const width = 928;
    const height = 680;

    // Specify the color scale.
    const color = d3.scaleOrdinal()
    .domain(["overworld", "interior", "spawn", "dungeon", "song", "grotto", "grave", "great fairy fountain"])
    .range(["#e39400", "#00aaff", "#4dff00", "#ff0000", "#9e00ff", "#9d5a00", "#b2b2b2", "#ff00dc"]);
    //      [orange,    blue,     green,      red,      purple,     brown,      gray,       pink]

    // The force simulation mutates links and nodes, so create a copy
    // so that re-evaluating this cell produces the same result.
    const links = data.links.map(d => ({...d}));
    const nodes = data.nodes.map(d => ({...d}));


    // strength
    function typeStrength(type){
        if (type === 'overworld'){
            console.log("type: " + type + ". returning 0")
            return -100;
        }
        else if (type === 'interior'){
            console.log("type: " + type + ". returning -50")
            return -40;
        }
        else if (type === 'grotto' || type === 'grave' || type === 'great fairy fountain'){
            console.log("type: " + type + ". returning -10")
            return -20;
        }
        else if (type === 'song'){
            console.log("type: " + type + ". returning -100")
            return -10;
        }
        else{
            console.log("type: " + type + ". returning -30")
            return -30;
        }
    }

    // Create a simulation with several forces.
    const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(d => {
        if (d.source.type === 'overworld' && (d.target.type === 'grotto' || d.target.type === 'grave')) {
          return 30; // Adjust the distance value to control the spacing between overworld and grotto/grave nodes
        } else if ((d.source.type === 'grotto' || d.source.type === 'grave') && d.target.type === 'interior') {
          return 90; // Adjust the distance value to control the spacing between grotto/grave and interior nodes
        } else {
          return 30; // Default distance value for other links
        }
      }))
        .force("charge", d3.forceManyBody().strength(d => typeStrength(d.type)))
        //.force("center", d3.forceCenter());
          .force("x", d3.forceX())
          .force("y", d3.forceY());

        // .force("x", d3.forceX().strength(d => {
        //     if (d.type === 'overworld') {
        //       return 0.1; // Adjust the strength value to control the spacing between shells
        //     } else {
        //       return 0; // No force on non-overworld nodes
        //     }
        //   }))
        //   .force("y", d3.forceY().strength(d => {
        //     if (d.type === 'overworld') {
        //       return 0.1; // Adjust the strength value to control the spacing between shells
        //     } else {
        //       return 0; // No force on non-overworld nodes
        //     }
        //   }));

    // Create the SVG container.
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("style", "max-width: 100%; height: auto;");

    // Add a line for each link, and a circle for each node.
    const link = svg.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke-width", d => Math.sqrt(d.value));

    const node = svg.append("g")
        .attr("stroke", "#fff")             // border color (white)
        .attr("stroke-width", 1.0)          // border width
        .selectAll("circle")                // select circle elements
        .data(nodes)                        // bind graph data to the circle elements
        .join("circle")                     // join graph data to the circle elements (how is this different than above line?)
        .attr("r", 5)                       // set radius to 5
        .attr("fill", d => color(d.type));  // set node color based on its type

    node.append("title")
        .text(d => d.id);

    const text = svg.selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
        .text(d => d.id)
        .attr("x", d => d.x)
        .attr("y", d => d.y)
        .attr("dy", "2em")
        .style("text-anchor", "middle")
        .style("fill", "white")
        .style("font-size", "6px");

    svg.call(zoom);

    // Add a drag behavior.
    node.call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    // Set the position attributes of links and nodes each time the simulation ticks.
    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
        text
            .attr("x", d => d.x)
            .attr("y", d => d.y);
    });

    // Reheat the simulation when drag starts, and fix the subject position.
    function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.1).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
    }

    // Update the subject (dragged node) position during drag.
    function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
    }

    // Restore the target alpha so the simulation cools after dragging ends.
    // Unfix the subject position now that it’s no longer being dragged.
    function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
    }

    return svg.node();
}

export {GenerateGraph};