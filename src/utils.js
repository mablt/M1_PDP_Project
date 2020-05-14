// Imports
import { Pathway } from "./Pathway.js";
import { Compound } from "./Compound.js";
import { Reaction } from "./Reaction.js";
import { Gene } from "./Gene.js";
import { Map } from "./Map.js";

// Import for test
// import 

// Metabolites to duplicate list
window.METABOLITES_LIST = []
// ["h_e", "h_c", "co2_e", "co2_c", "h2o_e", "h2o_c", "atp_e", "atp_c", "adp_e", "adp_c"]
window.METABOLITES_LIST.push("AAA");
window.METABOLITES_LIST.push("zzzzz");
console.log("::::::");
console.log(typeof window.METABOLITES_LIST);
/**
 * Transform each JSON file data as string from the list to JSON object
 * 
 * @param  {} fileDataList List of JSON file data as string
 */
export function stringToJSON(fileDataList) {
    window.JSON_OBJECT = [];
    console.log(typeof window.JSON_OBJECT);
    console.log(fileDataList.length);
    for (const fileData of fileDataList) {
        console.log(JSON.parse(fileData));
        window.JSON_OBJECT.push(JSON.parse(fileData));
    }
}

/**
 * Parse the JSON object and instanciate the objects
 * 
 * @param  {} json JSON object contains data from the JSON file
 * @return Pathway object which contains the elements
 */
export function parseJSON(JSONList) {
    var map = new Map();
    for (const json of JSONList) {
        // Patwhay object creation
        var pathway = new Pathway(json.id, "NAME", json.compartments, json.version);
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
            // pathway.addElement(gene);               // BESOIN DE LE STOCKER DANS LE GRAPH ?????
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

export function create3dForceObject(map){
    var nodes_list = [];
    var links_list = [];
    var count = 0;
    for (var pathway of map.getElements()){
        for (var i of pathway.getElements()){ // Pour chaque élément de la liste
            var elem ={};
            elem.id = i.getId() + "_" + String(count);
            console.log(elem.id);
            elem.name = i.getName();
            
            if (i instanceof(Reaction)){ // Si c'est une réaction
                // On crée les liens
                for (var j of i.getPreviousElements()){
                    var link ={};
                    link.source = j.id+ "_" + String(count);
                    link.target =  i.getId()+ "_" + String(count);
                    link.color="white";
                    console.log(j.id)
                    links_list.push(link); 
                }   
                for (var j of i.getNextElements()){
                    var link ={};
                    link.source = i.getId()+ "_" + String(count);
                    link.target = j.id+ "_" + String(count);
                    link.color = "white";
                    links_list.push(link); 
                }
                elem.group = 1;
            }  
            else{
                elem.group = 2;
            }
            nodes_list.push(elem); // On crée le noeud   
            
        }
        count += 1;
    }
        var object={
            nodes : nodes_list,
            links : links_list
        };
        console.log(object)
        return object;
}

// Read and parse the JSON file to display the graph
export function jsonFileToGraph(fileDataList) {
    stringToJSON(fileDataList);
    var mapCreatedByParseJSON = parseJSON(window.JSON_OBJECT);
    var object = create3dForceObject(mapCreatedByParseJSON);
    displayGraph(object);
    console.log("=================");
    console.log(createJSON(object));
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

//MARCHE PAS 
export function loadFileAsText() {
    var textFiles = [];
    console.log("------"+ typeof textFiles);

    var filesToLoad = document.getElementById("files").files;
    var fileReader = new FileReader();
    function readFile(index) {
        if( index >= filesToLoad.length ) {
            jsonFileToGraph(textFiles);
            return;
        }  
        var file = filesToLoad[index];
        fileReader.onload = function(fileLoadedEvent) {   
            var content = fileLoadedEvent.target.result;
            textFiles.push(content);
            readFile(index+1);
        };
        fileReader.readAsText(file, "UTF-8");
        
    }
    readFile(0);
    // textFiles.push("content");
    // console.log(textFiles);
    // // var a = textFiles[0];
    // console.log("......\n" );
    // console.log(String(textFiles[0]));
    // jsonFileToGraph(textFiles);

}




export function get3dForceObject() {
    console.log("++++++++++++++++");
    var ForceObject = window.GRAPH.graphData();
    return ForceObject;
}

export function saveGraphToJSON() {
    var ForceObject = get3dForceObject();
    var listOfJSON = createJSON(ForceObject);
    console.log(">>>>>>>>>>");
    console.log(listOfJSON);
    for (const jsonAsText of listOfJSON) {
        var fileName = "OOOOOO";
        fileName += ".json";
        createFile(fileName, jsonAsText);
    }
    // var textFileAsBlob = new Blob([listOfJSON], { type: 'application/json' });
    // var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;
    // var downloadLink = document.createElement("a");
    // downloadLink.download = fileNameToSaveAs;
    // downloadLink.innerHTML = "Download File";
    // if (window.webkitURL != null) {
    //     // Chrome allows the link to be clicked
    //     // without actually adding it to the DOM.
    //     downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    // }
    // else {
    //     // Firefox requires the link to be added to the DOM
    //     // before it can be clicked.
    //     downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    //     downloadLink.onclick = destroyClickedElement;
    //     downloadLink.style.display = "none";
    //     document.body.appendChild(downloadLink);
    // }

    // downloadLink.click();
}

function createFile(fileName, jsonAsText){
    var textFileAsBlob = new Blob([jsonAsText], { type: 'application/json' });
    // var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;
    var downloadLink = document.createElement("a");
    downloadLink.download = fileName;
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

export function createJSON(object3dForce) {
    console.log("CREATE JSON");
    for (var node of object3dForce.nodes) {
        // Recupoerer  l'index de l'object correspondant au node !!!!A REFORMULER ET TRADUIRE
        var objectNumber = node.id.substr(-1);
        console.log(objectNumber);
        // If the node is a reaction
        if (node.group === 1) {
            
            var nodeId = node.id.substring(0,node.id.length-2);
            for (var reaction of window.JSON_OBJECT[objectNumber].reactions) {
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
            for (var metabolite of window.JSON_OBJECT[objectNumber].metabolites) {
                var nodeId =node.id.substring(0,node.id.length-2);
                if (metabolite.id === nodeId) {
                    if (!("coordinates" in metabolite)) {

                        metabolite.coordinates = {};
                    }
                    metabolite.coordinates.x = node.x;
                    metabolite.coordinates.y = node.y;
                    metabolite.coordinates.z = node.z;
                }
            }
            // console.log(window.JSON_OBJECT.metabolites);
            // window.OBJECT.metabolites[node.id].coordinates.x = node.x;
            // window.OBJECT.metabolites[node.id].coordinates.y = node.y;
            // window.OBJECT.metabolites[node.id].coordinates.z = node.z;

        }

        // GESTION DES GENES ???????????????????????????????????????



    }
    var jsonList = [];
    for (const json of window.JSON_OBJECT) {
        jsonList.push(JSON.stringify(json, null, 1));
    }
    
    return jsonList;
}


document.getElementById('ok').addEventListener('click', loadFileAsText);

document.getElementById('saveGraph').addEventListener('click', saveGraphToJSON)