import { Graph } from "./Graph.js";

export class Pathway extends Graph {

    constructor(id, name = "", compartments = {}, version = "") {
        super(id);
        this.name = name;
        this.compartments = compartments;
        this.version = version;
    }

    /* ----------- Methods ----------- */

    addCompartment(key, value) {
        this.compartments.add(key, value);
    }

    /* ----------- Getters & Setters ----------- */

    getName() {
        return this.name;
    }

    getCompartments() {
        return this.compartments;
    }

    getVersion() {
        return this.version;
    }

    setName(name) {
        this.name = name;
    }

    setCompartments(compartments) {
        this.compartments = compartments;
    }

    setVersion(version) {
        this.version = version;
    }
}