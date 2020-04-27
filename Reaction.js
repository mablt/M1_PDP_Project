import { Relation } from "./Relation";

export class Reaction extends Relation{
    constructor(id,parent,lowerBound=null,upperBound=null,substystem=null){
        super(id,parent);
        this.lowerBound = lowerBound;
        this.upperBound = upperBound;
        this.substystem = substystem;
        this.notes = "";
        this.annotation = {};
        this.enzyme = "";

    }

}