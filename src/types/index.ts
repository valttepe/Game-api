

export interface GameEvent {
    eventId: string,
    playerId: string,
    eventType: 'win' | 'purchase'
    amount: string
}
export interface BalanceResponse {
    eventId: string,
    balance: string
}