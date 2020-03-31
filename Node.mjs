export class Node{

    constructor(id, name, coordinates){
        this.id = id;
        this.name = name;
        this.coordinates = coordinates;
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

    
}

