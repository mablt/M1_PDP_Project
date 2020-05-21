import { Entity } from "./Entity.js";

export class Gene extends Entity {

    constructor(id, parent, name, notes = "", annotation = {}) {
        super(id, parent);
        this.name = name;
        this.notes = notes;
        this.annotation = annotation;
    }

    /* ----------- Methods ----------- */

    addAnotation(dbName, annotation) {
        this.annotation.add(dbName, annotation);
    }
    
    /* ----------- Getters & Setters ----------- */

    getName() {
        return this.name;
    }

    getNotes() {
        return this.notes;
    }

    getAnnotation() {
        return this.annotation;
    }

    setName(name) {
        this.name = name;
    }

    setAnnotation(annotation) {
        this.annotation = annotation;
    }
}
