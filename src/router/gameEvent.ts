import { Router } from 'express';
import { getGameEvents, putGameEvent } from '../controller/gameEvent';


const router = Router();
/**
 * @api {get} /api/game-events Get Game Events
 * @apiName GetGameEvents
 * @apiGroup GameEvents
 *
 * @apiDescription
 * Retrieves a list of game events.
 *
 *
 * @apiSuccess {Object[]} events List of game events
 * @apiSuccess {String} events.eventId Unique event identifier
 * @apiSuccess {String} events.playerId Player identifier
 * @apiSuccess {String="win","purchase"} events.eventType Event type
 * @apiSuccess {String} events.amount Event amount (string to support BIGINT / DECIMAL)
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "events": [
 *     {
 *       "event_id": "550e8400-e29b-41d4-a716-446655440000",
 *       "player_id": "player-123",
 *       "event_type": "win",
 *       "amount": "25.00",
 *       "event_time":"2025-12-30T19:42:43.000Z"
 *     },
 *     {
 *       "event_id": "660e8400-e29b-41d4-a716-446655440001",
 *       "player_id": "player-123",
 *       "event_type": "purchase",
 *       "amount": "-10.00",
 *       "event_time":"2025-12-30T19:42:43.000Z"
 *     }
 *   ]
 * }
 *
 * @apiError (500) InternalServerError Server error
 */
router.get('/', getGameEvents);

/**
 * @api {put} /api/game-events Update Game Event
 * @apiName putGameEvent
 * @apiGroup GameEvents
 * @apiVersion 1.0.0
 *
 * @apiDescription Adds new game event and updates user balance.
 * *
 * @apiBody {String} eventId Unique identifier of the game event
 * @apiBody {String} playerId Unique identifier of the player
 * @apiBody {String="win","purchase"} eventType Type of the game event
 * @apiBody {String} amount Event amount (always positive number)
 *
 * @apiBodyExample {json} Request-Example:
 * {
 *   "eventId": "100",
 *   "playerId": "550e8400-e29b-41d4-a716-446655440000",
 *   "eventType": "win",
 *   "amount": "25.00"
 * }
 *
 * @apiSuccess {String} eventId Game event ID
 * @apiSuccess {String} balance Current Player balance

 *
 * @apiSuccessExample {json} Success-Response:
 * {
*   "eventId": "100", "balance": "125"
 * }
 *
 *
 * @apiErrorExample {json} Error-Response:
 * {
 *   "message": "Game event not found"
 * }
 */
router.put('/', putGameEvent);

export default router;