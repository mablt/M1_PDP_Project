export class Graph {

    constructor(id) {
        this.id = id;
        this.elements = [];
    }

    /* ----------- Methods ----------- */

    getElementsByName(name) {
        var elements = this.getElements();
        for (var elt of elements) {
            if (elt.name === name) {
                return elt;
            }
        }
        console.log("Error : element name", name, "not found in elements list.");
        return false;
    }

    addElement(element) {
        this.elements.push(element);
    }

    removeElement(id) {
        for (var i = 0; i < this.elements.length; i++) {
            if (element.id === id) {
                elements.splice(i, 1);
            }
        }
    }

    /* ----------- Getters & Setters ----------- */

    getId() {
        return this.id;
    }

    getElements() {
        return this.elements;
    }

    setId(id) {
        this.id = id;
    }
}