import { Request, Response } from 'express';
import pool from '../database/index';
import { getGameEventsDB } from '../database/gameEvent';

export const getGameEvents = async (req: Request, res: Response): Promise<void> => {

    let conn;
    try {
        conn = await pool.getConnection();
        const gameEvents = await getGameEventsDB(conn);
        console.log('gameenets', gameEvents);
        res.json({ data: gameEvents });
    } catch (error) {
        console.error('Error fetching game events:', error);
        res.status(500).json({ message: 'Failed to fetch game events' });
    } finally {
        if (conn) conn.release();
    }
};
