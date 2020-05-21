export class Map {

    constructor(id) {
        this.id = id;
        this.graphs = [];
    }

    /* ----------- Methods ----------- */

    getGraphById(id) {
        for (var graph of this.graphs) {
            console.log(graph.getId());
            console.log(this.graphs);
            if (graph.getId() === id) {
                return graph;
            }
        }
        console.log("graph id", id, "not found in graphs list.");
        return false;
    }

    addGraph(graph) {
        this.graphs.push(graph);
    }

    removeGraph(id) {
        for (var i = 0; i < this.graph.length; i++) {
            if (graph.id === id) {
                graphs.splice(i, 1);
            }
        }
    }

    /* ----------- Getters & Setters ----------- */

    getId() {
        return this.id;
    }

    getGraphs() {
        return this.graphs;
    }

    setId(id) {
        this.id = id;
    }
}