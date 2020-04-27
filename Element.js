export class Element{
    constructor(id, graph){
        this.id = id;
        this.previousElements = [];
        this.nextElements = [];
        this.coordinates ={};
        this.parent = parent;
    }

    // Getters
    getId(){
        return this.id;
    }
    getPreviousElements(){
        return this.previousElements;
    }
    getNextElements(){
        return this.nextElements;
    }
    getCoordinates(){
        return this.coordinates;
    }
    getParent(){
        return this.parent;
    }

    // Setters
    setId(id){
        this.id = id;
    }
    addPreviousElement(element){
        this.previousElements.push(element);
    }
    addNextElement(element){
        this.nextElements.push(element);
    }
    setCoordinates(x,y,z){
        coordinates = {"x": x,"y":y, "z":z};
        this.coordinates = coordinates;
    }
    setParent(parent){
        this.parent = parent;
    }
}