import { Graph } from "./Graph.js";

export class Map{

    constructor(id){
        this.id = id;
        this.graphs = [];
    }

    getId(){
        return this.id;
    }
    
    getElements(){
        return this.graphs;
    }

    setId(id){
        this.id = id;
    }

    addGraph(graph){
        this.graphs.push(graph);
    }

    removeGraph(id){
        for(var i=0; i< this.graph.length; i++){
            if (graph.id === id) {
                graphs.splice(i, 1);
            }
        }
    }
}