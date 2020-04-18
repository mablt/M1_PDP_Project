export class Link {

    constructor(id, source, target) {
        this.id = id;
        this.source = source;
        this.target = target;
    }

    // Getters
    getId() {
        return this.id;
    }
    getSource() {
        return this.source;
    }
    getTarget() {
        return this.target;
    }

    // Setters
    setId(id) {
        this.id = id;
    }
    setSource(source) {
        this.source = source;
    }
    setTarget(target) {
        this.target = target;
    }

}
