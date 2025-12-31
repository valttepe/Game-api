import { Request, Response } from 'express';
import pool from '../database/index';
import { addGameEvent, getCurrentBalance, getGameEventsDB, updatePlayerBalance } from '../database/gameEvent';
import { BalanceResponse, GameEvent } from '../types';
import { PoolConnection } from 'mariadb/*';

export const getGameEvents = async (req: Request, res: Response): Promise<void> => {

    let conn;
    try {
        conn = await pool.getConnection();
        const gameEvents = await getGameEventsDB(conn);
        console.log('gameevents', gameEvents);
        res.json({ events: gameEvents });
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
        // Check Balance
        const currentBalance = await getCurrentBalance(conn, gameEvent.playerId);
        // Send message if there isn't enough money to play
        if (checkIfPlayerHasMoney(currentBalance, gameEvent)) {
            return res.json({ status: 200, message: 'You are poor :)' });
        }
        // Create game event 
        const game = await addGameEvent(conn, gameEvent);

        // Update Balance
        const updatedBalance = await updatePlayerBalance(conn, gameEvent);

        // Commit transaction 
        await conn.commit();
        const responseBalance = await getCurrentBalance(conn, gameEvent.playerId);
        // Send information back to user
        const response: BalanceResponse = { eventId: gameEvent.eventId, balance: responseBalance.balance }

        return res.json(response)
    } catch (error) {
        console.error('Error occured', error)
        if (conn) await conn.rollback();
        return res.json({ status: 500, message: 'Something went wrong' });
    } finally {
        if (conn) conn.release();
    }
}
function checkIfPlayerHasMoney(currentBalance: Balance, gameEvent: GameEvent) {
    return gameEvent.eventType == 'purchase'
        ? Number(currentBalance.balance) < Number(gameEvent.amount)
        : false;
}

