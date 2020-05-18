import { Element } from "./Element.js";

export class Graph{

    constructor(id){
        this.id = id;
        this.elements = [];
    }

    getId(){
        return this.id;
    }
    
    getElements(){
        return this.elements;
    }

    getElementsByName(name){
        var elements=this.getElements();
        for (var elt of elements){
            console.log("elt de graph.getElementsByName(name)",elt);
            if (elt.name===name){
                return elt;
            }
        }
        console.log("element name", name, "not found in elements list.");
        return false;
    }

    setId(id){
        this.id = id;
    }

    addElement(element){
        this.elements.push(element);
    }

    removeElement(id){
        for(var i=0; i< this.elements.length; i++){
            if (element.id === id) {
                elements.splice(i, 1);
            }
        }
    }
}