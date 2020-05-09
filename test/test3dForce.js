// Import
import { parseJSON, create3dForceObject, stringToJSON } from "./../src/utils.js";


function displayGraph(object){
    const Graph = ForceGraph3D()
      (document.getElementById('3d-graph'))
      .nodeAutoColorBy('group')
        .linkOpacity(0.5)
        .graphData(object)
        .onNodeDragEnd(node => {
            node.fx = node.x;
            node.fy = node.y;
            node.fz = node.z;
          });
}


export function loadFileAsText(){
    var fileToLoad = document.getElementById("files").files[0];
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent){
        var textFromFileLoaded = fileLoadedEvent.target.result;
        // Create the graph
        jsonFileToGraph(textFromFileLoaded);
    };
    fileReader.readAsText(fileToLoad, "UTF-8");
}


// Read and parse the JSON file to display the graph
export function jsonFileToGraph(data){
    var jsonObject = stringToJSON(data);
    var pathwayCreatedByParseJSON = parseJSON(jsonObject);
    var object = create3dForceObject(pathwayCreatedByParseJSON);
    displayGraph(object);
}


// OLD METHOD

// fetch('./dataTest.json')
//     .then (function(response){
//         return response.json();
//     })
//     .then(function(data){
//         console.log(data);
//         var pathwayCreatedByParseJSON = parseJSON(data);

//         console.log("\n\n\n PATHWAY CREATED \n\n");
//         console.log(pathwayCreatedByParseJSON);
//         var object = create3dForceObject(pathwayCreatedByParseJSON);
//         console.log(object);
//         displayGraph(object);
        
//     })
//     .catch(function(err){
//         console.log("ERROR");
//     });

