import { Router } from 'express';
import auth from './modules/auth/auth.routes';
import menus from './modules/menus/menu.routes';
import items from './modules/items/item.routes';
import orderTypes from './modules/order-types/orderType.routes';
import userRoutes from './modules/users/user.routes';

const router = Router();

router.use('/auth', auth);
router.use('/menus', menus);
router.use('/items', items);
router.use('/order-types', orderTypes);
router.use('/users', userRoutes);  


export default router;
