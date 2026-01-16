import { Router } from 'express';
import * as controller from './item.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { allowRoles } from '../../middlewares/role.middleware';
import { validate } from '../../middlewares/validation.middleware';
import { addItemSchema, updateItemSchema, updateAvailabilitySchema } from './item.validation';
import { ROLES } from '../../constants/constants';

const router = Router();

router.post('/', authMiddleware, allowRoles(ROLES.OWNER), validate(addItemSchema), controller.addItem);
router.put('/:id', authMiddleware, allowRoles(ROLES.OWNER), validate(updateItemSchema), controller.updateItem);
router.patch('/:id/availability', authMiddleware, allowRoles(ROLES.STAFF), validate(updateAvailabilitySchema), controller.updateAvailability);
router.get('/active', controller.getActiveItems);

export default router;
