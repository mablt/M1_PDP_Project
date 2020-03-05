export class Node{

    constructor(id, name, coordinates){
        this.id = id;
        this.name = name;
        this.coordinates = coordinates;
    }

    // Getteurs
    getId(){
        return this.id;
    }
    getName(){
        return this.name;
    }
    getCoordinates(){
        return this.coordinates;
    }

    // Setteurs
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

// Tests
// var monNoeud = new Node("ASE322G", "Name_MonNoeud", [33, 4, 98]);
// console.log(monNoeud.getName());