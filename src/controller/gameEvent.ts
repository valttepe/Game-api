import { Request, Response } from 'express';
import pool from '../database/index';
import { addGameEvent, getCurrentBalance, getGameEventsDB, updatePlayerBalance } from '../database/gameEvent';
import { BalanceResponse, GameEvent } from '../types';
import { PoolConnection } from 'mariadb/*';

// Only for testing purposes
const getRandomUUID = () => {
    return crypto.randomUUID();
}

export const getGameEvents = async (req: Request, res: Response): Promise<void> => {

    let conn;
    try {
        conn = await pool.getConnection();
        const gameEvents = await getGameEventsDB(conn);
        console.log('gameevents', gameEvents);
        res.json({ data: gameEvents });
    } catch (error) {
        console.error('Error fetching game events:', error);
        res.status(500).json({ message: 'Failed to fetch game events' });
    } finally {
        if (conn) conn.release();
    }
};



export const putGameEvent = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    let conn;

    const gameEvent: GameEvent = req.body;
    // TODO: validate payload


    // Update balance for the player
    try {
        conn = await pool.getConnection();
        conn.beginTransaction()
        const currentBalance = await getCurrentBalance(conn, gameEvent.playerId);
        console.log('Balance', currentBalance);
        if (Number(currentBalance.balance) < Number(gameEvent.amount)) {
            return res.json({ status: 200, message: 'You are poor :)' });
        }

        const game = await addGameEvent(conn, gameEvent);
        const updatedBalance = await updatePlayerBalance(conn, gameEvent);
    } catch (error) {
        console.error('Error occured', error)
        return res.json({ status: 500, message: 'Something went wrong' });
    } finally {
        if (conn) conn.release();
    }

    // Return current balance as an response

    console.log('details', gameEvent)
    const response: BalanceResponse = { eventId: gameEvent.eventId, balance: '200' }
    return res.json(response)
}
