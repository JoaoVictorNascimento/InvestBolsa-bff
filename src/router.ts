import { Router } from 'express';
import { WalletController } from './controllers/WalletController';

const routes = Router();

routes.post('/wallet', new WalletController().create);

export default routes;