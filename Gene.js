export class Gene{

    constructor(id, name, notes="", annotation=""){
        this.id = id;
        this.name = name;
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
    getNotes(){
        return this.notes;
    }
    getAnnotation(){
        return this.annotation;
    }

    // Setters
    setId(id){
        this.id = id;
    }
    setName(name){
        this.name = name;
    }
    setNotes(notes){
        this.notes = notes;
    }
    setAnnotation(annotation){
        this.annotation = annotation;
    }
}