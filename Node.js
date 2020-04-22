export class Node{

    constructor(id, name, coordinates, notes="", annotation=""){
        this.id = id;
        this.name = name;
        this.coordinates = coordinates;
        this.notes = notes;
        this.annotation = annotation;
    }

    // Getters
    getId(){
        return this.id;
    }
    getName(){
        return this.name;
    }
    getCoordinates(){
        return this.coordinates;
    }

    getNotes(){
        return this.notes;
    }

    getAnnotation(){
        return this.annotation;
    }

    // Setters
    setName(name){
        this.name = name;
    }
    setId(id){
        this.id = id;
    }
    setCoordinates(coordinates){    
        this.coordinates = coordinates;
    }
    setNotes(notes){
        this.notes = notes;
    }
    setAnnotation(annotation){
        this.annotation = annotation;
    }
    
}

