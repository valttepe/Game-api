import { Router } from 'express';
import { getGameEvents, putGameEvent } from '../controller/gameEvent';


const router = Router();

router.get('/', getGameEvents);
router.put('/', putGameEvent);
// router.get('/:id', );

export default router;