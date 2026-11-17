export interface SpotDTO {
    id: string;
    name: string;
    active: boolean;
}

export type SpotFormDTO = Omit<SpotDTO, 'id'>;
