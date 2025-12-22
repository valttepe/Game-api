import { Router } from 'express';
import { getGameEvents } from '../controller/gameEvent';


const router = Router();

router.get('/', getGameEvents);
// router.get('/:id', );

export default router;