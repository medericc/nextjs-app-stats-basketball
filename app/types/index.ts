export interface IStats {
    name: string;
    id:string;
    date: string; // ajout de la propriété date
    opponent: string;
    min: number;
    fgm: number;
    fga: number;
    fg3m: number;
    fg3a: number;
    ftm: number;
    fta: number;
    off: number;
    def: number;
    tot: number;
    eff: number;
    ast: number;
    to: number;
    blk: number;
    stl: number;
    pts: number;
}

export interface IFoodStat {
    value: string;
    label: string;
    id:string;
}

export interface Data {
    name: 'carbohydrates' | 'protein' | 'fat';
    value: number;
    id:string;
}
