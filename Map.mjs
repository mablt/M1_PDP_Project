export class Map{
    constructor(id, name, nodesArray, linksArray){
        this.id = id;
        this.name = name;
        this.nodesArray = nodesArray;
        this.linksArray = linksArray;
    }

    // Getters
    getId(){
        return this.id;
    }
    getName(){
        return this.name;
    }
    getNodesArray(){
        return this.nodesArray;
    }
    getLinksArray(){
        return this.linksArray;
    }

    // Setters
    setName(name){
        this.name = name;
    }
    setId(id){
        this.id = id;
    }
    setNodesArray(nodesArray){
        this.nodesArray = nodesArray;
    }
    setLinksArray(linksArray){
        this.linksArray = linksArray;
    }

    // Methods
    addNode(node){
        this.nodesArray.push(node);
    }
    addLink(link){
        this.linksArray.push(link);
    }
}

