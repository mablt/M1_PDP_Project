import { Entity } from "./Entity.js";

export class Compound extends Entity{
    
    constructor(id, parent, name, compartment=null, charge=null, formula=null, notes="", annotation={}){
        super(id, parent);
        this.name = name;
        this.compartment = compartment;
        this.charge = charge;
        this.formula = formula;
        this.notes = notes;
        this.annotation = annotation;
    }

    getName(){
        return this.name;
    }

    getCompartment(){
        return this.compartment;
    }

    getCharge(){
        return this.charge;
    }

    getFormula(){
        return this.formula;
    }

    getNotes(){
        return this.notes;
    }

    getAnnotation(){
        return this.annotation;
    }

    setName(name){
        this.name = name;
    }
    
    setCompartement(compartment){
        this.compartment = compartment;
    }

    setCharge(charge){
        this.charge = charge;
    }

    setFormula(formula){
        this.formula = formula;
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


}
