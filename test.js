// Imports
import { Node } from "./Node.js";
import { Pathway } from "./Pathway.js";
import { Link } from "./Link.js";
import { Metabolite } from "./Metabolite.js";
import { Reaction } from "./Reaction.js";

console.log("\n\n############ Class test ############\n\n");

var node1 = new Node(1001, "Node_1", [33, 4, 98]);
var node2 = new Node(1002, "Node_2", [3, 24, 12]);
var node3 = new Node(1003, "Node_3", [90, 75, 208]);
// Tests on Node
console.log("~~~~~~~~~ Node ~~~~~~~~~\n");
console.log(node1.getId());
console.log("Node2's Coordinates : "+node2.getCoordinates());
node2.setCoordinates([45, 72, 2])
console.log("New Node2's Coordinates : "+node2.getCoordinates());

// Tests on Link
console.log("~~~~~~~~~ Link ~~~~~~~~~\n");
var link1 = new Link(91, "Link1", node2, node3);
var link2 = new Link(92, "Link2", node2, node1);
console.log(link1.getSource());
link2.setName("New_Name_link2"); 
console.log(link2.getName());

// Tests on Map
console.log("~~~~~~~~~ Map ~~~~~~~~~\n");
var listOfNodes = [node2, node3];
var listOfLinks = [link1, link2];
var map = new Pathway(1, "Map_Name", listOfNodes, []);
console.log(map.getNodesArray());
map.addNode(node1);
console.log(map.getNodesArray());
console.log(map.getLinksArray());
map.setLinksArray(listOfLinks);
console.log(map.getLinksArray());


var metabolite1 = new Metabolite("adp_c", "ADP C10H12N5O10P2", [33, 4, 98], "c", -3,"C10H12N5O10P2");
var metabolite2 = new Metabolite("id_metabolite2", "Metabolite_2", [3, 24, 12]);


// Tests on Metabolite
console.log("~~~~~~~~~ Metabolite ~~~~~~~~~\n");

console.log(metabolite1.getId());
console.log("Metabolite2's Coordinates : "+metabolite2.getCoordinates(),);
metabolite2.setCoordinates([45, 72, 2])
console.log("New Metabolite2's Coordinates : "+metabolite2.getCoordinates());
console.log("Metabolite1's compartment : "+metabolite1.getCompartment());
console.log("Metabolite1's annotation : "+metabolite1.getAnnotation());


// Tests on Reaction
console.log("~~~~~~~~~ Reaction ~~~~~~~~~\n");
var reaction1 = new Reaction("PFK","Phosphofructokinase", [0,0,0], {"adp_c": 1.0, "atp_c": -1.0, "f6p_c": -1.0, "fdp_c": 1.0, "h_c": 1.0}, 0.0, 1000.0, "b3916 or b1723", "Glycolysis/Gluconeogenesis");
console.log("Reaction1's id : "+reaction1.getId());
var metabolites = reaction1.getMetabolites();
for (let i =0; i<metabolites.length; i++){
    console.log(metabolites);           // Doesn't work...
}
console.log("Reaction1's metabolites : "+reaction1.getMetabolites()); // Doesn't work...
console.log("Reaction1's upper_bound : "+reaction1.getUpper_bound());