import { Relation } from "./Relation.js";

export class Reaction extends Relation{
    constructor(id,parent, name, lowerBound=null,upperBound=null,substystem=null){
        super(id,parent);
        this.name = name;
        this.lowerBound = lowerBound;
        this.upperBound = upperBound;
        this.substystem = substystem;
        this.notes = "";
        this.annotation = {};
        this.enzyme = "";

    }
    
    // Getters
    getName(){
        return this.name;
    }

    getLowerBound(){
        return this.lowerBound;
    }
    getUpperBound(){
        return this.upperBound;
    }
    getSubsystem(){
        return this.substystem;
    }
    getNotes(){
        return this.notes;
    }
    getAnnotation(){
        return this.annotation;
    }
    getEnzyme(){
        return this.enzyme;
    }

    //Setters
    setName(name){
        this.name = name;
    }

    setLowerBound(lowerBound){
        this.lowerBound = lowerBound;
    }
    setUpperBound(upperBound){
        this.upperBound=upperBound;
    }

    setSubsystem(subsystem){
        this.substystem = subsystem;
    }

    setNotes(notes){
        this.notes = notes;
    }

    setAnnotation(annotation){
        this.annotation = annotation;
    }

    addAnotation(DbName, annotation){
        this.annotation.add(DbName,annotation);
    }
    setEnzyme(enzyme){
        this.enzyme=enzyme;
    }

}