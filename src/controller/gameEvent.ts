import { Request, Response } from 'express';
import pool from '../database/index';

export const getGameEvents = async (req: Request, res: Response): Promise<void> => {
    const { playerId } = req.query;

    let conn;
    try {
        conn = await pool.getConnection();

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
        res.json({ data: rows });
    } catch (error) {
        console.error('Error fetching game events:', error);
        res.status(500).json({ message: 'Failed to fetch game events' });
    } finally {
        if (conn) conn.release();
    }
};
