// Imports
import { Pathway } from "./Pathway.js";
import { Compound } from "./Compound.js";
import { Reaction } from "./Reaction.js";
// import { json } from "./loadJSON.mjs";
import { parseJSON } from "./parseJSON.js";

console.log("\n\n############ Class test ############\n\n");


// Tests on Compound
var compound1 = new Compound("adp_c", 'GRAPH', "ADP C10H12N5O10P2", "c", -3,"C10H12N5O10P2");
var compound2 = new Compound("id_metabolite2", 'GRAPH', "ADP C10H12N5O10P2", "c", -3,"C10H12N5O10P2");

console.log("~~~~~~~~~ Compound ~~~~~~~~~\n");

console.log(compound1.getId());
console.log("Metabolite2's Coordinates : "+compound2.getCoordinates());
compound2.setCoordinates(45, 72, 2)
console.log("New Metabolite2's Coordinates : "+compound2.getCoordinates());
console.log("Parent's Compound1 : "+compound1.getParent());
console.log("Metabolite1's compartment : "+compound1.getCompartment());
console.log("Metabolite1's annotation : "+compound1.getAnnotation());
console.log("Metabolite2's next elements : "+compound2.getNextElements());

// Tests on Reaction
console.log("~~~~~~~~~ Reaction ~~~~~~~~~\n");
var reaction1 = new Reaction("PFK","Phosphofructokinase", [0,0,0], {"atp_c": -1.0, "f6p_c": -1.0}, {"adp_c": 1.0, "h_c": 1.0,  "fdp_c": 1.0}, 0.0, 1000.0, "b3916 or b1723", "Glycolysis/Gluconeogenesis");
reaction1.addPreviousElement(compound2);
reaction1.addPreviousElement(compound1);
console.log("Reaction1's id : "+reaction1.getId());
console.log(reaction1.getPreviousElements()[0].getId());
var reagents = reaction1.getPreviousElements();
console.log(reagents)
for (var r of reagents){
    console.log(r.getId());   
}
reaction1.removePreviousElement(compound1);
reaction1.addNextElement(compound1);
var reagents = reaction1.getPreviousElements();
for (var r of reagents){
    console.log(r.getId());   
}
console.log(reaction1.getNextElements())
console.log("Reaction1's upper_bound : "+reaction1.getUpperBound());


// Tests on Graph
console.log("~~~~~~~~~ Pathway ~~~~~~~~~\n");
var pathway1 = new Pathway( 'e_coli_core', '{"c": "cytosol","e": "extracellular space"}', '1', "PathwayName");
pathway1.addElement(compound1);
pathway1.addElement(compound2);
pathway1.addElement(reaction1);

console.log(pathway1.getElements());



console.log("~~~~~~~~~ parseJSON test ~~~~~~~~~\n");

fetch('./data.json')
    .then (function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        var pathwayCreatedByParseJSON = parseJSON(data);

        console.log("\n\n\n PATHWAY CREATED \n\n");
        console.log(pathwayCreatedByParseJSON);
        
    })
    .catch(function(err){
        console.log("ERROR");
    });



