import { api } from "@/lib/axios";
import type { GuestCheckDTO, GuestCheckSummaryDTO } from "../dtos/guest-check.dto";

const ENDPOINT = '/guest-check';

export const GuestCheckService = {
    async listOpened(): Promise<GuestCheckSummaryDTO[]> {
        const result = await api.get<GuestCheckSummaryDTO[]>(ENDPOINT, {
            params: { status: 'OPENED' }
        });
        return result.data;
    },

    async findOne(id: string): Promise<GuestCheckDTO> {
        const result = await api.get<GuestCheckDTO>(`${ENDPOINT}/${id}`);
        return result.data;
    },
}
