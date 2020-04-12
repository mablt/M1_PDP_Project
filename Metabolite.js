import { Node } from "./Node.js";

export class Metabolite extends Node{

    constructor(id, name, coordinates, compartment, charge, formula,  notes="", annotation=""){
        super(id, name, coordinates, notes, annotation);
        this.compartment = compartment;
        this.charge = charge;
        this.formula = formula;
    }
    

    // Getters
    getCompartment(){
        return this.compartment;
    }
    getCharge(){
        return this.charge;
    }
    getFormula(){
        return this.formula;
    }

    // Setters
    setCompartement(compartment){
        this.compartment = compartment;
    }
    setCharge(charge){
        this.charge = charge;
    }
    setFormula(formula){
        this.formula = formula;
    }
}