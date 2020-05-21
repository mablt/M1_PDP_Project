export class Element {

    constructor(id, parent) {
        this.id = id;
        this.parent = parent;
        this.previousElements = [];
        this.nextElements = [];
        this.coordinates = {};
    }

    /* ----------- Methods ----------- */

    addPreviousElement(element) {
        this.previousElements.push(element);
    }

    addNextElement(element) {
        this.nextElements.push(element);
    }

    removePreviousElement(element) {
        var index = this.previousElements.indexOf(element);
        if (index !== -1)
            this.previousElements.splice(index, 1);
    }

    removeNextElement(element) {
        var index = this.nextElements.indexOf(element);
        if (index !== -1)
            this.nextElements.splice(index, 1);
    }

    /* ----------- Getters & Setters ----------- */

    getId() {
        return this.id;
    }

    getPreviousElements() {
        return this.previousElements;
    }

    getNextElements() {
        return this.nextElements;
    }

    getCoordinates() {
        return this.coordinates;
    }

    getParent() {
        return this.parent;
    }

    setId(id) {
        this.id = id;
    }

    setCoordinates(x, y, z) {
        var coordinates = { "x": x, "y": y, "z": z };
        this.coordinates = coordinates;
    }

    setParent(parent) {
        this.parent = parent;
    }
}