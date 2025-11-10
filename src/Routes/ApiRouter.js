import { Router } from 'express';
import { ApiController } from '../Controllers/ApiController.js';
import { HealthCheckController } from '../Controllers/HealthCheckController.js';
import { ServersController } from '../Controllers/ServersController.js';
const router = Router();

router.get('/guid', ApiController.guidController);
router.get('/uid', ApiController.uidController);
router.get('/health-check', HealthCheckController.healthCheck);

router.get('/servers', ServersController.getServerInfo);
router.get('/servers/games/list', ServersController.getGamesList);
router.post('/servers/user', ServersController.setUserServer);
router.get('/servers/user', ServersController.getUserServer);
router.delete('/servers/user', ServersController.deleteUserServer);

export default router;
