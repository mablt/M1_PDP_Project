export class Pathway{
    constructor(id, compartments, version, name="", metabolitesArray=new Array(), reactionsArray=new Array(), linksArray=new Array(), genesArray=new Array()){
        this.id = id;
        this.name = name;
        this.compartments = compartments; 
        this.version = version;
        this.metabolitesArray = metabolitesArray;
        this.reactionsArray = reactionsArray;
        this.linksArray = linksArray;
        this.genesArray = genesArray;
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
    getMetabolitesArray(){
        return this.metabolitesArray;
    }
    getReactionsArray(){
        return this.reactionsArray;
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
    setMetabolitesArray(metabolitesArray){
        this.metabolitesArray = metabolitesArray;
    }
    setReactionsArray(reactionsArray){
        this.reactionsArray = reactionsArray;
    }
    setLinksArray(linksArray){
        this.linksArray = linksArray;
    }

    // Methods
    addMetabolite(metabolite){
        this.metabolitesArray.push(metabolite);
    }
    addReaction(reaction){
        this.reactionsArray.push(reaction);
    }
    addLink(link){
        this.linksArray.push(link);
    }
    removeMetabolite(metabolite){
        var index = this.metabolitesArray.indexOf(metabolite);
        if (index !== -1) 
            this.metabolitesArray.splice(index, 1);
    }
    removeReaction(reaction){
        var index = this.reactionsArray.indexOf(reaction);
        if (index !== -1)
            this.reactionsArray.splice(index, 1);
    }
    removeLink(link){
        var index = this.linksArray.indexOf(link);
        if (index !== -1)
            this.linksArray.splice(index, 1);
    }
}

