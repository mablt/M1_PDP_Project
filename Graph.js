import { Element } from "./Element.js";

export class Graph{

    constructor(){
        elements = [];
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