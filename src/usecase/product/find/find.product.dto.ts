export interface InputFindProductDto {
    type: string;
    id: string;
}

export interface OutputFindProductDto {
    id: string;
    name: string;
    price: number;
}
