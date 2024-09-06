export class SpeciesRank {
    static Kingdom = {name: "KINGDOM", priority: 0};
    static Phylum = {name: "PHYLUM", priority: 1};
    static Class = {name: "CLASS", priority: 2};
    static Order = {name: "ORDER", priority: 3};
    static Family = {name: "FAMILY", priority: 4};
    static Genus = {name: "GENUS", priority: 5};
    static Species = {name: "SPECIES", priority: 6};
    static Other = {name: "OTHER", priority: 999}

    public static getSpeciesRankFromValue(value: string) {
        switch(value.toUpperCase()) {
            case this.Kingdom.name:
                return this.Kingdom;
            case this.Phylum.name:
                return this.Phylum;
            case this.Class.name:
                return this.Class;
            case this.Order.name:
                return this.Order;
            case this.Family.name:
                return this.Family;
            case this.Genus.name:
                return this.Genus;
            case this.Species.name:
                return this.Species;
            default:
                return this.Other;
        }
    }
}