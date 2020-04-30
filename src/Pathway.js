import { Graph } from "./Graph.js";

export class Pathway extends Graph{
    constructor(name = "", compartments = {}, version = ""){
        super();
        this.name = name;
        this.compartments = compartments;
        this.version = version;
    }

    // Getters
    getName(){
        return this.name;
    }
    getCompartments(){
        return this.compartments;
    }
    getVersion(){
        return this.version;
    }

    // Setters
    setName(name){
        this.name=name;
    }
    setCompartments(compartments){
        this.compartments = compartments;
    }
    addCompartement(key,value){
        this.compartments.add(key,value);
    }
    setVersion(version){
        this.version= version;
    }


}