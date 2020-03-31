// Imports
import { Node } from "./Node.mjs";
import { Map } from "./Map.mjs";
import { Link } from "./Link.mjs";

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
var map = new Map(1, "Map_Name", listOfNodes, []);
console.log(map.getNodesArray());
map.addNode(node1);
console.log(map.getNodesArray());
console.log(map.getLinksArray());
map.setLinksArray(listOfLinks);
console.log(map.getLinksArray());