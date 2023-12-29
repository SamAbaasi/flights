export type FlightsType = {
    id: number;
    airline: {
        code: string;
        codes: string[];
        name: string;
        name_en: string;
        logo_filename: string;
    };
    flightTime: string;
    arrivalTime: string;
    capacity: number;
    price: string;
}