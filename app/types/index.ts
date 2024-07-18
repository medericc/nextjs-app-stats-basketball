export interface IStats {
    name: string;
    calories: number;
    carbohydrates: number; // in grams
    protein: number; // in grams
    fat: number; // in grams
    fiber?: number; // in grams, optional
    sugar?: number; // in grams, optional
    vitamins?: string[]; // array of vitamins, optional
    minerals?: string[]; // array of minerals, optional
}

export interface IFoodStat {
    value: string;
    label: string;
}

export interface Data {
    name: 'carbohydrates' | 'protein' | 'fat';
    value: number;
}