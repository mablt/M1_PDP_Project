import { Node } from "./Node.mjs";
import { Map } from "./Map.mjs";
import { Edge } from "./Edge.mjs";

var node1 = new Node("ACC1", "Node_1", [33, 4, 98]);
var node2 = new Node("ACC2", "Node_2", [3, 24, 12]);
var node3 = new Node("ACC3", "Node_3", [90, 75, 208]);
// Tests on Node
console.log("~~~~~~~~~ Node ~~~~~~~~~\n");
console.log(node1.getId());
console.log("Node2's Coordinates : "+node2.getCoordinates());
node2.setCoordinates([45, 72, 2])
console.log("New Node2's Coordinates : "+node2.getCoordinates());

// Tests on Edge
console.log("~~~~~~~~~ Edge ~~~~~~~~~\n");
var edge1 = new Edge("Id1", "Edge1", node2, node3);
var edge2 = new Edge("Id2", "Edge2", node2, node1);
console.log(edge1.getStartNode());
edge2.setName("New_Name_edge2");
console.log(edge2.getName());

// Tests on Map
console.log("~~~~~~~~~ Map ~~~~~~~~~\n");
var listOfNodes = [node2, node3];
var listOfEdges = [edge1, edge2];
var map = new Map("MAP1", "Map_Name", listOfNodes, []);
console.log(map.getNodesArray());
map.addNode(node1);
console.log(map.getNodesArray());
console.log(map.getEdgesArray());
map.setEdgesArray(listOfEdges);
console.log(map.getEdgesArray());