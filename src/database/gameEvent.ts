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
    const params: any[] = [];

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