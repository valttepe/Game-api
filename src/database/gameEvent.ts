import { PoolConnection } from "mariadb/*";
import { GameEvent } from "../types";

export const getGameEventsDB = async (conn: any, playerId?: string) => {
    let query = `
        SELECT
            event_id,
            player_id,
            event_type,
            amount,
            event_time
        FROM game_events
        `;
    const params = [];

    if (playerId) {
        query += ' WHERE player_id = ?';
        params.push(playerId);
    }

    query += `
        ORDER BY event_time DESC
        `;

    const rows = await conn.query(query, params);
    console.log('rows', rows);
    return rows;
}

interface Balance {
    balance: string
}

export const getCurrentBalance = async (conn: PoolConnection, playerId: string) => {
    let query = `
        SELECT
            balance
        FROM players
        WHERE player_id = ?
        `;
    const params = [];
    params.push(playerId);
    const rows: Balance[] = await conn.query(query, params);

    return rows[0];
}

export const updatePlayerBalance = async (conn: PoolConnection, gameEvent: GameEvent) => {
    // Update query for increasing/decreasing balance
    let query = `

    `



    return '100';
}

export const addGameEvent = async (conn: PoolConnection, gameEvent: GameEvent) => {
    // Insert into create table
    let query = `

    `



    return '100';
}