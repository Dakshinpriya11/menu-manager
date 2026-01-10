import { Router } from 'express';
import * as controller from './item.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { allowRoles } from '../../middlewares/role.middleware';

const router = Router();

router.post('/', authMiddleware, allowRoles('OWNER'), controller.addItem);
router.put('/:id', authMiddleware, allowRoles('OWNER'), controller.updateItem);
router.patch('/:id/availability', authMiddleware, allowRoles('STAFF'), controller.updateAvailability);
router.get('/active', controller.getActiveItems);

export default router;
