import { Router } from 'express';
import * as controller from './item.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { allowRoles } from '../../middlewares/role.middleware';
import { validate } from '../../middlewares/validation.middleware';
import { addItemSchema, updateItemSchema, updateAvailabilitySchema } from './item.validation';

const router = Router();

router.post('/', authMiddleware, allowRoles('OWNER'), validate(addItemSchema), controller.addItem);

router.put('/:id', authMiddleware, allowRoles('OWNER'), validate(updateItemSchema), controller.updateItem);

router.patch('/:id/availability', authMiddleware, allowRoles('STAFF'), validate(updateAvailabilitySchema), controller.updateAvailability);

router.get('/active', controller.getActiveItems);

export default router;
