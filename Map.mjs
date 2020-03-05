export class Map{
    constructor(id, name, nodesArray, edgesArray){
        this.id = id;
        this.name = name;
        this.nodesArray = nodesArray;
        this.edgesArray = edgesArray;
    }

    // Getteurs
    getId(){
        return this.id;
    }
    getName(){
        return this.name;
    }
    getNodesArray(){
        return this.nodesArray;
    }
    getEdgesArray(){
        return this.edgesArray;
    }

    // Setteurs
    setName(name){
        this.name = name;
    }
    setId(id){
        this.id = id;
    }
    setNodesArray(nodesArray){
        this.nodesArray = nodesArray;
    }
    setEdgesArray(edgesArray){
        this.edgesArray = edgesArray;
    }

    // Methodds
    addNode(node){
        this.nodesArray.push(node);
    }
    addEdge(edge){
        this.edgesArray.push(edge);
    }
}

