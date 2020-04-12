export class Pathway{
    constructor(id, compartments, version, name="", nodesArray=new Array(), linksArray=new Array()){
        this.id = id;
        this.name = name;
        this.compartments = compartments; 
        this.version = version;
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
    getCompartements(){
        return this.compartments;
    }
    getVersion(){
        return this.version;
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
    setCompartments(compartments){
        this.compartments = compartments;
    }
    setVersion(version){
        this.version = version;
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

