export interface ICar {
    vin: string;
    carName: string;
    engineId: number;
    transmissionId: number;
    bodyTypeId: number;
    colorId: number;
    img: string;
}

export interface ICarFull {
    vin: string;
    carName: string;
    engineName: string;
    transmissionType: string;
    bodyType: string;
    colorHex: string;
    img: string;
}