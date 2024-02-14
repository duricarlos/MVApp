export type Loc = {
    id: number,
    Name: string,
    Lat: number,
    Lng: number,
    Notes: string,
    sells: Sell[],
}
export type Sell = {
    id: number,
    notes: string,
    total: number,
    created_at: string,
}