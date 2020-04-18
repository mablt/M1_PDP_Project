
import { Pathway } from "./Pathway.js";
import { Metabolite } from "./Metabolite.js";
import { Reaction } from "./Reaction.js";
import { Gene } from "./Gene.js";
// import { json } from "./loadJSON.js";


export function parseJSON(json){
    alert(json.id);
    var pathway = new Pathway(json.id, json.compartments, json.version, "NAME_OF_THE_PATHWAY");
    alert(json.metabolites);
    for(var m of json.metabolites){
        var metabolite = new Metabolite(m.id, m.name, [0,0,0], m.compartment, m.charge, m.formula);
        pathway.addMetabolite(metabolite);
    }
    for(var r of json.reactions){
        var reagents = {};
        var products = {};
        for(var key in r.metabolites){
            var value = r.metabolites[key];
            if(value < 0){
                reagents[key] = value;
            }
            else{
                products[key] = value;
            }
        }
        var reaction = new Reaction(r.id, r.name, [0, 0, 0], reagents, products, r.lower_bound, r.upper_bound, r.gene_reaction_rule, r.subsystem);
        pathway.addReaction(reaction);
    }
    for(var g of json.genes){
        var gene = new Gene(g.id, g.name);
        pathway.addGene(gene);
    }
    return pathway;
}

// console.log("~~~~~~ Creation of the Pathway object ~~~~~~~\n");
// var p = parseJSON(json);
// console.log(p);