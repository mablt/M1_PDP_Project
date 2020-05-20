// Imports
import { Pathway } from "./Pathway.js";
import { Compound } from "./Compound.js";
import { Reaction } from "./Reaction.js";
import { Gene } from "./Gene.js";
import { Map } from "./Map.js";
import { Cofact } from "./Cofacteur.js";

// Global variables
var SAVE_GRAPH_EXTENSION = 'GENCOVERY';


/**
 * Transforms each JSON file data as string from the list to JSON object
 * 
 * @param  {} fileDataList List of JSON file data as string
 */
export function stringToJSON() {
    for (const nameFile in window.JSON_OBJECT) {
        var data = window.JSON_OBJECT[nameFile];
        var json = JSON.parse(data);
        window.JSON_OBJECT[nameFile] = json;
    }
}

/**
 * Parse the JSON object and instanciates the objects
 * 
 * @param  {} json JSON object contains data from the JSON file
 * @return Pathway object which contains the elements
 */
export function parseJSON() {
    var map = new Map();
    for (const nameFile in window.JSON_OBJECT) {
        var json = window.JSON_OBJECT[nameFile];

        // Pathways objects creation
        var pathway = new Pathway(json.id, nameFile, json.compartments, json.version);
        //console.log("PATWHAY ::::", pathway.id);
        // Compounds objects creation
        for (var m of json.metabolites) {
            var compound = new Compound(m.id, pathway, m.name, m.compartment, m.charge, m.formula);
            if ("coordinates" in m) {
                compound.setCoordinates(m.coordinates.x, m.coordinates.y, m.coordinates.z);
            }
            // Adds compound to the patwhay
            pathway.addElement(compound);
        }
        // Reactions objects creation
        for (var r of json.reactions) {
            var reaction = new Reaction(r.id, pathway, r.name, r.lower_bound, r.upper_bound, r.subsystem);
            for (var key in r.metabolites) {
                var value = r.metabolites[key];
                var data = { "id": key };
                // If the metabolite is a reactant :
                if (value < 0) {
                    data.quantity = Math.abs(value);
                    // Adds the metabolite to previousElements list
                    reaction.addPreviousElement(data);
                    // Puts the reaction as new next compound
                    putElementToNextElementCompound(pathway, key, reaction.id);
                }
                // If the metabolite is a product :
                else {
                    data.quantity = value;
                    // Adds the metabolite to nextElements lit
                    reaction.addNextElement(data);

                    // Puts the reaction as new previous compound
                    putElementToPreviousElementCompound(pathway, key, reaction.id);
                }
            }
            if ("coordinates" in r) {
                compound.setCoordinates(r.coordinates.x, r.coordinates.y, r.coordinates.z);
            }
            // Adds compound to the patwhay
            pathway.addElement(reaction);
        }
        // Genes objects creation
        for (var g of json.genes) {
            var gene = new Gene(g.id, g.name);
            // pathway.addElement(gene);               // BESOIN DE LE STOCKER DANS LE GRAPH ????? A DISCUTER
        }
        map.addGraph(pathway);
    }
    return map;
}




/**
 * To do describe
 * 
 * @param  {Pathway} pathway Pathway object which is created during the parsing
 * @param  {String} idCompoundToSearch Id of the compound where the reaction id will be added in previous elements
 * @param  {String} idElementToAdd Id of the reaction to add
 */
function putElementToPreviousElementCompound(pathway, idCompoundToSearch, idElementToAdd) {
    for (var element of pathway.getElements()) {
        if (element.getId() == idCompoundToSearch) {
            element.addPreviousElement({ "id": idElementToAdd });
        }
    }
}


/**
 * To do describe
 * 
 * @param  {Pathway} patwhay Pathway object which is created during the parsing
 * @param  {String} idCompoundToSearch Id of the compound where the reaction id will be added in next elements
 * @param  {String} idElementToAdd Id of the reaction to add
 */
function putElementToNextElementCompound(patwhay, idCompoundToSearch, idElementToAdd) {
    for (var element of patwhay.getElements()) {
        if (element.getId() === idCompoundToSearch) {
            element.addNextElement({ "id": idElementToAdd });
        }
    }
}
//Adds for duplication ; initCofact, getElementById, duplicreate3dForceObject
/**
 * 
 * @constuctor ??
 * @param {Object} list - array containing id of certain elements
 * @param {Pathway} pathway - object which is created during the parsing
 * @return list of Cofactor objects
 */
export function initCofact(list, pathway) {
    var Cofactor_list = [];
    for (var id_cofact of list) {
        var elements = pathway.getElements();
        var element = getObjectById(elements, id_cofact);
        if (element === false) {
            var cofact = new Cofact(id_cofact, 0, id_cofact);
        }
        else {
            var cofact = new Cofact(element.getId(), 0, element.getName());
        }
        Cofactor_list.push(cofact);
    }
    console.log(Cofactor_list);
    return Cofactor_list;
}


/**
 * Get an element corresponding to an id if it's found
 * else, returns false
 * 
 * @param {Object} list List containing objects
 * @param {String} id String corresponding to an element's id
 * @return Element object or "false"(boolean)
 */

export function getObjectById(list, id) {
    for (var elt in list) {
        if (list[elt].id === id) {
            return list[elt]; 
        }
    }
    return false;
}

/**
 * Creates the 3D-Force object required to display the graph with the 3D-Force Graph library with duplication possibility
 * 
 * @param  {Map} map Map object which contains the pathways
 * @return {Object} 3D-Force object which contains nodes and links data
 */
export function duplicreate3dForceObject(map) {
    var nodes_list = [];
    var links_list = [];
    var cofact_list = getCofactList();
    for (var pathway of map.getGraphs()) {
        // var cofacts is a list of cofactor objects {id: , nb: , name: }
        var cofacts = initCofact(cofact_list, pathway);
        // For each element of the list :
        for (var i of pathway.getElements()) { 
            if (!(cofact_list.includes(i.getId()))) {
                var elem = {};
                elem.id = i.getId() + '___' + pathway.getName();
                elem.name = i.getName();
                //console.log("GRAPH ID DS CREATE 3D", pathway.id);
                elem.graph_id = pathway.id;
                /*
                var coordinates = i.getCoordinates();
                if ((coordinates.x != undefined) && (coordinates.y != undefined) && (coordinates.z != undefined)) {
                    elem.fx = coordinates.x;
                    elem.fy = coordinates.y;
                    elem.fz = coordinates.z;
                }*/

                // If it's a reaction :
                if (i instanceof (Reaction)) { 
                    // We create links
                    for (var j of i.getPreviousElements()) {
                        var link = {};
                        if (cofact_list.includes(j.id)) {
                            var cofacteur = getObjectById(cofacts, j.id);
                            var val = cofacteur.nb;
                            var ind = val;
                            var duplicat_id = j.id + "#" + String(ind) + '___' + pathway.getName();
                            val++;
                            cofacteur.setNb(val);
                            link.source = duplicat_id;
                        }
                        else {
                            link.source = j.id + '___' + pathway.getName();
                        }
                        link.target = i.getId() + '___' + pathway.getName();
                        link.color = "white";
                        link.value = 2;
                        links_list.push(link);
                    }
                    for (var j of i.getNextElements()) {
                        var link = {};
                        if (cofact_list.includes(j.id)) {
                            var cofacteur = getObjectById(cofacts, j.id);
                            var val = cofacteur.nb;
                            var ind = val;
                            var duplicat_id = j.id + "#" + String(ind) + '___' + pathway.getName();
                            val++;
                            cofacteur.setNb(val);
                            link.target = duplicat_id;
                        }
                        else {
                            link.target = j.id + '___' + pathway.getName();
                        }
                        link.source = i.getId() + '___' + pathway.getName();
                        link.color = "white";
                        link.value = 1;
                        links_list.push(link);
                    }
                    elem.group = 1;
                }
                else {
                    elem.group = 2;
                }
                // We create nodes
                nodes_list.push(elem);   

            }
        }

        // Here, we create all the elements corresponding to cofactors 
        for (var cofacteur of cofacts) {
            for (var i = 0; i < cofacteur.nb; i++) {
                var elem = {};
                elem.id = cofacteur.id + "#" + String(i) + '___' + pathway.getName();
                elem.name = cofacteur.name;
                elem.group = 2; // cofacteur = entity not reaction or create 3 groups
                elem.graph_id = pathway.id;
                //console.log(elem);
                nodes_list.push(elem);

                // No coordinates
            }
        }
    }

    var object = {
        nodes: nodes_list,
        links: links_list
    };
    //console.log("object", object);
    return object;

}


/**
 * Creates the 3D-Force object required to display the graph with 3D-Force Graph library
 * 
 * @param  {Map} map Map object which contains the pathways
 * @return {Object} 3D-Force object which contains nodes and links data
 */
export function create3dForceObject(map) {
    var nodes_list = [];
    var links_list = [];
    for (var pathway of map.getElements()) {
        // For each element of the list : 
        for (var i of pathway.getElements()) { 
            var elem = {};
            //console.log();
            elem.id = i.getId() + '___' + pathway.getName();
            //console.log(elem.id);
            elem.name = i.getName();

            // If it's a reaction :
            if (i instanceof (Reaction)) { 
                // We create links
                for (var j of i.getPreviousElements()) {
                    var link = {};
                    link.source = j.id + '___' + pathway.getName();
                    // link.target =  i.getId()+ "_" + String(count);
                    link.target = i.getId() + '___' + pathway.getName();
                    link.color = "grey";
                    link.value = 2;
                    console.log(j.id);
                    links_list.push(link);
                }
                for (var j of i.getNextElements()) {
                    var link = {};
                    link.source = i.getId() + '___' + pathway.getName();
                    link.target = j.id + '___' + pathway.getName();
                    link.color = "white";
                    link.value = 2;
                    links_list.push(link);
                    console.log("link : ", link);
                }
                elem.group = 1;
            }
            else {
                elem.group = 2;
            }
            // We create nodes
            nodes_list.push(elem);  


        }
    }
    var object = {
        nodes: nodes_list,
        links: links_list
    };
    return object;
}

/**
 * Reads and parses JSON file, to display the graph
 */
export function jsonFileToGraph() {
    stringToJSON();
    var mapCreatedByParseJSON = parseJSON();
    // With duplication or not
    // var object = create3dForceObject(mapCreatedByParseJSON);
    var object = duplicreate3dForceObject(mapCreatedByParseJSON);
    displayGraph(object, mapCreatedByParseJSON);
}

/**
 * Sets links to arrows with chosen characteristics
 * @param {Object} graph3D 3D-Force graph object
 */
export function arrowlink(graph3D) {
    graph3D
        .linkDirectionalArrowLength(3.5)
        .linkDirectionalArrowRelPos(1)
        .linkCurvature(0);
}

/**
 * Adds directional particles to links
 * @param {Object} graph3D 3D-Force graph object
 */
export function particuleLink(graph3D) {
    graph3D
        .linkDirectionalParticles("value")
        .linkDirectionalParticleSpeed(d => d.value * 0.001);
}

/**
 * Allows the choice of the node geometry between TorusKnot, Sphere and Box.
 * @param {String} value corresponds to the choice of geometry we want to apply to our nodes 
 * @param {Number} sizeproportion is useful in order to display bigger reaction nodes compared to the metabolites ones
 */
export function formNode(value, sizeproportion) {
    var size = 3 + sizeproportion;
    if (value === "torusknot") {
        return new THREE.TorusKnotGeometry(size, 1);
    }
    if (value === "sphere") {
        return new THREE.SphereGeometry(size);
    }
    if (value === "box") {
        return new THREE.BoxGeometry(size, size, size);
    }
}


/**
 * Displays graphs and loads elements information on click
 * @param {Object} object 3D-Force object which contains nodes and links data
 * @param {Map} map Map object which contains the pathways data
 */

export function displayGraph(object, map) {
    window.GRAPH = ForceGraph3D();
    window.GRAPH(document.getElementById('graph-3d'))
        .nodeThreeObject(({ group }) => new THREE.Mesh(
            [
                formNode(document.getElementById("nodeMgeometry-select").value, 6),
                formNode(document.getElementById("nodeRgeometry-select").value, 0)
            ][group % 2], [
                new THREE.MeshBasicMaterial({ color: document.getElementById("nodeMcolor-select").value }),
                new THREE.MeshBasicMaterial({ color: document.getElementById("nodeRcolor-select").value })
            ][group % 2]))
        .graphData(object)
        .onNodeClick(node => {
            //console.log("AAAAAAAAAAAAAA", node);
            console.log(node);
            var graph = map.getGraphById(node.graph_id);
            //console.log("graph du node", graph, );
            var element = graph.getElementsByName(node.name);
            //console.log("element du node", element);
            document.getElementById("selected-node-name").innerHTML = " name : " + element.name;
            document.getElementById("selected-node-id").innerHTML = "id : " + element.id;
            document.getElementById("selected-node-pathway").innerHTML = "pathway : " + element.parent.name;
        })
        .onNodeDragEnd(node => {
            node.fx = node.x;
            node.fy = node.y;
            node.fz = node.z;

        });

    //console.log("link value", document.getElementById("link-select").value);
    if (document.getElementById("link-select").value === "arrow") {
        arrowlink(window.GRAPH(document.getElementById('graph-3d')));
    }
    if (document.getElementById("link-select").value === "particle") {
        particuleLink(window.GRAPH(document.getElementById('graph-3d')));
    }
    //nodeStyle(window.GRAPH(document.getElementById('graph-3d')));

}



/**
 * Loads files selected by the user and calls conversion function
 */
export function loadFileAsText() {
    var textFiles = [];
    //console.log("------" + typeof textFiles);
    window.JSON_OBJECT = {};
    var filesToLoad = document.getElementById("files").files;
    var fileReader = new FileReader();
    function readFile(index) {
        if (index >= filesToLoad.length) {
            jsonFileToGraph();
            return;
        }

        var file = filesToLoad[index];
        var fileName = file.name;
        var re = /(\w+)\.json/;

        var fileNameWithoutExtension = fileName.replace(re, '$1');
        //console.log(fileNameWithoutExtension);
        // window.JSON_OBJECT[fileNameWithoutExtension] = "";
        //console.log("aaaaaasjdkfbsdjfskdf");
        //console.log(window.JSON_OBJECT);
        fileReader.onload = function (fileLoadedEvent) {
            var content = fileLoadedEvent.target.result;
            textFiles.push(content);
            window.JSON_OBJECT[fileNameWithoutExtension] = content;
            readFile(index + 1);
        };
        fileReader.readAsText(file, "UTF-8");

    }
    readFile(0);
}



/**
 * Gets ans returns currently displayed graph
 * @return {Object} ForceObject 3D Force Graph object which contains data
 */
export function get3dForceObject() {
    //console.log("++++++++++++++++");
    var ForceObject = window.GRAPH.graphData();
    return ForceObject;
}

/**
 * Calls functions to save displayed graph as a new JSON file
 */

export function saveGraphToJSON() {
    var ForceObject = get3dForceObject();
    modify3DForceGraph(ForceObject);
    createFile();
}

/**
 * Create JSON file(s) with modifications from the graph
 */
function createFile() {
    for (const fileName in window.JSON_OBJECT) {
        var json = window.JSON_OBJECT[fileName];
        var jsonAsText = JSON.stringify(json, null, 1);
        var textFileAsBlob = new Blob([jsonAsText], { type: 'application/json' });
        var downloadLink = document.createElement("a");
        downloadLink.download = fileName + '_' + SAVE_GRAPH_EXTENSION + '.json';
        downloadLink.innerHTML = "Download File";
        if (window.webkitURL != null) {
            // Chrome allows links to be clicked without actually adding it to the DOM.
            downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
        }
        else {
            // Firefox requires links to be added to the DOM before it can be clicked.
            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.onclick = destroyClickedElement;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
        }

        downloadLink.click();
    }
}


/**
 * Modify the coordinates in the 3D Force Graph object with the coordinates of the graph 
 * 
 * @param {Object} object3dForce 3D Force Graph object
 */
export function modify3DForceGraph(object3dForce) {
    for (var node of object3dForce.nodes) {
        // Get the file name corresponding to the node
        var re = /(\w+)___(\w+)/;
        var fileName = node.id.replace(re, '$2');
        // If the node is a reaction
        if (node.group === 1) {
            var nodeId = node.id.replace(re, '$1');
            for (var reaction of window.JSON_OBJECT[fileName].reactions) {
                if (reaction.id === nodeId) {
                    // If the initial JSON does not contain the coordinates of the object, it adds it
                    if (!("coordinates" in reaction)) {
                        reaction.coordinates = {};
                    }
                    // Modifies coordinates
                    reaction.coordinates.x = node.x;
                    reaction.coordinates.y = node.y;
                    reaction.coordinates.z = node.z;
                }
            }
        }
        // If it's a metabolite :
        else {
            for (var metabolite of window.JSON_OBJECT[fileName].metabolites) {
                if (metabolite.id === nodeId) {
                    // If the initial JSON does not contains coordinates objet, add it
                    if (!("coordinates" in metabolite)) {
                        metabolite.coordinates = {};
                    }
                    // Modifies coordinates
                    metabolite.coordinates.x = node.x;
                    metabolite.coordinates.y = node.y;
                    metabolite.coordinates.z = node.z;
                }
            }
        }
    }
}

/**
 * return cofactors' id in list with user selection on interface
 * 
 */

function getCofactList() {
    var cofact_list = [];
    if (document.querySelector('input[id="all"]').checked) {
        /*
      document.querySelector('input[id="h"]').checked;
      document.querySelector('input[id="h2o"]').checked;
      document.querySelector('input[id="co2"]').checked;
      document.querySelector('input[id="atp"]').checked;
      document.querySelector('input[id="adp"]').checked;
      */
        cofact_list = ["h_e", "h_c", "co2_e", "co2_c", "h2o_e", "h2o_c", "atp_e", "atp_c", "adp_e", "adp_c"];

    }
    else {
        if (document.querySelector('input[id="h"]').checked) {
            cofact_list.push("h_e");
            cofact_list.push("h_c");
        }
        if (document.querySelector('input[id="h2o"]').checked) {
            cofact_list.push("h2o_e");
            cofact_list.push("h2o_c");
        }
        if (document.querySelector('input[id="co2"]').checked) {
            cofact_list.push("co2_e");
            cofact_list.push("co2_c");
        }
        if (document.querySelector('input[id="atp"]').checked) {
            cofact_list.push("atp_e");
            cofact_list.push("atp_c");
        }
        if (document.querySelector('input[id="adp"]').checked) {
            cofact_list.push("adp_e");
            cofact_list.push("adp_c");
        }
    }
    //console.log(cofact_list);
    return cofact_list;
}

document.getElementById('ok').addEventListener('click', loadFileAsText);
document.getElementById('change').addEventListener('click', loadFileAsText);

document.getElementById('saveGraph').addEventListener('click', saveGraphToJSON);

//document.getElementById('cofact').addEventListener('click',loadFileAsText);



// ------------------------------------ ANCIENNES FONCTIONS AU CAS OU ---------------------------



// export function create3dForceObject(pathway) {
//     var nodes_list = [];
//     var links_list = [];
//     for (var i of pathway.getElements()) { // Pour chaque élément de la liste
//         var elem = i;
//         // var elem = {};
//         // elem.id = i.getId();
//         // elem.name = i.getName();
//         var coordinates = i.getCoordinates();
//         if ((coordinates.x != undefined) && (coordinates.y != undefined) && (coordinates.z != undefined)) {
//             elem.fx = coordinates.x;
//             elem.fy = coordinates.y;
//             elem.fz = coordinates.z;
//         }

//         if (i instanceof (Reaction)) { // Si c'est une réaction
//             // On crée les liens
//             for (var j of i.getPreviousElements()) {
//                 var link = {};
//                 link.source = j.id;
//                 link.target = i.getId();
//                 link.color = "red";
//                 console.log(j.id)
//                 links_list.push(link);
//             }
//             for (var j of i.getNextElements()) {
//                 var link = {};
//                 link.source = i.getId();
//                 link.target = j.id;
//                 link.color = "blue";
//                 links_list.push(link);
//             }
//             elem.group = 1
//         }
//         else {
//             elem.group = 2;
//         }
//         nodes_list.push(elem); // On crée le noeud   

//     }
//     var object = {
//         nodes: nodes_list,
//         links: links_list
//     }
//     console.log(object);
//     return object;
// }



// ANCIENNE FONCTION
// export function loadFileAsText() {

//     var fileToLoad = document.getElementById("files").files[0];
//     var fileReader = new FileReader();
//     fileReader.onload = function (fileLoadedEvent) {
//         var textFromFileLoaded = fileLoadedEvent.target.result;
//         // Create the graph
//         console.log(textFromFileLoaded);
//         jsonFileToGraph([textFromFileLoaded]);
//     };
//     fileReader.readAsText(fileToLoad, "UTF-8");
// }

// QUE DES SPHERES
// export function displayGraph(object) {
//     window.GRAPH = ForceGraph3D();
//     window.GRAPH(document.getElementById('graph-3d'))
//         .nodeAutoColorBy('group')
//         .linkOpacity(0.5)
//         .graphData(object)
//         .onNodeDragEnd(node => {
//             node.fx = node.x;
//             node.fy = node.y;
//             node.fz = node.z;
//         });
// }


// // HEXAGONES ET SPHERES
// export function displayGraph(object) {
//     window.GRAPH = ForceGraph3D();
//     window.GRAPH(document.getElementById('graph-3d'))
//         .nodeThreeObject(({group}) => new THREE.Mesh(
//             [
//                 new THREE.SphereGeometry(5),
//                 new THREE.TorusGeometry(10, 2)
//             ][group%2]))
//         .linkDirectionalParticles("value")
//         .linkDirectionalParticleSpeed(d => d.value * 0.001)
//         .graphData(object)
//         .onNodeDragEnd(node => {
//             node.fx = node.x;
//             node.fy = node.y;
//             node.fz = node.z;

//         });

// }


// export function displayGraph(object) {

//     const Graph = ForceGraph3D()
//         (document.getElementById('graph-3d'))
//         //.nodeAutoColorBy('group')
//         .nodeThreeObject(({ group }) => new THREE.Mesh(
//             [
//                 new THREE.SphereGeometry(3),
//                 new THREE.BoxGeometry(3, 2),
//             ][group % 2]))
//         .graphData(object)
//         .linkDirectionalArrowLength(3.5)
//         .linkDirectionalArrowRelPos(1)
//         .linkCurvature(0.25);
// }
