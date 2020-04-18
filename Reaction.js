import { Node } from "./Node.js";


export class Reaction extends Node{

    constructor(id, name, coordinates, reagents, products, lower_bound, upper_bound, gene_reaction_rule, subsystem, notes="", annotation=""){
        super(id, name, coordinates, notes, annotation);
        this.reagents = reagents;
        this.products = products
        this.lower_bound = lower_bound;
        this.upper_bound = upper_bound;
        this.gene_reaction_rule = gene_reaction_rule;
        this.subsystem = subsystem;
    }
    
    // Getters
    getReagents(){
        return this.reagents;
    }
    getProducts(){
        return this.products;
    }
    getLower_bound(){
        return this.lower_bound;
    }
    getUpper_bound(){
        return this.upper_bound;
    }
    getGene_reaction_rule(){
        return this.gene_reaction_rule;
    }
    getSubsystem(){
        return this.subsystem;
    }

    // Setters
    setReagents(reagents){
        this.reagents = reagents;
    }
    setProducts(products){
        this.products = products;
    }
    setLower_bound(lower_bound){
        this.lower_bound = lower_bound;
    }
    setUpper_bound(upper_bound){
        this.upper_bound = upper_bound;
    }
    setGene_reaction_rule(gene_reaction_rule){
        this.gene_reaction_rule = gene_reaction_rule;
    }
    setSubsystem(subsystem){
        this.subsystem = subsystem;
    }

}