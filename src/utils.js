
// Imports
import { Pathway } from "./Pathway.js";
import { Compound } from "./Compound.js";
import { Reaction } from "./Reaction.js";
import { Gene } from "./Gene.js";

/**
 * Transform the JSON file data as string to JSON object
 * 
 * @param  {} jsonString JSON file data as string
 */
export function stringToJSON(jsonString){
    return JSON.parse(jsonString);
}

/**
 * Parse the JSON object and instanciate the objects
 * 
 * @param  {} json JSON object contains data from the JSON file
 * @return Pathway object which contains the elements
 */
export function parseJSON(json){
    // Patwhay object creation
    var pathway = new Pathway(json.id, "NAME", json.compartments, json.version);
    // Compounds objects creation
    for(var m of json.metabolites){
        var compound = new Compound(m.id, pathway, m.name, m.compartment, m.charge, m.formula);
        if ("coordinates" in m) {
            compound.setCoordinates(m.coordinates.x, m.coordinates.y, m.coordinates.z);
        }
        // Add compound to the patwhay
        pathway.addElement(compound);
    }
    // Reactions objects creation
    for(var r of json.reactions){
        var reaction = new Reaction(r.id, pathway, r.name, r.lower_bound, r.upper_bound, r.subsystem);
        for(var key in r.metabolites){
            var value = r.metabolites[key];
            var data =  {"id" : key};
            // If the metabolites is a reagent
            if(value < 0){
                data.quantity = Math.abs(value);
                // Add the metabolite to previous element
                reaction.addPreviousElement(data);
                // Put the reaction as new next compound
                putElementToNextElementCompound(pathway, key, reaction.id);
            }
            // If the metabolites is a products
            else{
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
    for(var g of json.genes){
        var gene = new Gene(g.id, g.name);
        // pathway.addGene(gene);               // FUNCTION NOT INSTANCIED FOR THE MOMENT
    }
    return pathway;
}




/**
 * @param  {} pathway Pathway object which is created during the parsing
 * @param  {} idCompoundToSearch Id of the compound where the reaction id will be added in previous elements
 * @param  {} idElementToAdd Id of the reaction to add
 */
function putElementToPreviousElementCompound(pathway, idCompoundToSearch, idElementToAdd){
    for(var element of pathway.getElements()){
        if(element.getId() == idCompoundToSearch){
            element.addPreviousElement({"id" : idElementToAdd});
        }
    }
}


/**
 * @param  {} patwhay Pathway object which is created during the parsing
 * @param  {} idCompoundToSearch Id of the compound where the reaction id will be added in next elements
 * @param  {} idElementToAdd Id of the reaction to add
 */
function putElementToNextElementCompound(patwhay, idCompoundToSearch, idElementToAdd){
    for(var element of patwhay.getElements()){
        if(element.getId() === idCompoundToSearch){
            element.addNextElement({"id" : idElementToAdd});
        }
    }
}



/**
 * Create the 3D-Force object required to display the graph with the 3D-Force Graph library
 * 
 * @param  {Pathway} pathway Pathway object which contains the data
 * @return {} 3D-Force object which contains nodes and links data
 */
export function create3dForceObject(pathway){
    var nodes_list = [];
    var links_list = [];
    for (var i of pathway.getElements()){ // Pour chaque élément de la liste
        var elem = i;
        // var elem = {};
        // elem.id = i.getId();
        // elem.name = i.getName();
        var coordinates = i.getCoordinates();
        if ((coordinates.x != undefined) && (coordinates.y != undefined) && (coordinates.z != undefined)) {
            elem.fx = coordinates.x;
            elem.fy = coordinates.y;
            elem.fz = coordinates.z;
        }
        
        if (i instanceof(Reaction)){ // Si c'est une réaction
            // On crée les liens
            for (var j of i.getPreviousElements()){
                var link = {};
                link.source = j.id;
                link.target =  i.getId();
                link.color="red";
                console.log(j.id)
                links_list.push(link); 
            }   
            for (var j of i.getNextElements()){
                var link ={};
                link.source = i.getId();
                link.target = j.id;
                link.color = "blue";
                links_list.push(link); 
            }
            elem.group = 1
        }  
        else{
            elem.group = 2;
        }
        nodes_list.push(elem); // On crée le noeud   
        
    }
        var object={
            nodes : nodes_list,
            links : links_list
        }
        console.log(object);
        return object;
}

// export function create3dForceObject(pathway){
//     var nodes_list = [];
//     var links_list = [];
//     for (var i of pathway.getElements()){ // Pour chaque élément de la liste
//         var elem = {};
//         elem.id = i.getId();
//         elem.name = i.getName();
//         var coordinates = i.getCoordinates();
//         if ((coordinates.x != undefined) && (coordinates.y != undefined) && (coordinates.z != undefined)) {
//             elem.fx = coordinates.x;
//             elem.fy = coordinates.y;
//             elem.fz = coordinates.z;
//         }
        
//         if (i instanceof(Reaction)){ // Si c'est une réaction
//             // On crée les liens
//             for (var j of i.getPreviousElements()){
//                 var link = {};
//                 link.source = j.id;
//                 link.target =  i.getId();
//                 link.color="red";
//                 console.log(j.id)
//                 links_list.push(link); 
//             }   
//             for (var j of i.getNextElements()){
//                 var link ={};
//                 link.source = i.getId();
//                 link.target = j.id;
//                 link.color = "blue";
//                 links_list.push(link); 
//             }
//             elem.group = 1
//         }  
//         else{
//             elem.group = 2;
//         }
//         nodes_list.push(elem); // On crée le noeud   
        
//     }
//         var object={
//             nodes : nodes_list,
//             links : links_list
//         }
//         return object;
// }


// Read and parse the JSON file to display the graph
export function jsonFileToGraph(data){
    var jsonObject = stringToJSON(data);
    var pathwayCreatedByParseJSON = parseJSON(jsonObject);
    var object = create3dForceObject(pathwayCreatedByParseJSON);
    displayGraph(object);
    console.log("=================");
    console.log(createJSON(object));
}


export function displayGraph(object){
    window.Graph = ForceGraph3D();
    window.Graph(document.getElementById('3d-graph'))
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

export function get3dForceObject(){
    console.log("++++++++++++++++");
    var ForceObject = window.Graph.graphData();
    return ForceObject;
}

export function saveTextAsFile()
{
    var ForceObject = get3dForceObject();
    var textToWrite = createJSON(ForceObject);
    console.log(">>>>>>>>>>");
    console.log(textToWrite);
    var textFileAsBlob = new Blob([textToWrite], {type:'application/json'});
    var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;
      var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null)
    {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else
    {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
}

export function createJSON(object3dForce){
    var json = {
        metabolites : [],
        reactions : [],
        genes : []
    };
    for(var node of object3dForce.nodes){
        // If the node is a reaction
        if(node.group === 1){
            var reaction = {
                "id": node.id,
                "name": node.name,
                "lower_bound": node.lowerBound,
                "upper_bound": node.upperBound,
                // "gene_reaction_rule": node., // PAS PRIS EN COMPTE DANS REACTION PR LE MOMENT
                "subsystem": node.subsystem,
                "notes": node.notes,
                "annotation": node.annotation, 
                "metabolites" : {}
            };
            for (var element of node.previousElements) {
                reaction.metabolites[element.id] = -(element.quantity);
            }
            for (var element of node.nextElements) {
                reaction.metabolites[element.id] = element.quantity;
            }
            json.reactions.push(reaction);
        }
        else {
            var metabolite = {
                "id": node.id,
                "name": node.name,
                "compartment": node.compartment,
                "charge": node.charge,
                "formula": node.formula,
                "notes": node.notes,
                "annotation": node.annotation
            };
            json.metabolites.push(metabolite);
        }

        // GESTION DES GENES ???????????????????????????????????????



    }
    return JSON.stringify(json);
}


document.getElementById('ok').addEventListener('click', loadFileAsText);

document.getElementById('saveGraph').addEventListener('click', saveTextAsFile)