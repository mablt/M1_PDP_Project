
import * as graphUtils from "./../src/utils.js";


// Global variables
var SAVE_GRAPH_EXTENSION = 'GENCOVERY';




/**
 * Calls functions to save displayed graph as a new JSON file
 */

// export function saveGraphToJSON() {
//   var ForceObject = graphUtils.get3dForceObject();
//   graphUtils.modify3DForceGraph(ForceObject);
//   createFile();
// }

/**
* Create JSON file(s) with modifications from the graph
*/
// function createFile() {
//   for (const fileName in window.JSON_OBJECT) {
//       var json = window.JSON_OBJECT[fileName];
//       var jsonAsText = JSON.stringify(json, null, 1);
//       var textFileAsBlob = new Blob([jsonAsText], { type: 'application/json' });
//       var downloadLink = document.createElement("a");
//       downloadLink.download = fileName + '_' + SAVE_GRAPH_EXTENSION + '.json';
//       downloadLink.innerHTML = "Download File";
//       if (window.webkitURL != null) {
//           // Chrome allows links to be clicked without actually adding it to the DOM.
//           downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
//       }
//       else {
//           // Firefox requires links to be added to the DOM before it can be clicked.
//           downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
//           downloadLink.onclick = destroyClickedElement;
//           downloadLink.style.display = "none";
//           document.body.appendChild(downloadLink);
//       }

//       downloadLink.click();
//   }
// }

/**
 * Loads files selected by the user and calls conversion function
 */
// export function loadFileAsText() {
//   var textFiles = [];
//   //console.log("------" + typeof textFiles);
//   window.JSON_OBJECT = {};
//   var filesToLoad = document.getElementById("files").files;
//   var fileReader = new FileReader();
//   function readFile(index) {
//       if (index >= filesToLoad.length) {
//         //   console.log(graphUtils.get3dForceObject());
//         //   if (graphUtils.get3dForceObject===undefined || getCofactList!={}){
//             firstgraph();
//             console.log("newgraph");  
//         //   }
//         //   else{
//         //     graphChangement();
//         //     console.log("samegraph");
//         //   }
//           return;
//       }

//       var file = filesToLoad[index];
//       var fileName = file.name;
//       var re = /(\w+)\.json/;

//       var fileNameWithoutExtension = fileName.replace(re, '$1');
//       //console.log(fileNameWithoutExtension);
//       // window.JSON_OBJECT[fileNameWithoutExtension] = "";
//       //console.log("aaaaaasjdkfbsdjfskdf");
//       //console.log(window.JSON_OBJECT);
//       fileReader.onload = function (fileLoadedEvent) {
//           var content = fileLoadedEvent.target.result;
//           textFiles.push(content);
//           window.JSON_OBJECT[fileNameWithoutExtension] = content;
//           readFile(index + 1);
//       };
//       fileReader.readAsText(file, "UTF-8");

//   }
//   readFile(0);
// }

/**
 * Displays graphs and loads elements information on click
 * @param {Object} object 3D-Force object which contains nodes and links data
 * @param {Map} map Map object which contains the pathways data
 */

// export function displayGraph(object, map) {
//     window.GRAPH = ForceGraph3D();
//     window.GRAPH(document.getElementById('graph-3d'))
//         .nodeThreeObject(({ group }) => new THREE.Mesh(
//             [
//                 graphUtils.formNode(document.getElementById("nodeMgeometry-select").value, 6),
//                 graphUtils.formNode(document.getElementById("nodeRgeometry-select").value, 0)
//             ][group % 2], [
//                 new THREE.MeshBasicMaterial({ color: document.getElementById("nodeMcolor-select").value }),
//                 new THREE.MeshBasicMaterial({ color: document.getElementById("nodeRcolor-select").value })
//             ][group % 2]))
//         .graphData(object)
//         .onNodeClick(node => {
//             //console.log("AAAAAAAAAAAAAA", node);
//             console.log(node);
//             var graph = map.getGraphById(node.graph_id);
//             //console.log("graph du node", graph, );
//             var element = graph.getElementsByName(node.name);
//             //console.log("element du node", element);
//             document.getElementById("selected-node-name").innerHTML = " name : " + element.name;
//             document.getElementById("selected-node-id").innerHTML = "id : " + element.id;
//             document.getElementById("selected-node-pathway").innerHTML = "pathway : " + element.parent.name;
//         })
//         .onNodeDragEnd(node => {
//             node.fx = node.x;
//             node.fy = node.y;
//             node.fz = node.z;

//         });

//     //console.log("link value", document.getElementById("link-select").value);
//     if (document.getElementById("link-select").value === "arrow") {
//         graphUtils.arrowlink(window.GRAPH(document.getElementById('graph-3d')));
//     }
//     if (document.getElementById("link-select").value === "particle") {
//         graphUtils.particuleLink(window.GRAPH(document.getElementById('graph-3d')));
//     }
//     //nodeStyle(window.GRAPH(document.getElementById('graph-3d')));

// }

// function firstgraph(){
//   graphUtils.stringToJSON();
//   var map=graphUtils.parseJSON();
//   console.log(map);
//   var obj=graphUtils.duplicreate3dForceObject(map,getCofactList());
//   console.log(obj);
//   displayGraph(obj,map);
// }

// function graphChangement(){
//     var map=graphUtils.parseJSON();
//     var obj = graphUtils.get3dForceObject();
//     if( getCofactList().length != 0){
//         obj = graphUtils.duplicreate3dForceObject(map, getCofactList());
//     }
// //   graphUtils.stringToJSON();
  
//   displayGraph(obj,map);
// }


// document.getElementById('ok').addEventListener('click', loadFileAsText);
// document.getElementById('change').addEventListener('click', graphChangement);

// document.getElementById('saveGraph').addEventListener('click', saveGraphToJSON);