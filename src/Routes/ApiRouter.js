const { Router } = require('express');
const { ApiController } = require('../Controllers/ApiController');
const { HealthCheckController } = require('../Controllers/HealthCheckController');
const { ServersController } = require('../Controllers/ServersController');
const router = Router();

router.get('/guid', ApiController.guidController);
router.get('/uid', ApiController.uidController);
router.get('/health-check', HealthCheckController.healthCheck);

router.get('/servers', ServersController.getServerInfo);
router.get('/servers/games/list', ServersController.getGamesList);

module.exports = router;