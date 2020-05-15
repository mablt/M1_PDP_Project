// Imports
import { Pathway } from "./Pathway.js";
import { Compound } from "./Compound.js";
import { Reaction } from "./Reaction.js";
import { Gene } from "./Gene.js";
import { Map } from "./Map.js";

// Global variables
var SAVE_GRAPH_EXTENSION = 'GENCOVERY';


/**
 * Transform each JSON file data as string from the list to JSON object
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
 * Parse the JSON object and instanciate the objects
 * 
 * @param  {} json JSON object contains data from the JSON file
 * @return Pathway object which contains the elements
 */
export function parseJSON() {
    var map = new Map();
    for (const nameFile in window.JSON_OBJECT) {
        var json = window.JSON_OBJECT[nameFile];
        // Patwhay object creation
        var pathway = new Pathway(json.id, nameFile, json.compartments, json.version);
        // Compounds objects creation
        for (var m of json.metabolites) {
            var compound = new Compound(m.id, pathway, m.name, m.compartment, m.charge, m.formula);
            if ("coordinates" in m) {
                compound.setCoordinates(m.coordinates.x, m.coordinates.y, m.coordinates.z);
            }
            // Add compound to the patwhay
            pathway.addElement(compound);
        }
        // Reactions objects creation
        for (var r of json.reactions) {
            var reaction = new Reaction(r.id, pathway, r.name, r.lower_bound, r.upper_bound, r.subsystem);
            for (var key in r.metabolites) {
                var value = r.metabolites[key];
                var data = { "id": key };
                // If the metabolites is a reagent
                if (value < 0) {
                    data.quantity = Math.abs(value);
                    // Add the metabolite to previous element
                    reaction.addPreviousElement(data);
                    // Put the reaction as new next compound
                    putElementToNextElementCompound(pathway, key, reaction.id);
                }
                // If the metabolites is a products
                else {
                    data.quantity = value;
                    // Add the metabolite to next element
                    reaction.addNextElement(data);

                    // Put the reaction as new previous compound
                    putElementToPreviousElementCompound(pathway, key, reaction.id);
                }
            }
            if ("coordinates" in r) {
                compound.setCoordinates(r.coordinates.x, r.coordinates.y, r.coordinates.z);
            }
            // Add compound to the patwhay
            pathway.addElement(reaction);
        }
        // Genes objects creation
        for (var g of json.genes) {
            var gene = new Gene(g.id, g.name);
            pathway.addElement(gene);               // BESOIN DE LE STOCKER DANS LE GRAPH ????? A DISCUTER
        }
        map.addGraph(pathway);
    }
    return map;
}




/**
 * @param  {} pathway Pathway object which is created during the parsing
 * @param  {} idCompoundToSearch Id of the compound where the reaction id will be added in previous elements
 * @param  {} idElementToAdd Id of the reaction to add
 */
function putElementToPreviousElementCompound(pathway, idCompoundToSearch, idElementToAdd) {
    for (var element of pathway.getElements()) {
        if (element.getId() == idCompoundToSearch) {
            element.addPreviousElement({ "id": idElementToAdd });
        }
    }
}


/**
 * @param  {} patwhay Pathway object which is created during the parsing
 * @param  {} idCompoundToSearch Id of the compound where the reaction id will be added in next elements
 * @param  {} idElementToAdd Id of the reaction to add
 */
function putElementToNextElementCompound(patwhay, idCompoundToSearch, idElementToAdd) {
    for (var element of patwhay.getElements()) {
        if (element.getId() === idCompoundToSearch) {
            element.addNextElement({ "id": idElementToAdd });
        }
    }
}



/**
 * Create the 3D-Force object required to display the graph with the 3D-Force Graph library
 * 
 * @param  {Pathway} pathway Pathway object which contains the data
 * @return {} 3D-Force object which contains nodes and links data
 */
export function create3dForceObject(map) {
    var nodes_list = [];
    var links_list = [];
    var count = 0;
    for (var pathway of map.getElements()) {
        for (var i of pathway.getElements()) { // Pour chaque élément de la liste
            var elem = {};
            console.log();
            elem.id = i.getId() + '___' + pathway.getName();
            console.log(elem.id);
            elem.name = i.getName();

            if (i instanceof (Reaction)) { // Si c'est une réaction
                // On crée les liens
                for (var j of i.getPreviousElements()) {
                    var link = {};
                    link.source = j.id + '___' + pathway.getName();
                    // link.target =  i.getId()+ "_" + String(count);
                    link.target = i.getId() + '___' + pathway.getName();
                    link.color = "white";
                    console.log(j.id)
                    links_list.push(link);
                }
                for (var j of i.getNextElements()) {
                    var link = {};
                    link.source = i.getId() + '___' + pathway.getName();
                    link.target = j.id + '___' + pathway.getName();
                    link.color = "white";
                    links_list.push(link);
                }
                elem.group = 1;
            }
            else {
                elem.group = 2;
            }
            nodes_list.push(elem); // On crée le noeud   

        }
        count += 1;
    }
    var object = {
        nodes: nodes_list,
        links: links_list
    };
    return object;
}

// Read and parse the JSON file to display the graph
export function jsonFileToGraph() {
    stringToJSON();
    var mapCreatedByParseJSON = parseJSON();
    var object = create3dForceObject(mapCreatedByParseJSON);
    displayGraph(object);
}


export function displayGraph(object) {
    window.GRAPH = ForceGraph3D();
    window.GRAPH(document.getElementById('graph-3d'))
        .nodeAutoColorBy('group')
        .linkOpacity(0.5)
        .graphData(object)
        .onNodeDragEnd(node => {
            node.fx = node.x;
            node.fy = node.y;
            node.fz = node.z;
        });
}




//FONCTIONNE
export function loadFileAsText() {
    var textFiles = [];
    console.log("------" + typeof textFiles);
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
        console.log(fileNameWithoutExtension);
        // window.JSON_OBJECT[fileNameWithoutExtension] = "";
        console.log("aaaaaasjdkfbsdjfskdf");
        console.log(window.JSON_OBJECT);
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




export function get3dForceObject() {
    console.log("++++++++++++++++");
    var ForceObject = window.GRAPH.graphData();
    return ForceObject;
}

export function saveGraphToJSON() {
    var ForceObject = get3dForceObject();
    modifyJSON(ForceObject);
    createFile();
}

function createFile() {
    for (const fileName in window.JSON_OBJECT) {
        var json = window.JSON_OBJECT[fileName];
        var jsonAsText = JSON.stringify(json, null, 1);
        var textFileAsBlob = new Blob([jsonAsText], { type: 'application/json' });
        // var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;
        var downloadLink = document.createElement("a");
        downloadLink.download = fileName + '_' + SAVE_GRAPH_EXTENSION + '.json';
        downloadLink.innerHTML = "Download File";
        if (window.webkitURL != null) {
            // Chrome allows the link to be clicked
            // without actually adding it to the DOM.
            downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
        }
        else {
            // Firefox requires the link to be added to the DOM
            // before it can be clicked.
            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.onclick = destroyClickedElement;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
        }

        downloadLink.click();
    }

    

    
}

export function modifyJSON(object3dForce) {
    for (var node of object3dForce.nodes) {
        // Recuperer  l'index de l'object correspondant au node !!!!A REFORMULER ET TRADUIRE
        var re = /(\w+)___(\w+)/;

        var fileName = node.id.replace(re, '$2');
        // If the node is a reaction
        if (node.group === 1) {

            var nodeId = node.id.replace(re, '$1');
            for (var reaction of window.JSON_OBJECT[fileName].reactions) {
                if (reaction.id === nodeId) {
                    if (!("coordinates" in reaction)) {

                        reaction.coordinates = {};
                    }
                    reaction.coordinates.x = node.x;
                    reaction.coordinates.y = node.y;
                    reaction.coordinates.z = node.z;

                    // else{
                    //     reaction.coordinates = {};
                    // }
                }
            }
            // window.JSON_OBJECT.reactions[node.id].

        }
        else {
            for (var metabolite of window.JSON_OBJECT[fileName].metabolites) {
                var nodeId = node.id.substring(0, node.id.length - 2);
                if (metabolite.id === nodeId) {
                    if (!("coordinates" in metabolite)) {

                        metabolite.coordinates = {};
                    }
                    metabolite.coordinates.x = node.x;
                    metabolite.coordinates.y = node.y;
                    metabolite.coordinates.z = node.z;
                }
            }
        }
    }
}


document.getElementById('ok').addEventListener('click', loadFileAsText);

document.getElementById('saveGraph').addEventListener('click', saveGraphToJSON)



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