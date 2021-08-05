
export class JobStatusResponse {
    status: JobStatusResponse.StatusEnum;
}
export namespace JobStatusResponse {
    export type StatusEnum = 'Launched' | 'Pending' | 'Partial' | 'Paid' | 'Complete' | 'Cancelled';
    export const StatusEnum = {
        Launched: 'Launched' as StatusEnum,
        Pending: 'Pending' as StatusEnum,
        Partial: 'Partial' as StatusEnum,
        Paid: 'Paid' as StatusEnum,
        Complete: 'Complete' as StatusEnum,
        Cancelled: 'Cancelled' as StatusEnum
    };
}
