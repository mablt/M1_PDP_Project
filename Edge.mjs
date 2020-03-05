export class Edge{

    constructor(id, name, startNode, endNode){
        this.id = id;
        this.name = name;
        this.startNode = startNode;
        this.endNode = endNode;
    }

    // Getteurs
    getId(){
        return this.id;
    }
    getName(){
        return this.name;
    }
    getStartNode(){
        return this.startNode;
    }
    getEndNode(){
        return this.endNode;
    }

    // Setteurs
    setName(name){
        this.name = name;
    }
    setId(id){
        this.id = id;
    }
    setStartNode(node){
        this.startNode = this.startNode;
    }
    setEndNode(node){
        this.endNode == this.endNode;
    }
    
}

// Tests
