export class TaxonRank {
    id: number = 0;
    rank: string = "";

    public constructor(id: number, rank: string) {
        this.id = id;
        this.rank = rank;
    }
}