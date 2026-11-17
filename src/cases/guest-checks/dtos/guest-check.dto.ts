import type { SpotDTO } from "@/cases/spots/dtos/spot.dto";

export type GuestCheckStatus = 'OPENED' | 'CLOSED';

export interface GuestCheckDTO {
    id: string;
    createdAt: string;
    status: GuestCheckStatus;
    spot: SpotDTO;
}

// A listagem de comandas também traz o valor total acumulado dos pedidos
export interface GuestCheckSummaryDTO extends GuestCheckDTO {
    total: number;
}
