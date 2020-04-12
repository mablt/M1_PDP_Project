export class Link {

    constructor(id, name, source, target) {
        this.id = id;
        this.name = name;         // Not necessary ?
        this.source = source;
        this.target = target;
    }

    // Getters
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getSource() {
        return this.source;
    }
    getTarget() {
        return this.target;
    }

    // Setters
    setName(name) {
        this.name = name;
    }
    setId(id) {
        this.id = id;
    }
    setSource(node) {
        this.source = this.source;
    }
    setTarget(node) {
        this.target == this.target;
    }

}
