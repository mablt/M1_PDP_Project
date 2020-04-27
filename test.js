// Imports
import { Pathway } from "./Pathway.js";
import { Compound } from "./Compound.js";
import { Reaction } from "./Reaction.js";

console.log("\n\n############ Class test ############\n\n");


// Tests on Compound
var compound1 = new Compound("adp_c", "ADP C10H12N5O10P2", [33, 4, 98], "c", -3,"C10H12N5O10P2");
var compound2 = new Compound("id_metabolite2", "Metabolite_2", [3, 24, 12]);

console.log("~~~~~~~~~ Compound ~~~~~~~~~\n");

console.log(compound1.getId());
console.log("Metabolite2's Coordinates : "+compound2.getCoordinates(),);
// compound2.setCoordinates([45, 72, 2])
// console.log("New Metabolite2's Coordinates : "+compound2.getCoordinates());
console.log("Metabolite1's compartment : "+compound1.getCompartment());
console.log("Metabolite1's annotation : "+compound1.getAnnotation());
console.log("Metabolite2's next elements : "+compound2.getNextElements());

// Tests on Reaction
console.log("~~~~~~~~~ Reaction ~~~~~~~~~\n");
var reaction1 = new Reaction("PFK","Phosphofructokinase", [0,0,0], {"atp_c": -1.0, "f6p_c": -1.0}, {"adp_c": 1.0, "h_c": 1.0,  "fdp_c": 1.0}, 0.0, 1000.0, "b3916 or b1723", "Glycolysis/Gluconeogenesis");
reaction1.addPreviousElement(compound2);
reaction1.addPreviousElement(compound1);
console.log("Reaction1's id : "+reaction1.getId());
console.log(reaction1.getPreviousElements()[0].getId())
var reagents = reaction1.getPreviousElements();
for (var r in reagents){
    console.log(r.getId());   
}
reaction1.removePreviousElement(compound1);
reaction1.addNextElement(compound1);
var reagents = reaction1.getPreviousElements();
for (var r in reagents){
    console.log(r.getId());   
}
console.log(reaction1.getNextElements())
// console.log("Reaction1's products : "+reaction1.getProducts());
// var products = reaction1.getProducts();
// for (var p in products){
//     console.log(p); 
//     console.log(products[p]);
// }
console.log("Reaction1's upper_bound : "+reaction1.getUpperBound());

// Tests on Link
// console.log("~~~~~~~~~ Link ~~~~~~~~~\n");
// var link1 = new Link("91", metabolite2, reaction1);
// var link2 = new Link("92", reaction1, metabolite1);
// console.log(link1.getSource());
// console.log(link2.getTarget());

// Tests on Graph
console.log("~~~~~~~~~ Pathway ~~~~~~~~~\n");
var listOfElements = [compound1, compound2, reaction1]
var pathway1 = new Pathway(listOfElements, 'e_coli_core', '{"c": "cytosol","e": "extracellular space"}', '1', "PathwayName");
// console.log("Elements' array : ");
// console.log(pathway1.getMetabolitesArray());
// pathway1.addMetabolite(metabolite2);
// console.log("Metabolites' array (2 metabolites) : ");
// console.log(pathway1.getMetabolitesArray());
// console.log("Reactions' array (1 reaction) : ");
// console.log(pathway1.getReactionsArray());
// pathway1.removeReaction(reaction1);
// console.log("Reactions' array (empty) : ");;
// console.log(pathway1.getReactionsArray());
// console.log("Links' array (empty) : ");
// console.log(pathway1.getLinksArray());
// pathway1.setLinksArray(listOfLinks);
// console.log("Links' array (2 links) : ");
// console.log(pathway1.getLinksArray());


