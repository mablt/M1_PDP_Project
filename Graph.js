import { Element } from "./Element.js";

export class Graph{

    constructor(){
        this.elements = [];
    }

    getElements(){
        return this.elements;
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